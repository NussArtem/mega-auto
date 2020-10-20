import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {SelectionOptions} from '@app/shared/models/interfaces/selection-options';
import {FilterParameters} from '@app/shared/models/interfaces/FilterParameters';

@Component({
  selector: 'app-chips-mult-input',
  templateUrl: './chips-mult-input.component.html',
  styleUrls: ['./chips-mult-input.component.scss']
})
export class ChipsMultInputComponent implements OnInit {
  @Input()
  label: string;
  _elements: FilterParameters[] = [];
  @Output() validChange = new EventEmitter();

  set elements(value: FilterParameters[]) {
    this._elements = value;
    this.validChange.emit(value);
  }

  @Input()
  get elements(): FilterParameters[] {
    return this._elements;
  }

  elementsControl = new FormControl([]);
  elementsList: string[] = [];

  onToppingRemoved(topping: string) {
    const toppings = this.elementsControl.value as string[];
    this.removeFirst(toppings, topping);
    this.elementsControl.setValue(toppings); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  ngOnInit(): void {
    for (const element of this._elements) {
      this.elementsList.push(element.name);
    }
  }

}
