import {SearchResultDetail} from '@app/shared/models/auto-ria-filter-entitys/search-result-detail.model';

export class AutoRiaAds {

  additional_params: {
    lang_id: number;
    page: number;
    view_type_id: number;
    target: string;
    section: string;
    catalog_name: string;
    elastica: boolean;
    nodejs: boolean
  };
  count: 215122;
  search_result_detail: SearchResultDetail[];

}
