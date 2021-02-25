import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplatesDTO';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse():Promise<string>{
    return 'Mail content';
  }
}


export default FakeMailTemplateProvider;
