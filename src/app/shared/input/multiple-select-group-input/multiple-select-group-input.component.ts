import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {CdkVirtualScrollViewport, ScrollDispatcher} from '@angular/cdk/scrolling';
import {MatOption} from '@angular/material/core';
import {filter} from 'rxjs/operators';
import {FilterParametersGroup} from '@app/shared/models/interfaces/filter-parameters-group';
import {FilterParameters} from '@app/shared/models/interfaces/FilterParameters';

@Component({
  selector: 'app-multiple-select-group-input',
  templateUrl: './multiple-select-group-input.component.html',
  styleUrls: ['./multiple-select-group-input.component.scss']
})
export class MultipleSelectGroupInputComponent {

  @ViewChild(CdkVirtualScrollViewport, {static: true}) cdkVirtualScrollViewPort: CdkVirtualScrollViewport;
  @ViewChildren(MatOption) options: QueryList<MatOption>;
  @Input()
  label: string;
  @Input()
  disabled: boolean;
  _elementsGroup: FilterParametersGroup[] = [];
  _selectedElements: FilterParameters[] = [];
  @Output() elementsGroupChange = new EventEmitter();

  set elementsGroup(value: FilterParametersGroup[]) {
    this._elementsGroup = value;
    this._selectedElements = [];
    this.elementsGroupChange.emit(value);
  }

  @Input()
  get elementsGroup(): FilterParametersGroup[] {
    return this._elementsGroup;
  }

  @Output() selectedElementsChange = new EventEmitter();

  set selectedElements(value: FilterParameters[]) {
    this._selectedElements = value;
    this.selectedElementsChange.emit(this._selectedElements);
  }

  @Input()
  get selectedElements(): FilterParameters[] {
    return this._selectedElements;
  }

  constructor(private changeDetectorRef: ChangeDetectorRef, readonly scrollDispatcher: ScrollDispatcher) {

  }

  ngAfterViewInit(): void {
    this.scrollDispatcher
      .scrolled()
      .pipe(filter(scrollable => this.cdkVirtualScrollViewPort === scrollable))
      .subscribe(() => {
        let needUpdate = false;

        this.rerender(needUpdate);

        if (needUpdate) {
          this.changeDetectorRef.detectChanges();
        }
      });
  }

  rerender(needUpdate: boolean) {
    this.options.forEach(option => {
      const selected = this._selectedElements.includes(option.value);

      if (selected && !option.selected) {
        option.select();
        needUpdate = true;
      } else if (!selected && option.selected) {
        option.deselect();
        needUpdate = true;
      }
    });
  }

  onOpen() {
    this.cdkVirtualScrollViewPort.scrollToIndex(5);
  }

  openChange($event: boolean) {
    if ($event) {
      this.onOpen();
      this.cdkVirtualScrollViewPort.scrollToIndex(0);
      this.cdkVirtualScrollViewPort.checkViewportSize();
    }
  }

  onSelectionChange(change): void {
    if (!change.isUserInput) {
      return;
    }
    const value = change.source.value;
    const idx = this._selectedElements.indexOf(change.source.value);

    if (idx > -1) {
      this._selectedElements.splice(idx, 1);
    } else {
      this._selectedElements.push(value);
    }
    this.selectedElementsChange.emit(this._selectedElements);

  }

  removed(element: FilterParameters) {
    this._selectedElements.splice(this._selectedElements.indexOf(element), 1);
    this.rerender(true);
    this.selectedElementsChange.emit(this._selectedElements);
  }
}
