import { join } from 'node:path';
// import { existsSync } from 'node:fs';
// import { cpus } from 'node:os';
// import { upload, Project } from 'miniprogram-ci';

export interface UploadProps {
  root: string;
  version: string;
  description: string;
  privateKey: string;
}

export async function uploadWechatMiniProgram({ root, version, description, privateKey }: UploadProps): Promise<void> {
  console.log('[uploadWechatMiniProgram]', root, version, description, privateKey);
  // const workspace = process.env.GITHUB_WORKSPACE || '';
  // console.log('[uploadWechatMiniProgram#workspace]', workspace);
  // const projectPath = join(workspace, root);
  console.log('[uploadWechatMiniProgram#projectPath]', root);
  const projectConfigPath = join(root, 'project.config.json');
  console.log(`[uploadWechatMiniProgram#projectConfigPath]`, projectConfigPath);
  //
  // if (!existsSync(projectConfigPath)) {
  //   throw new Error('project.config.json not found');
  // }
  //
  // const projectConfig = await import(projectConfigPath);
  // console.log(`[uploadWechatMiniProgram#projectConfig]`, projectConfig);
  //
  // const project = new Project({
  //   appid: projectConfig.appid,
  //   type: 'miniProgram',
  //   projectPath: resolve(projectPath, projectConfig.miniprogramRoot ?? ''),
  //   privateKey,
  //   ignores: ['node_modules/**/*'],
  // });
  //
  // await upload({
  //   project,
  //   version,
  //   desc: description,
  //   allowIgnoreUnusedFiles: projectConfig.ignoreUploadUnusedFiles,
  //   setting: projectConfig.setting,
  //   robot: 24,
  //   threads: cpus().length * 2,
  //   onProgressUpdate: console.log,
  // });
}
