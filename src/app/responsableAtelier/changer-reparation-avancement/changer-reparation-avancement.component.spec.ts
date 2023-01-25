import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangerReparationAvancementComponent } from './changer-reparation-avancement.component';

describe('ChangerReparationAvancementComponent', () => {
  let component: ChangerReparationAvancementComponent;
  let fixture: ComponentFixture<ChangerReparationAvancementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangerReparationAvancementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangerReparationAvancementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
