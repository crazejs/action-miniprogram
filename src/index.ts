import { getInput, setOutput, setFailed } from '@actions/core';
import { uploadWechatMiniProgram } from './wechat';

(async function run(): Promise<void> {
  try {
    const root: string = getInput('root');
    const version: string = getInput('version');
    const description: string = getInput('description');

    await uploadWechatMiniProgram({
      root,
      version,
      description,
      privateKey: process.env.WECHAT_MINI_PROGRAM_PRIVATE_KEY ?? '',
    });

    setOutput('version', version);
  } catch (error) {
    if (error instanceof Error) {
      setFailed(error.message);
    }
  }
})();
