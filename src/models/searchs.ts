import { SingleSearchModel } from './single-search';

export class SearchsModel {
  constructor (public max_page: number,
              public data: SingleSearchModel[]) {}
}
