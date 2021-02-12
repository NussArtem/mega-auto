import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilterParameters} from "@app/shared/models/interfaces/FilterParameters";

@Component({
  selector: 'app-multiselect-group-input',
  templateUrl: './multiselect-group-input.component.html',
  styleUrls: ['./multiselect-group-input.component.scss']
})
export class MultiselectGroupInputComponent implements OnInit {

  @Input()
  multiply = false;
  @Input()
  label: string;
  @Input()
  disabled: boolean;
  _elements: FilterParameters[] = [];
  _selectedElement: FilterParameters | Array<FilterParameters>;
  @Output() elementsChange = new EventEmitter();

  set elements(value: FilterParameters[]) {
    this._elements = value;
    this.elementsChange.emit(value);
  }

  @Input()
  get elements(): FilterParameters[] {
    return this._elements;
  }

  @Output() selectedElementChange = new EventEmitter();
  set selectedElement(value: FilterParameters | FilterParameters[]) {
    this._selectedElement = value;
    this.selectedElementChange.emit(value);
  }
  @Input()
  get selectedElement(): FilterParameters | FilterParameters[] {
    return this._selectedElement;
  }

  constructor() {
  }

  ngOnInit(): void {
  }
}
