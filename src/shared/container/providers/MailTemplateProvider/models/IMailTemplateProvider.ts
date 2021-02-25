import IParseMailTemplateDTO from "../dtos/IParseMailTemplatesDTO";

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
