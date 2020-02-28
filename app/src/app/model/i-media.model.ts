export class IMediaModel {
  id?: string;
  title: string;
  src: string;
  type: string;
  script?: string = '';
  customDefinitions?: Array<string> = [];
}
