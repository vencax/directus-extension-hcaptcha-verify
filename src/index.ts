import { defineEndpoint } from '@directus/extensions-sdk';
import { verify } from 'hcaptcha';

interface HCaptchaConfig { 
    secret_key: string; 
    remote_ip: string | null;
	site_key: string | null;
	token: string;
} 

export default defineEndpoint({
	id: 'hcaptcha-validate',
	handler: (router, { database, exceptions }) => {
		const { ServiceUnavailableException } = exceptions;
		
		router.get('/:id([0-9]+)/:token', async (req :any, res: any) => {
			try {
				const config: HCaptchaConfig = await database('hcaptchainfo').where({ 
					id: req.params.id
				}).first()
				const data = await verify(
					config.secret_key, 
					req.params.token, 
					config.remote_ip || undefined, 
					config.site_key || undefined
				)
				if (!data.success) {
					throw data
				}
				res.send(config.token)			
			} catch (err: any) {
				throw new ServiceUnavailableException(err.message);
			}
		});
	}
});
