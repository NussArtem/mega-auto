import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilterParameters} from '@app/shared/models/interfaces/FilterParameters';

@Component({
  selector: 'app-multiselect-input',
  templateUrl: './multiselect-input.component.html',
  styleUrls: ['./multiselect-input.component.scss']
})
export class MultiselectInputComponent implements OnInit {

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
  @Output() selectedElementsChange = new EventEmitter();
  set selectedElement(value: FilterParameters | FilterParameters[]) {
    this._selectedElement = value;
    this.selectedElementsChange.emit(value);
  }
  @Input()
  get selectedElement(): FilterParameters | FilterParameters[] {
    return this._selectedElement;
  }

  constructor() { }

  ngOnInit(): void {
  }


}
