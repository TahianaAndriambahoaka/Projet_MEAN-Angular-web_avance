import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparationAvancementComponent } from './reparation-avancement.component';

describe('ReparationAvancementComponent', () => {
  let component: ReparationAvancementComponent;
  let fixture: ComponentFixture<ReparationAvancementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReparationAvancementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReparationAvancementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
