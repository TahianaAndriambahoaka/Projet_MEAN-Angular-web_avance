import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoitureGarageComponent } from './voiture-garage.component';

describe('VoitureGarageComponent', () => {
  let component: VoitureGarageComponent;
  let fixture: ComponentFixture<VoitureGarageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoitureGarageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoitureGarageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
