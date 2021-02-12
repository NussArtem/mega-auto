import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {FilterParameters} from '../../../models/interfaces/FilterParameters';
import {AutoRiaAds} from '../../../models/auto-ria-ads.model';
import {FilterParameterGroupValue} from '../../../models/interfaces/helpers/filter-parameter-group-value.model';
import {environment} from '@environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AutoRiaFilterService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = '/autoria_parameters';
  }

  getConstantParametrs() {
    return this.http.get<any>
    (`${environment.apiUrl}${this.apiUrl}/constant_parameters/`);
  }

  getBrands(transportType: FilterParameters) {
    const params = new HttpParams().set('transport_type', String(transportType.value));
    return this.http.get<any>(`${environment.apiUrl}${this.apiUrl}/mark_parameters/`, {params});
  }

  getModels(transportType: FilterParameters, brandParameter: FilterParameters) {
    const params = new HttpParams().set('transport_type', String(transportType.value)).set('mark', String(brandParameter.value));
    const paramsTwo = new HttpParams();
    return this.http.get<any>
    (`${environment.apiUrl}${this.apiUrl}/model_parameters/`, {params});
  }

  getCarPhotos(carId: string) {
    return this.http.get<any>(`${environment.apiUrl}${this.apiUrl}/car_photos/${carId}`);
  }

  search(
    transportType: FilterParameters,
    brands: FilterParameters[],
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
    tradeType: FilterParameters,

  ) {
    let params = new HttpParams();
    if (transportType) {
      params = params.append('category_id', String(transportType.value));
    }
    if (brands && brands.length > 0) {
      /*      params = params.append('marka_id', String(brands[0].value));*/
      brands.forEach((brand, index) => {
        params = params.append('marka_id[' + index + ']', String(brand.value));
      });
    }
    if (models && models.length > 0) {
      models.forEach((model, index) => {
        params = params.append('marka_id[' + index + ']', String(model.parentalValue));
        params = params.append('model_id[' + index + ']', String(model.filterParameters.value));
      });
    }
    if (yearFrom) {
      params = params.append('s_yers', String(yearFrom));
    }
    if (yearTo) {
      params = params.append('po_yers', String(yearTo));
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
      params = params.append('mileage.gte', String(mileageFrom));
    }
    if (mileageTo) {
      params = params.append('mileage.lte', String(mileageTo));
    }
    if (volumeFrom) {
      params = params.append('engineVolumeFrom', String(volumeFrom));
    }
    if (volumeTo) {
      params = params.append('engineVolumeTo', String(volumeFrom));
    }
    if (tradeType){
        params = params.append('exchangeTypeId', String(tradeType.value));

    }
    return this.http.get<AutoRiaAds>(`${environment.apiUrl}${this.apiUrl}/search/`, {params});

  }

}
