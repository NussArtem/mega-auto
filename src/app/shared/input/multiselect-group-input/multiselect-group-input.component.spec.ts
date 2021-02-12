import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MultiselectGroupInputComponent} from './multiselect-group-input.component';

describe('MultiselectGroupInputComponent', () => {
  let component: MultiselectGroupInputComponent;
  let fixture: ComponentFixture<MultiselectGroupInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultiselectGroupInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiselectGroupInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
