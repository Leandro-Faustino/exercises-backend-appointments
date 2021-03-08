import ICacheProvider from '@shared/container/provider/CacheProvider/models/ICacheProvider';


import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';
import ICacheProvider from '../models/ICacheProvider';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
      //todas nossa confi são passadas pra dentro
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: any): Promise<void> {
      //salvar string como json
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }
 //disconverter de stirng para o tipo T
    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }
//deleta chave do bd
  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }

//invalidar cache de provider quando e criado um novo
  public async invalidatePrefix(prefix: string): Promise<void> {
    //buscar todos os chaves do cache que iniciam com este prefixo providers-list com 2 pontos e valor
    const keys = await this.client.keys(`${prefix}:*`);

//executar multilpla açoes no banco
    const pipeline = this.client.pipeline();

//deletar  todas chaves
    keys.forEach(key => {
      pipeline.del(key);
    });

//executart pipeline todos os deletes
    await pipeline.exec();
  }
}