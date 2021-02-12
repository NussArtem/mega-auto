import {Component, OnInit, ViewChild} from '@angular/core';
import {AutoRiaFilterService} from '@app/shared/services/auto-ria/filters/auto-ria-filter.service';
import {FilterParameters} from '@app/shared/models/interfaces/FilterParameters';
import {FilterParametersGroup} from '@app/shared/models/interfaces/filter-parameters-group';
import {AutoRiaAds} from '@app/shared/models/auto-ria-ads.model';
import {User} from '@app/shared/models';
import {AccountService} from '@app/shared/services/account.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {FilterParameterGroupValue} from '@app/shared/models/interfaces/helpers/filter-parameter-group-value.model';
import {FilterParametersGroupExtended} from '@app/shared/models/interfaces/helpers/filter-parameters-group-extended';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})

export class ContentComponent implements OnInit {

  @ViewChild('paginator') paginator: MatPaginator;
  user: User;
  loading = false;
  carsLoaded = false;
  pageSizeOptions: number[] = [10, 25, 100];
    isCookie: boolean;

    constructor(private autoRiaFilterService: AutoRiaFilterService, private accountService: AccountService) {
    this.user = accountService.userValue;
  }

  fuelTypesGroup: FilterParametersGroup[];
  gearBoxTypesGroup: FilterParametersGroup[];
  brandsGroup: FilterParametersGroup[];
  models: FilterParameters[];
  modelGroups: FilterParametersGroupExtended [] = [];
  statesGroup: FilterParametersGroup[];
  transportTypes: FilterParameters[];
  tradeTypes: FilterParameters[];
  ////////
  selectedTransportType: FilterParameters;
  selectedTradeType: FilterParameters;
  selectedBrands: FilterParameters[];
  selectedModels: FilterParameterGroupValue[];
  yearFrom: number;
  yearTo: number;
  selectedRegion: FilterParameters[];
  priseFrom: number;
  priseTo: number;
  selectedFuelType: FilterParameters[];
  selectedGearBox: FilterParameters[];
  mileageFrom: number;
  mileageTo: number;
  volumeFrom: number;
  volumeTo: number;
  submited:boolean;
  ////////
  isNotFound = false;
  isLoading = false;
  modelSelectDisable = true;
  brandSelectDisable = true;
  //////
  ads: AutoRiaAds;
  //////
  length: number;

  paginationIsActive = true;


  ngOnInit(): void {
    this.autoRiaFilterService.getConstantParametrs().subscribe(value => {
      this.fuelTypesGroup = [{name: 'Все типы топлива', filterParameters: value.fuel_type_parameters}];
      this.gearBoxTypesGroup = [{name: 'Все КПП', filterParameters: value.gearbox_type_parameters}];
      this.statesGroup = [{name: 'Все регионы', filterParameters: value.state_parameters}];
      this.transportTypes = value.transport_type_parameters;
      this.tradeTypes = [{name: 'Без доплаты', value: 1},{name:'С вашей доплатой', value:2},{name:'С моей доплатой',value:3}];
      this.isLoading = true;
      this.submited = false;
    });
    this.checkCookieUser()
  }
    cookieUser(){
        document.cookie = "user=accept";
        window.location.reload();
    }
    checkCookieUser(){
        let cookie = document.cookie.split("; user=").pop().split(";").shift()
        if (cookie !== 'accept'){
            this.isCookie = false;
        } else {
            this.isCookie = true;
        }
    }
  selectBrands(selectedTransportType: FilterParameters) {

    this.brandSelectDisable = true;
    this.modelSelectDisable = true;
    this.modelGroups = [];
    this.brandsGroup = [];
    this.selectedTransportType = selectedTransportType;
    this.autoRiaFilterService.getBrands(selectedTransportType).subscribe(
      value => {
        this.brandsGroup = [{name: 'Все марки', filterParameters: value}];
        this.brandSelectDisable = false;
      }
    );
  }
  selectTypesTrade(selectedTradeType: FilterParameters) {
      this.selectedTradeType = selectedTradeType ;
  }

  selectModelGroups(brands: FilterParameters[]) {
    this.selectedBrands = brands;
    this.models = [];
    this.modelGroups = [];
    this.modelSelectDisable = true;
    if (brands && brands.length > 0) {
      for (const brand of brands) {
        this.autoRiaFilterService.getModels(this.selectedTransportType, brand).subscribe(value => {
          this.modelGroups.push({filterParameter: brand, filterParameters: value});
        });

      }
      this.modelSelectDisable = false;
    }

  }

    clear(){
      this.selectedTransportType;
      this.selectedTradeType;
      this.selectedBrands = [];
      this.selectedModels = [];
      this.yearFrom = null;
      this.yearTo = null;
      this.selectedRegion = [];
      this.priseFrom = null;
      this.priseTo = null;
      this.selectedFuelType = [];
      this.selectedGearBox = [];
      this.mileageFrom = null;
      this.mileageTo = null;
      this.volumeFrom = null;
      this.volumeTo = null;
    }

  selectModels(models: FilterParameterGroupValue[]) {
    this.selectedModels = models;
  }

  selectRegions(regions: FilterParameters[]) {
    this.selectedRegion = regions;
  }

  cookie(){

  }

  search() {
     this.loading = true;
     this.autoRiaFilterService.search(
       this.selectedTransportType,
       this.selectedBrands,
       this.selectedModels,
       this.yearFrom,
       this.yearTo,
       this.selectedRegion,
       this.priseFrom,
       this.priseTo,
       this.selectedFuelType,
       this.selectedGearBox,
       this.mileageFrom,
       this.mileageTo,
       this.volumeFrom,
       this.volumeTo,
       this.selectedTradeType,
     ).subscribe(
       value => {
         this.ads = value;
         this.length = this.ads.count;
         this.loading = false;
         this.carsLoaded = true;
         this.paginationIsActive = true;
         if (this.ads.search_result_detail.length === 0) {
           this.isNotFound = true;
         }
       }
     );
     this.submited = true;
     setTimeout(()=> this.submited = false, 5000)
  }

}
