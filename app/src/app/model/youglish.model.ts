export class YouglishModel {
  total_results?: number;
  total?: number;
  is_query_altered?: number;
  altered_query?: string;
  hc?: string;
  results?: YouglishResults[] = [];
}

export class YouglishResults {
  display?: string;
  vid?: string;
  start?: number;
  id?: string;
  zone?: string;
  cid?: string;
  src?: string;
  speaker?: string;
  ban?: string;
}
