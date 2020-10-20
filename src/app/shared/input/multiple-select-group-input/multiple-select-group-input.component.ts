import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {SelectionOptions} from '@app/shared/models/interfaces/selection-options';
import {SelectionOptionsGroup} from '@app/shared/models/interfaces/selection-options-group';
import {CdkVirtualScrollViewport, ScrollDispatcher} from '@angular/cdk/scrolling';
import {MatOption} from '@angular/material/core';
import {filter} from 'rxjs/operators';
import {FilterParametersGroup} from "@app/shared/models/interfaces/filter-parameters-group";
import {FilterParameters} from "@app/shared/models/interfaces/FilterParameters";

@Component({
  selector: 'app-multiple-select-group-input',
  templateUrl: './multiple-select-group-input.component.html',
  styleUrls: ['./multiple-select-group-input.component.scss', '../multiple-select-infinite-scrolling-input/multiple-select-infinite-scrolling-input.component.scss']
})
export class MultipleSelectGroupInputComponent {

  @ViewChild(CdkVirtualScrollViewport, {static: true}) cdkVirtualScrollViewPort: CdkVirtualScrollViewport;
  @ViewChildren(MatOption) options: QueryList<MatOption>;
  @Output() selectedElementsChange = new EventEmitter();
  @Input()
  label: string;
  @Input()
  disabled: boolean;
  _elementsGroup: FilterParametersGroup[] = [];
  selectedElements: FilterParameters[] = [];
  @Output() elementsChange = new EventEmitter();

  set elementsGroup(value: FilterParametersGroup[]) {
    this._elementsGroup = value;
    this.selectedElements = [];
    this.elementsChange.emit(value);
  }

  @Input()
  get elementsGroup(): FilterParametersGroup[] {
    return this._elementsGroup;
  }

  constructor(private changeDetectorRef: ChangeDetectorRef, readonly scrollDispatcher: ScrollDispatcher) {

  }

  ngAfterViewInit(): void {
    this.scrollDispatcher
      .scrolled()
      .pipe(filter(scrollable => this.cdkVirtualScrollViewPort === scrollable))
      .subscribe(() => {
        let needUpdate = false;

        this.options.forEach(option => {
          const selected = this.selectedElements.includes(option.value);

          if (selected && !option.selected) {
            option.select();
            needUpdate = true;
          } else if (!selected && option.selected) {
            option.deselect();
            needUpdate = true;
          }
        });

        if (needUpdate) {
          this.changeDetectorRef.detectChanges();
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
    const idx = this.selectedElements.indexOf(change.source.value);

    if (idx > -1) {
      this.selectedElements.splice(idx, 1);
    } else {
      this.selectedElements.push(value);
    }
    this.selectedElementsChange.emit(this.selectedElements);

  }
  removed(element: FilterParameters){
    this.selectedElements.splice(this.selectedElements.indexOf(element), 1);
    this.selectedElementsChange.emit(this.selectedElements);
  }
}
