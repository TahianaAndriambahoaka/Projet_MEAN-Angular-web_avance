import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationPaiementComponent } from './validation-paiement.component';

describe('ValidationPaiementComponent', () => {
  let component: ValidationPaiementComponent;
  let fixture: ComponentFixture<ValidationPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationPaiementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
