import {Component, OnInit} from '@angular/core';
import {SearchResultDetail} from '@app/shared/models/auto-ria-filter-entitys/search-result-detail.model';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {AutoRiaFilterService} from "@app/shared/services/auto-ria/filters/auto-ria-filter.service";

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.scss']
})
export class AutoComponent implements OnInit {

  auto: SearchResultDetail;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private autoRiaFilterService: AutoRiaFilterService) {
    autoRiaFilterService.search(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null).subscribe(
      value => {
        this.auto = value.search_result_detail[0];
      }
    );
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const id = params.id;
    });
  }

}
