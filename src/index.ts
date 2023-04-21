import { defineEndpoint } from '@directus/extensions-sdk';
import { verify } from 'hcaptcha';
import getConfig from './config';

export default defineEndpoint({
	id: 'hcaptcha-validate',
	handler: (router) => {
		router.get('/:webid/:token', async (req :any, res: any) => {
			try {
				const config = await getConfig(req.params.webid)
				const data = await verify(
					config.HCAPTCHA_SECRETKEY, 
					req.params.token, 
					config.HCAPTCHA_REMOTEIP, 
					config.HCAPTCHA_SITEKEY
				)
				if (!data.success) {
					throw data
				}
				res.send(config.token)			
			} catch (err) {
				res.status(400).send('invalid token')
			}
		});
	}
});
