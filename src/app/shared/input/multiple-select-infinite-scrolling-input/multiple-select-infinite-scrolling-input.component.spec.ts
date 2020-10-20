import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MultipleSelectInfiniteScrollingInputComponent} from './multiple-select-infinite-scrolling-input.component';

describe('MultipleSelectInfiniteScrollingInputComponent', () => {
  let component: MultipleSelectInfiniteScrollingInputComponent;
  let fixture: ComponentFixture<MultipleSelectInfiniteScrollingInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultipleSelectInfiniteScrollingInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleSelectInfiniteScrollingInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
