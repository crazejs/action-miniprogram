import { join, resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { cpus } from 'node:os';
import { debug } from '@actions/core';
import { upload, Project } from 'miniprogram-ci';

export interface UploadProps {
  root: string;
  version: string;
  description: string;
  privateKey: string;
}

export async function uploadWechatMiniProgram({ root, version, description, privateKey }: UploadProps): Promise<void> {
  const projectPath = join(process.env.GITHUB_WORKSPACE ?? '', root);
  const projectConfigPath = join(projectPath, 'project.config.json');
  debug(`projectPath: ${projectPath}`);

  if (!existsSync(projectConfigPath)) {
    throw new Error('project.config.json not found');
  }

  const projectConfig = await import(projectConfigPath);
  debug(`project.config.json: ${JSON.stringify(projectConfig)}`);

  const project = new Project({
    appid: projectConfig.appid,
    type: 'miniProgram',
    projectPath: resolve(projectPath, projectConfig.miniprogramRoot ?? ''),
    privateKey,
    ignores: ['node_modules/**/*'],
  });

  await upload({
    project,
    version,
    desc: description,
    allowIgnoreUnusedFiles: projectConfig.ignoreUploadUnusedFiles,
    setting: projectConfig.setting,
    robot: 24,
    threads: cpus().length * 2,
    onProgressUpdate: (status) => {
      if (typeof status === 'string') {
        debug(status);
      } else {
        debug(JSON.stringify(status));
      }
    },
  });
}
