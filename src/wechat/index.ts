import { join } from 'node:path';
import { existsSync, readFileSync } from 'node:fs';
import { cpus } from 'node:os';
import { upload, Project } from 'miniprogram-ci';

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
  console.log('[uploadWechatMiniProgram#projectPath]', root);
  const projectConfigPath = join(root, 'project.config.json');
  console.log(`[uploadWechatMiniProgram#projectConfigPath]`, projectConfigPath);

  if (!existsSync(projectConfigPath)) {
    throw new Error('project.config.json not found');
  }

  const projectConfig = JSON.parse(readFileSync(projectConfigPath, 'utf8'));
  console.log(`[uploadWechatMiniProgram#projectConfig]`, projectConfig);
  // const projectPath = resolve(root, projectConfig.miniprogramRoot ?? '');
  // console.log(`[uploadWechatMiniProgram#projectPath]`, projectPath);

  const project = new Project({
    appid: projectConfig.appid,
    type: 'miniProgram',
    projectPath: root,
    privateKey,
    ignores: ['node_modules/**/*'],
  });
  console.log(`[uploadWechatMiniProgram#project]`, project);

  try {
    const result = await upload({
      project,
      version,
      desc: description,
      allowIgnoreUnusedFiles: projectConfig.ignoreUploadUnusedFiles,
      setting: projectConfig.setting,
      robot: 24,
      threads: cpus().length * 2,
      onProgressUpdate: console.log,
    });
    console.log(`[uploadWechatMiniProgram#upload]`, result);
  } catch (e) {
    console.error('[uploadWechatMiniProgram#upload]', e);
    throw new Error('Upload failed');
  }
}
