import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionVoitureComponent } from './reception-voiture.component';

describe('ReceptionVoitureComponent', () => {
  let component: ReceptionVoitureComponent;
  let fixture: ComponentFixture<ReceptionVoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceptionVoitureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
