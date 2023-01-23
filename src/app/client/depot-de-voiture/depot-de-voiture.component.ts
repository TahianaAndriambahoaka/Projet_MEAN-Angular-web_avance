import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-depot-de-voiture',
  templateUrl: './depot-de-voiture.component.html',
  styleUrls: ['./depot-de-voiture.component.css']
})
export class DepotDeVoitureComponent implements OnInit {
  public form!: FormGroup;
  isSubmitted = false;
  numero!: string | null;
  marque!: string | null;
  date!: Date;
  formControl = new FormControl('');
  filteredOptions!: Observable<string[]>;
  marques: string[] = ['Hydrogen', 'Beryllium', 'Neon'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      numero: ['', [Validators.required]],
      marque: ['', [Validators.required]],
      date: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
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
  
  private _filter(value: string): string[] {
    return this.marques.filter(option => option.toLowerCase().includes(value.toLowerCase()));
  }

}
