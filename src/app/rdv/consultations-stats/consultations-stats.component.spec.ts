import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationsStatsComponent } from './consultations-stats.component';

describe('ConsultationsStatsComponent', () => {
  let component: ConsultationsStatsComponent;
  let fixture: ComponentFixture<ConsultationsStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultationsStatsComponent]
    });
    fixture = TestBed.createComponent(ConsultationsStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
