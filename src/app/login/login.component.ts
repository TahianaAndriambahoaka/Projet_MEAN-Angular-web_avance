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
  public form!: FormGroup;
  isSubmitted = false;
  login: string = "";
  mdp: string = "";

  constructor(private fb: FormBuilder, private router:Router) {
    this.form = this.fb.group({
      login: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      mdp: ['', [Validators.required]],
    });
  }

  submit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      $('#loginButton').html('<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>&nbsp;Chargement...');
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
            $('#loginButton').html('Se connecter');
            var x = document.getElementById("snackbar");
            x!.innerHTML = message;
            x!.className = "show";
            setTimeout(function(){ x!.className = x!.className.replace("show", ""); }, 10000);
          });
        }
      })
      .catch(err => {
        console.error('err');
        console.error(err);
      });

      // // erreur d'authentification
      // if (!true) {
      //   $('#loginButton').html('Se connecter');
      //   var x = document.getElementById("snackbar");
      //   x!.className = "show";
      //   setTimeout(function(){ x!.className = x!.className.replace("show", ""); }, 10000);
      // } else {
      //   // this.router.navigate(['/client']);
      //   // this.router.navigate(['/responsable-atelier/reception']);
      //   this.router.navigate(['/responsable-financier']);
      // }
    }
  }

  get errorControl() {
    return this.form.controls;
  }

}
