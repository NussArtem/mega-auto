import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MultipleSelectGroupInputComponent} from './multiple-select-group-input.component';

describe('MultipleSelectGroupInputComponent', () => {
  let component: MultipleSelectGroupInputComponent;
  let fixture: ComponentFixture<MultipleSelectGroupInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultipleSelectGroupInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleSelectGroupInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
