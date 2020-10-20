import {EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {AutoRiaFilterService} from '@app/shared/services/filters/auto-ria-filter.service';
import {SelectionOptions} from '@app/shared/models/interfaces/selection-options';
import {SelectionOptionsGroup} from '@app/shared/models/interfaces/selection-options-group';
import {FilterParameters} from '@app/shared/models/interfaces/FilterParameters';
import {i18nMetaToDocStmt} from '@angular/compiler/src/render3/view/i18n/meta';
import {FilterParametersGroup} from '@app/shared/models/interfaces/filter-parameters-group';
import {AutoRiaAds} from '@app/shared/models/auto-ria-ads.model';
import {User} from "@app/shared/models";
import {AccountService} from "@app/shared/services/account.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {FilterParameterGroupValue} from "@app/shared/models/interfaces/helpers/filter-parameter-group-value.model";
import {FilterParametersGroupExtended} from "@app/shared/models/interfaces/helpers/filter-parameters-group-extended";


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

  constructor(private autoRiaFilterService: AutoRiaFilterService, accountService: AccountService) {
    this.user = accountService.userValue;
  }

  fuelTypesGroup: FilterParametersGroup[];
  gearBoxTypesGroup: FilterParametersGroup[];
  marksGroup: FilterParametersGroup[];
  models: FilterParameters[];
  modelGroups: FilterParametersGroupExtended [] = [];
  statesGroup: FilterParametersGroup[];
  transportTypes: FilterParameters[];
  ////////
  selectedTransportType: FilterParameters;
  selectedMarks: FilterParameters[];
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
  ////////
  isLoading = false;
  modelSelectDisable = true;
  markSelectDisable = true;
  //////
  ads: AutoRiaAds;
  //////
  length: number;
  pageSize: 10;
  pageEvent: PageEvent;

  paginationIsActive = true;

  ngOnInit(): void {
    this.autoRiaFilterService.getConstantParametrs().subscribe(value => {
      this.fuelTypesGroup = [{name: 'Все типы топлива', filterParameters: value.fuel_type_parameters}];
      this.gearBoxTypesGroup = [{name: 'Все КПП', filterParameters: value.gearbox_type_parameters}];
      this.statesGroup = [{name: 'Все регионы', filterParameters: value.state_parameters}];
      this.transportTypes = value.transport_type_parameters;
      this.isLoading = true;
    });
  }

  selectMarks(selectedTransportType: FilterParameters) {

    this.markSelectDisable = true;
    this.modelSelectDisable = true;
    this.modelGroups = [];
    this.marksGroup = [];
    this.selectedTransportType = selectedTransportType;
    this.autoRiaFilterService.getMarks(selectedTransportType).subscribe(
      value => {

        this.marksGroup = [{name: 'Все марки', filterParameters: value}];
        this.markSelectDisable = false;
      }
    );
  }

  selectModelGroups(marks: FilterParameters[]) {
    this.selectedMarks = marks;
    this.models = [];
    this.modelGroups = [];
    this.modelSelectDisable = true;
    if (marks.length > 0) {
      for (const mark of marks) {
        this.autoRiaFilterService.getModels(this.selectedTransportType, mark).subscribe(value => {
          this.modelGroups.push({filterParameter: mark, filterParameters: value});
        });

      }
      this.modelSelectDisable = false;
    }

  }

  selectModels(models: FilterParameterGroupValue[]) {
   this.selectedModels = models;
  }

  selectRegions(regions: FilterParameters[]) {
    this.selectedRegion = regions;
  }

  selectFuelType(fuelTypes: FilterParameters[]) {
    this.selectedFuelType = fuelTypes;
  }

  selectGearBox(gearBoxs: FilterParameters[]) {
    this.selectedGearBox = gearBoxs;
  }

  pagination(event: PageEvent) {
    console.log(event);
    this.ads = new AutoRiaAds();
    this.paginationIsActive = false;
    this.search(event.pageIndex);

  }

  search(page: number) {
    this.loading = true;
    this.autoRiaFilterService.search(
      this.selectedTransportType,
      this.selectedMarks,
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
      page
    ).subscribe(
      value => {
        this.ads = value;
        console.log(this.ads);

        this.length = this.ads.count;
        this.loading = false;
        this.carsLoaded = true;
        this.paginationIsActive = true;
        if (this.paginator && page === 0) {
          this.paginator.firstPage();
        }
      }
    );
    console.log('0 ' + this.selectedTransportType);
    console.log('1 ' + this.selectedMarks);
    console.log('2 ' + this.selectedModels);
    console.log('3 ' + this.yearFrom + ' ' + this.yearTo);
    console.log('4 ' + this.selectedRegion);
    console.log('5 ' + this.priseFrom + ' ' + this.priseTo);
    console.log('6 ' + this.selectedFuelType);
    console.log('7 ' + this.volumeFrom + ' ' + this.volumeTo);
    console.log('8 ' + this.selectedGearBox);
    console.log('9 ' + this.mileageFrom + ' ' + this.mileageTo);
  }

}
