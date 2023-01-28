import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-depot-de-voiture',
  templateUrl: './depot-de-voiture.component.html',
  styleUrls: ['./depot-de-voiture.component.css']
})
export class DepotDeVoitureComponent implements OnInit {
  loading = false;
  public form!: FormGroup;
  isSubmitted = false;
  numero!: string | null;
  marque!: string | null;
  // date!: Date;
  formControl = new FormControl('');
  filteredOptions!: Observable<string[]>;
  marques: string[] = ['Hydrogen', 'Beryllium', 'Neon'];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      numero: ['', [Validators.required]],
      marque: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }


  submit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.loading = true;
      fetch('https://garage-backend-sigma.vercel.app/voiture/depot', {
        method: 'POST',
        body: JSON.stringify({
          marque: this.marque,
          numero: this.numero
        }),
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': sessionStorage.getItem('token-client')!
        }
      })
      .then(response => {
        this.loading = false;
        const code = response.status;
        if(code == 201) {
          this.form.reset();
          this.snackBar.open('Voiture déposée avec succès!', 'Fermer', {
            duration: 10000
          });
        } else {
          response.json().then(data => {
            this.snackBar.open(data.message, 'Fermer', {
              duration: 10000
            });
          });
        }
        this.isSubmitted = false;
      })
      .catch(error => {
        this.loading = false;
        console.error(error)
      })
    }
  }

  get errorControl() {
    return this.form.controls;
  }
  
  private _filter(value: string): string[] {
    return this.marques.filter(option => option.toLowerCase().includes(value.toLowerCase()));
  }

}
