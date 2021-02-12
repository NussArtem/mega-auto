import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-from-to-input',
  templateUrl: './from-to-input.component.html',
  styleUrls: ['./from-to-input.component.scss']
})
export class FromToInputComponent implements OnInit {

  @Input()
  MatIcon: string;
  valid = false;

  private check() {
    if (this.elementTo && this.elementFrom) {
      if (this.elementFrom > this.elementTo) {
        this.valid = true;
      }
    }
  }

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {

  }

  _elementFrom: number;
  _elementTo: number;

  @Output() elementFromChange = new EventEmitter();

  set elementFrom(value: number) {
    this._elementFrom = value;

    this.elementFromChange.emit(this._elementFrom);
  }

  @Input()
  get elementFrom(): number {

    return this._elementFrom;
  }

  @Output() elementToChange = new EventEmitter();

  set elementTo(value: number) {
    this._elementTo = value;

    this.elementToChange.emit(this._elementTo);
  }

  @Input()
  get elementTo(): number {

    return this._elementTo;
  }
}
