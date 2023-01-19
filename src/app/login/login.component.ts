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
      console.log(this.login);
      console.log(this.mdp);

      // erreur d'authentification
      if (!true) {
        $('#loginButton').html('Se connecter');
        var x = document.getElementById("snackbar");
        x!.className = "show";
        setTimeout(function(){ x!.className = x!.className.replace("show", ""); }, 10000);
      } else {
        this.router.navigate(['/inscription']);
      }
    }
  }

  get errorControl() {
    return this.form.controls;
  }

}
