import { Component, OnInit } from '@angular/core';
import {SearchResultDetail} from '@app/shared/models/auto-ria-filter-entitys/search-result-detail.model';
import {AutoRiaAds} from "@app/shared/models/auto-ria-ads.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.scss']
})
export class AutoComponent implements OnInit {

  searchResultDetail: SearchResultDetail;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.searchResultDetail ;
/*      let params = new HttpParams().set('id','')
    console.log(params);
    this.http.get<AutoRiaAds>(`http://94.237.97.139:8000/api/v1/autoria_parameters/search/`, {params});*/
    this.activatedRoute.queryParams.subscribe(params => {
      const id = params['id'];
      console.log(id); // Print the parameter to the console.
    });
  }

}
