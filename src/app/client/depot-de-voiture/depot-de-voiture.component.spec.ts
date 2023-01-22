import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepotDeVoitureComponent } from './depot-de-voiture.component';

describe('DepotDeVoitureComponent', () => {
  let component: DepotDeVoitureComponent;
  let fixture: ComponentFixture<DepotDeVoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepotDeVoitureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepotDeVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
