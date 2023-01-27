import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading:boolean = false;
  public form!: FormGroup;
  isSubmitted = false;
  login: string = "";
  mdp: string = "";

  constructor(private fb: FormBuilder, private router:Router) {
    this.form = this.fb.group({
      login: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      mdp: ['', [Validators.required]],
    });
  }

  submit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.loading = true;
      this.login=this.form.get('login')?.value;
      this.mdp=this.form.get('mdp')?.value;


      fetch('https://garage-backend-sigma.vercel.app/users/login', {
        method: 'POST',
        body: JSON.stringify({
          email: this.login,
          password: this.mdp
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        this.loading = false;
        const code = res.status;
        if(code == 200) {
          // ok
          this.isSubmitted = false;
          this.form.reset();
          res.json().then(data => {
            if (!data.user.poste) {
              // client
              sessionStorage.setItem('token-client', data.token);
              this.router.navigate(['/client']);
            } else {
              // employé
              if (data.user.poste[data.user.poste.length-1].nom == 'responsable_atelier') {
                // responsable_atelier
                sessionStorage.setItem('token-responsable_atelier', data.token);
                this.router.navigate(['/responsable-atelier']);
              } else {
                // responsable_financier
                sessionStorage.setItem('token-responsable_financier', data.token);
                this.router.navigate(['/responsable-financier']);
              }
            }
            
          });
        } else if(code == 401) { // erreur d'authentifiation
          res.json().then(data => {
            const message = data.message;
            var x = document.getElementById("snackbar");
            x!.innerHTML = message;
            x!.className = "show";
            setTimeout(function(){ x!.className = x!.className.replace("show", ""); }, 10000);
          });
        }
      })
      .catch(err => {
        this.loading = false;
        console.error('err');
        console.error(err);
      });
    }
  }

  get errorControl() {
    return this.form.controls;
  }

}
