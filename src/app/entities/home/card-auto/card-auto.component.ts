import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Car} from '@app/shared/models/car.model';

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
  pageNow = -1;

  constructor() {

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    let car = new Car('assets/img/maserati-levante.jpg', 'Maserati', '50 508');
    this.cars.push(new Car('assets/img/maserati-levante.jpg', 'Maserati1', '50 508'));
    this.cars.push(new Car('assets/img/maserati.jpg', 'Maserati2', '120 650'));
    this.cars.push(new Car('assets/img/pininfarina-maserati.jpg', 'Maserati3', '50 508'));
    this.cars.push(new Car('assets/img/maserati.jpg', 'Maserati4', '120 650'));
    this.cars.push(new Car('assets/img/pininfarina-maserati.jpg', 'Maserati5', '50 508'));

    this.numberOfPage = this.cars.length;
    for (let i = 0; i < this.numberCarsInPage; i++) {
      this.carsInPage.push(new Car());
    }
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
