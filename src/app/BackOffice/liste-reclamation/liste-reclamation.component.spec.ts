import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReclamationComponent } from './liste-reclamation.component';

describe('ListeReclamationComponent', () => {
  let component: ListReclamationComponent;
  let fixture: ComponentFixture<ListReclamationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReclamationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListReclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
