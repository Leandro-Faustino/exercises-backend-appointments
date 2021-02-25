 import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

export default class FakeMailProvider implements IMailProvider {
    private message: ISendMailDTO[]= [];

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.message.push(message);

  }
}
