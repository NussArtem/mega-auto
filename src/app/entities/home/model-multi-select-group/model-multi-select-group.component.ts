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
import {FilterParameterGroupValue} from '@app/shared/models/interfaces/helpers/filter-parameter-group-value.model';
import {FilterParametersGroupExtended} from '@app/shared/models/interfaces/helpers/filter-parameters-group-extended';
import {AutoriaDevCredentialsService} from "@app/shared/services/auto-ria/autoria-dev-credentials.service";

@Component({
  selector: 'app-model-multi-select-group',
  templateUrl: './model-multi-select-group.component.html',
  styleUrls: ['./model-multi-select-group.component.scss']
})
export class ModelMultiSelectGroupComponent {


  @ViewChild(CdkVirtualScrollViewport, {static: true}) cdkVirtualScrollViewPort: CdkVirtualScrollViewport;
  @ViewChildren(MatOption) options: QueryList<MatOption>;
  @Output() selectedElementsChange = new EventEmitter();
  @Input()
  label: string;
  @Input()
  disabled: boolean;
  _elementsGroup: FilterParametersGroupExtended[] = [];
  selectedElements: FilterParameterGroupValue[] = [];
  @Output() elementsChange = new EventEmitter();

  set elementsGroup(value: FilterParametersGroupExtended[]) {
    this._elementsGroup = value;
    this.selectedElements = [];
    this.elementsChange.emit(value);
  }

  @Input()
  get elementsGroup(): FilterParametersGroupExtended[] {
    return this._elementsGroup;
  }

  constructor(private changeDetectorRef: ChangeDetectorRef, readonly scrollDispatcher: ScrollDispatcher, private autoriaDevCredentialsService: AutoriaDevCredentialsService) {
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

  rerender(needUpdate) {
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

  removed(element: FilterParameterGroupValue) {
    this.selectedElements.splice(this.selectedElements.indexOf(element), 1);
    this.rerender(true);
    this.selectedElementsChange.emit(this.selectedElements);
  }
}
