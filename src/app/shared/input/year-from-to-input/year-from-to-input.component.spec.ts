import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearFromToInputComponent } from './year-from-to-input.component';

describe('YearFromToInputComponent', () => {
  let component: YearFromToInputComponent;
  let fixture: ComponentFixture<YearFromToInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearFromToInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearFromToInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
