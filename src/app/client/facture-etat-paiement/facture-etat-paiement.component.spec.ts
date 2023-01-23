import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureEtatPaiementComponent } from './facture-etat-paiement.component';

describe('FactureEtatPaiementComponent', () => {
  let component: FactureEtatPaiementComponent;
  let fixture: ComponentFixture<FactureEtatPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactureEtatPaiementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactureEtatPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
