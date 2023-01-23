import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueReparationComponent } from './historique-reparation.component';

describe('HistoriqueReparationComponent', () => {
  let component: HistoriqueReparationComponent;
  let fixture: ComponentFixture<HistoriqueReparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueReparationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueReparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
