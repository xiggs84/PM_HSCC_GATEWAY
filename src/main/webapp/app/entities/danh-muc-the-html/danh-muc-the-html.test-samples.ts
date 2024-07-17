import { IDanhMucTheHtml, NewDanhMucTheHtml } from './danh-muc-the-html.model';

export const sampleWithRequiredData: IDanhMucTheHtml = {
  id: 28760,
};

export const sampleWithPartialData: IDanhMucTheHtml = {
  id: 13208,
};

export const sampleWithFullData: IDanhMucTheHtml = {
  id: 5053,
  idType: 3656,
  type: 'wheat daintily',
  dienGiai: 'outwit sick across',
};

export const sampleWithNewData: NewDanhMucTheHtml = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
