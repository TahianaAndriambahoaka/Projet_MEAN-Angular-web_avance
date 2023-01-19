import { SafePipe } from '../safe.pipe';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  isHovering: boolean | undefined;
  pdpURL : any;
  pdp!: File;

  public form!: FormGroup;
  isSubmitted = false;
  nom: string = "";
  prenom: string = "";
  mail: string = "";

  constructor(private safe: SafePipe, private fb: FormBuilder) {
    this.form = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    });
  }

  ngOnInit(): void {
    this.pdpURL = 'https://firebasestorage.googleapis.com/v0/b/m1p10mean-tahiana-tsantaniaina.appspot.com/o/pdp%2FT0266FRGM-U2Q173U05-g863c2a865d7-512.png?alt=media&token=85d91b21-3a25-438a-99f5-d9495bac4ba3';

    var pdpTemp = null;
    var pdpURLTemp = null;
    $("#imageUpload").change(function(){
      var uploader: any = this;
      if ( uploader!.files && uploader!.files[0] ){
        $('#profileImage').attr('src',
        window.URL.createObjectURL(uploader.files[0]) );
      }
    });
  }

  toggleHover(event: boolean) {
      this.isHovering = event;
  }

  onDrop(fileDropped: FileList) {
    this.pdp = fileDropped.item(0)!;
    this.pdpURL = this.safe.transform(window.URL.createObjectURL(this.pdp));
  }

  changePDP() {
    document.getElementById("imageUpload")!.click();
  }

  submit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      $('#boutton').html('<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>&nbsp;Chargement...');
      this.nom=this.form.get('nom')?.value;
      this.prenom=this.form.get('prenom')?.value;
      this.mail=this.form.get('mail')?.value;
      console.log(this.nom);
      console.log(this.prenom);
      console.log(this.mail);

      // erreur
      if (!true) {
        $('#boutton').html("S'inscrire");
        var x = document.getElementById("error");
        x!.className = "show";
        setTimeout(function(){ x!.className = x!.className.replace("show", ""); }, 10000);
      } else { // success
        // this.router.navigate(['/inscription']);
        this.isSubmitted = false;
        this.form.reset();
        $('#boutton').html("S'inscrire");
        var x = document.getElementById("success");
        x!.className = "show";
        setTimeout(function(){ x!.className = x!.className.replace("show", ""); }, 10000);
      }
    }
  }

  get errorControl() {
    return this.form.controls;
  }

}
