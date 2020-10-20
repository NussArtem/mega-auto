import {
  Component,
  ViewChild,
  ViewChildren,
  QueryList,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {CdkVirtualScrollViewport, ScrollDispatcher} from '@angular/cdk/scrolling';
import {MatOption} from '@angular/material/core';
import {filter} from 'rxjs/operators';
import {SelectionOptions} from '@app/shared/models/interfaces/selection-options';
import {FilterParameters} from "@app/shared/models/interfaces/FilterParameters";

@Component({
  selector: 'app-multiple-select-infinite-scrolling-input',
  templateUrl: './multiple-select-infinite-scrolling-input.component.html',
  styleUrls: ['./multiple-select-infinite-scrolling-input.component.scss']
})
export class MultipleSelectInfiniteScrollingInputComponent {
  @ViewChild(CdkVirtualScrollViewport, {static: true}) cdkVirtualScrollViewPort: CdkVirtualScrollViewport;
  @ViewChildren(MatOption) options: QueryList<MatOption>;
  @Output() selectedElementsChange = new EventEmitter();
  @Input()
  label: string;
  @Input()
  disabled: boolean;
  _elements: FilterParameters[] = [];
  selectedElements: FilterParameters[] = [];
  visibleElements: FilterParameters[] = [];
  @Output() validChange = new EventEmitter();

  set elements(value: FilterParameters[]) {
    this._elements = value;
    this.selectedElements = [];
    this.validChange.emit(value);
  }

  @Input()
  get elements(): FilterParameters[] {
    return this._elements;
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
      this.visibleElements = this.selectedElements;

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
  }
}
