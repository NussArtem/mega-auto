import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {FilterParameters} from '@app/shared/models/interfaces/FilterParameters';
import {AutoRiaAds} from '@app/shared/models/auto-ria-ads.model';
import {FilterParametersGroupExtended} from "@app/shared/models/interfaces/helpers/filter-parameters-group-extended";
import {FilterParameterGroupValue} from "@app/shared/models/interfaces/helpers/filter-parameter-group-value.model";

@Injectable({
  providedIn: 'root'
})
export class AutoRiaFilterService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://94.237.97.139:8000/api/v1/autoria_parameters';
  }

  getConstantParametrs() {
    return this.http.get<any>
    (`${this.apiUrl}/constant_parameters/`);
  }

  getMarks(transportType: FilterParameters) {
    const params = new HttpParams().set('transport_type', String(transportType.value));
    return this.http.get<any>(`${this.apiUrl}/mark_parameters/`, {params});
  }

  getModels(transportType: FilterParameters, markParameter: FilterParameters) {
    const params = new HttpParams().set('transport_type', String(transportType.value)).set('mark', String(markParameter.value));
    const paramsTwo = new HttpParams();
    return this.http.get<any>
    (`${this.apiUrl}/model_parameters/`, {params});
  }

  getCarPhotos(carId: string) {
    return this.http.get<any>(`${this.apiUrl}/car_photos/${carId}`);
  }

  search(
    transportType: FilterParameters,
    marks: FilterParameters[],
    models: FilterParameterGroupValue[],
    yearFrom: number,
    yearTo: number,
    regions: FilterParameters[],
    priseFrom: number,
    priseTo: number,
    fuelTypes: FilterParameters[],
    gearBoxs: FilterParameters[],
    mileageFrom: number,
    mileageTo: number,
    volumeFrom: number,
    volumeTo: number,
    page: number
  ) {
    let params = new HttpParams();
    if (transportType) {
      params = params.append('category_id', String(transportType.value));
    }

    if (models && models.length > 0) {
      console.log(models);
      models.forEach((model, index) => {
        params = params.append('marka_id[' + index + ']', String(model.parentalValue));
        params = params.append('model_id[' + index + ']', String(model.filterParameters.value));
      });
    }else{
      if (marks && marks.length > 0) {
        console.log(marks);
        /*      params = params.append('marka_id', String(marks[0].value));*/
        marks.forEach((mark, index) => {
          params = params.append('marka_id[' + index + ']', String(mark.value));
        });
      }
    }
    if (yearFrom) {
      params = params.append('s_yers[0]', String(yearFrom));
    }
    if (yearTo) {
      params = params.append('po_yers[0]', String(yearTo));
    }
    if (regions && regions.length > 0) {
      regions.forEach((region, index) => {
        params = params.append('state[' + index + ']', String(region.value));
      });
    }
    if (priseFrom) {
      params = params.append('price_ot', String(priseFrom));
    }
    if (priseTo) {
      params = params.append('price_do', String(priseTo));
    }
    if (fuelTypes && fuelTypes.length > 0) {
      fuelTypes.forEach((fuelType, index) => {
        params = params.append('type[' + index + ']', String(fuelType.value));
      });
    }
    if (gearBoxs && gearBoxs.length > 0) {
      gearBoxs.forEach((gearBox, index) => {
        params = params.append('gearbox[' + index + ']', String(gearBox.value));
      });
    }
    if (mileageFrom) {

    }
    if (mileageTo) {

    }
    if (volumeFrom) {
      params = params.append('engineVolumeFrom', String(volumeFrom));
    }
    if (volumeTo) {
      params = params.append('engineVolumeTo', String(volumeFrom));
    }

    params = params.append('page', String(page));
    console.log(params);
    return this.http.get<AutoRiaAds>(`${this.apiUrl}/search/`, {params});

  }

}
