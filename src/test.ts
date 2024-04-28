import { uploadWechatMiniProgram } from './wechat';

(async function run(): Promise<void> {
  try {
    const root = './miniprogram/wechat';
    const version = '1.0.1';
    const description = 'test';

    await uploadWechatMiniProgram({
      root,
      version,
      description,
      privateKey: process.env.WECHAT_MINI_PROGRAM_PRIVATE_KEY ?? '',
    });
  } catch (error) {
    console.error(error);
  }
})();
