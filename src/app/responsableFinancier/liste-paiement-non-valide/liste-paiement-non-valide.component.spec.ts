import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePaiementNonValideComponent } from './liste-paiement-non-valide.component';

describe('ListePaiementNonValideComponent', () => {
  let component: ListePaiementNonValideComponent;
  let fixture: ComponentFixture<ListePaiementNonValideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListePaiementNonValideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListePaiementNonValideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
