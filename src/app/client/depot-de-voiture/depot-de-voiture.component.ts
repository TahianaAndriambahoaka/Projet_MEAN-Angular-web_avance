import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-depot-de-voiture',
  templateUrl: './depot-de-voiture.component.html',
  styleUrls: ['./depot-de-voiture.component.css']
})
export class DepotDeVoitureComponent {
  public form!: FormGroup;
  isSubmitted = false;
  numero: string = '';
  marque: string = '';
  date!: Date;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      numero: ['', [Validators.required]],
      marque: ['', [Validators.required]],
      date: ['', [Validators.required]]
    });
  }

  onDateChange(event: MatDatepickerInputEvent<Date> | any) {
    this.date = event.value;
  }


  submit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      console.log(this.numero);
      console.log(this.marque);
      console.log(this.date);
    }
  }

  get errorControl() {
    return this.form.controls;
  }
}
