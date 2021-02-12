import {Injectable} from '@angular/core';
import {FilterParameters} from '../../models/interfaces/FilterParameters';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AutoriaDevCredentialsService {

    apiUrl: string;
    apiUrlAds: string;
    public adsUser: any;

  constructor(private http: HttpClient
  ) {
    this.apiUrl = '/accounts/autoria_dev_credentials/';
    this.apiUrlAds = '/autoria_parameters/user_cars/';
    this.adsUser = [];

  }

  postAutoriaDevCredentials(autoria_id, autoria_key) {
    return this.http.post<any>(`${environment.apiUrl}${this.apiUrl}`,
      {autoria_id, autoria_key}).subscribe(value =>  localStorage.setItem('AuthRia', 'Done'), error => localStorage.removeItem('AuthRia'),
  );
      window.location.reload();
  }
  getAutoriaAds() {
    return this.http.get<any>(`${environment.apiUrl}${this.apiUrlAds}`);
  }

  getModels(transportType: FilterParameters, brandParameter: FilterParameters) {
    const params = new HttpParams().set('transport_type', String(transportType.value)).set('mark', String(brandParameter.value));
    const paramsTwo = new HttpParams();
    return this.http.get<any>
    (`${this.apiUrl}/model_parameters/`, {params});

  }


}
