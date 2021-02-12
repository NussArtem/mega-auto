import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Car} from '@app/shared/models/car.model';
import {AutoriaDevCredentialsService} from "@app/shared/services/auto-ria/autoria-dev-credentials.service";

@Component({
  selector: 'app-card-auto',
  templateUrl: './card-auto.component.html',
  styleUrls: ['./card-auto.component.scss']
})
export class CardAutoComponent implements OnInit {
  pageEvent: PageEvent;
  cars: Car[] = [];
  carsInPage: Car[] = [];
  numberOfPage: number;
  readonly numberCarsInPage = 2;
  numberCarsInPageNow: number;
  isTrue: true;
  pageNow = -1;
    public adsUser: any[];

    constructor(public autoriaDevCredentialsService: AutoriaDevCredentialsService
  ) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(): void {
      if (localStorage.getItem('AuthRia') == 'Done' ) {
          this.isTrue = true;
          this.autoriaDevCredentialsService.getAutoriaAds().subscribe(value =>{this.adsUser = value.active
              console.log(this.adsUser)
              return
          }, error => localStorage.removeItem('AuthRia'));      }

    this.leaf(0);

  }

  doLeaf(pageEvent: PageEvent) {
    this.leaf(pageEvent.pageIndex);
  }

  leaf(pageIndex: number) {
    if ((this.pageNow !== pageIndex)) {
      for (let i = 0; i < this.numberCarsInPage; i++) {
        this.carsInPage[i] = this.cars[(this.numberCarsInPage * pageIndex) + i];
      }
    }
    this.pageNow = pageIndex;
  }


}
