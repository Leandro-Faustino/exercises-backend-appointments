import fs from 'fs';
import path from 'path';
import mime from 'mime';
import aws, { S3 } from 'aws-sdk';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProviders';

class DiskStorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1', //aws - region
    });
  }

  public async saveFile(file: string): Promise<string> {
    //caminho original da pasta tmp para conseguir subir arquivo
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error('File not found');
    }
//ler conteudo do arquiivo,quando for texto por-> , encoding : 'utf-8'. no readFile
    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
        ACL: 'public-read', //qual permissão- legivel-publica
        Body: fileContent, //coonteudo do arquivo
        ContentType,

      })
      .promise();
//deletando depois que fazer upload de arquivo para nao ter localmente
    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,//nome do bucket
        Key: file, //nome do arquivo
      })
      .promise();
  }
}

export default DiskStorageProvider;
