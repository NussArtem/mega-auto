import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChipsMultInputComponent} from './chips-mult-input.component';

describe('ChipsMultInputComponent', () => {
  let component: ChipsMultInputComponent;
  let fixture: ComponentFixture<ChipsMultInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChipsMultInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsMultInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
