import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirFactureComponent } from './voir-facture.component';

describe('VoirFactureComponent', () => {
  let component: VoirFactureComponent;
  let fixture: ComponentFixture<VoirFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoirFactureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoirFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
