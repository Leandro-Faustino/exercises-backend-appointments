import ISendMailDTO from '../dtos/ISendMailDTO';

export default interface ImailProvider {
  //para quem o email vai ser enviado e o que
  sendMail(data: ISendMailDTO):Promise<void>;

}
