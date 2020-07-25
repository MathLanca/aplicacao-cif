import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEvaluationsComponent } from './patient-evaluations.component';

describe('PatientEvaluationsComponent', () => {
  let component: PatientEvaluationsComponent;
  let fixture: ComponentFixture<PatientEvaluationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientEvaluationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientEvaluationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
