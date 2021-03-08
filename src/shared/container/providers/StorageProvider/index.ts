import { container } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProviders';
import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider';
import S3StorageProvider from '@shared/container/providers/StorageProvider/implementations/S3Storageprovider';
import uploadConfig from '@config/upload';
const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};
//vai retorna baseado na configuração do arquivo env
container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
)
