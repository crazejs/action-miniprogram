import { getInput, setFailed } from '@actions/core';
import { uploadWechatMiniProgram } from './wechat';

(async function run(): Promise<void> {
  try {
    const root: string = getInput('root');
    const version: string = getInput('version');
    const description: string = getInput('description');

    console.log('[run]', root, version, description);
    await uploadWechatMiniProgram({
      root,
      version,
      description,
      privateKey: process.env.WECHAT_MINI_PROGRAM_PRIVATE_KEY ?? '',
    });
  } catch (error) {
    if (error instanceof Error) {
      setFailed(error.message);
    }
  }
})();
