import { readFile } from 'fs/promises';
import path from 'path';
import assert from 'assert';

assert(process.env.HCAPTCHA_CONFIG_FOLDER, 'env.HCAPTCHA_CONFIG_FOLDER not set!')
const CONFIGSTORE = process.env.HCAPTCHA_CONFIG_FOLDER

export default async function getConfig (webid: string) {
    const configFile = path.join(CONFIGSTORE, `${webid}.json`)
    const content = await readFile(configFile, 'utf8')
    return JSON.parse(content)
}