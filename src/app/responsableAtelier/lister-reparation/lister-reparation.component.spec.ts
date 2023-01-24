import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerReparationComponent } from './lister-reparation.component';

describe('ListerReparationComponent', () => {
  let component: ListerReparationComponent;
  let fixture: ComponentFixture<ListerReparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListerReparationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListerReparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
