import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModelMultiSelectGroupComponent} from './model-multi-select-group.component';

describe('ModelMultiSelectGroupComponent', () => {
  let component: ModelMultiSelectGroupComponent;
  let fixture: ComponentFixture<ModelMultiSelectGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModelMultiSelectGroupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelMultiSelectGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
