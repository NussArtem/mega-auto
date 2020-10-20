import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FromToInputComponent } from './from-to-input.component';

describe('CostToInputComponent', () => {
  let component: FromToInputComponent;
  let fixture: ComponentFixture<FromToInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FromToInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FromToInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
