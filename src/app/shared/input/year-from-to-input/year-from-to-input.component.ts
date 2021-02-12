import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectionOptions} from '@app/shared/models/interfaces/selection-options';

@Component({
  selector: 'app-year-from-to-input',
  templateUrl: './year-from-to-input.component.html',
  styleUrls: ['./year-from-to-input.component.scss']
})
export class YearFromToInputComponent implements OnInit {
  years: SelectionOptions[] = [];
  _yearFrom: number;
  _yearTo: number;
  readonly startYear = 1900;
  @Output() yearFromChange = new EventEmitter();

  set yearFrom(value: number) {
    this._yearFrom = value;
    this.check();
    this.yearFromChange.emit(this._yearFrom);
  }

  @Input()
  get yearFrom(): number {
    this.check();
    return this._yearFrom;
  }

  @Output() yearToChange = new EventEmitter();

  set yearTo(value: number) {
    this._yearTo = value;
    this.check();
    this.yearToChange.emit(this._yearTo);
  }

  @Input()
  get yearTo(): number {
    this.check();
    return this._yearTo;
  }

  constructor() {
  }

  ngOnInit(): void {
    const yearNow = (new Date()).getFullYear();
    for (let i = yearNow; i >= this.startYear; i--) {
      this.years.push({value: i, viewValue: i.toString()});
    }
  }

  private check() {
    if (this._yearTo && this._yearFrom) {
      if (this._yearFrom > this._yearTo) {
        const bubble = this._yearTo;
        this._yearTo = this._yearFrom;
        this._yearFrom = bubble;
      }
    }
  }
}
