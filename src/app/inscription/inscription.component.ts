import { SafePipe } from '../safe.pipe';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from '../file-upload.service';
import { FileUpload } from '../file-upload.model';
import { AngularFireList } from '@angular/fire/compat/database';
import { finalize, map } from 'rxjs/operators';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  isHovering: boolean | undefined;
  defaultPdpURL : any = 'https://firebasestorage.googleapis.com/v0/b/m1p10mean-tahiana-tsantaniaina.appspot.com/o/pdp%2FT0266FRGM-U2Q173U05-g863c2a865d7-512.png?alt=media&token=85d91b21-3a25-438a-99f5-d9495bac4ba3';
  pdpURL : any = 'https://firebasestorage.googleapis.com/v0/b/m1p10mean-tahiana-tsantaniaina.appspot.com/o/pdp%2FT0266FRGM-U2Q173U05-g863c2a865d7-512.png?alt=media&token=85d91b21-3a25-438a-99f5-d9495bac4ba3';
  pdp: any;
  percentage: any = 0;

  public form!: FormGroup;
  isSubmitted = false;
  nom: string = "";
  prenom: string = "";
  mail: string = "";
  count: number = 0;

  constructor(private safe: SafePipe, private fb: FormBuilder, private uploadService: FileUploadService) {
    this.form = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    });
  }

  ngOnInit(): void {}

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

  selectPDP(fichier: any) {
    this.pdp = fichier.target.files[0];
    this.pdpURL = this.safe.transform(window.URL.createObjectURL(this.pdp));
  }

  submit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      $('#boutton').html('<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>&nbsp;Chargement...');
      this.nom = this.form.get('nom')?.value;
      this.prenom = this.form.get('prenom')?.value;
      this.mail = this.form.get('mail')?.value;

      if(this.pdp) {
        this.count = 1;
        this.pdp = new FileUpload(this.pdp);
        // upload
        this.uploadService.pushFileToStorage(this.pdp).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
            this.uploadService.uploadTask.snapshotChanges().pipe(
              finalize(() => {
                this.uploadService.storageRef.getDownloadURL().subscribe((downloadURL: any) => {
                  this.ws(downloadURL);
                  this.count += 1;
                });
              })
            ).subscribe();
          },
          error => {
            console.log(error);
          }
        );
      } else {
        this.count = 1;
        this.ws(this.pdpURL);
      }

    }
  }

  get errorControl() {
    return this.form.controls;
  }

  ws(downloadURL: string) {
    if (this.count == 1) {
      console.log(this.nom);
      console.log(this.prenom);
      console.log(this.mail);
      console.log(downloadURL);
      this.pdp = null;
      this.pdpURL = this.defaultPdpURL;
      this.percentage = 0;

      // erreur
      if (!true) {
        $('#boutton').html("S'inscrire");
        var x = document.getElementById("error");
        x!.className = "show";
        setTimeout(function(){ x!.className = x!.className.replace("show", ""); }, 10000);
      } else { // success
        this.isSubmitted = false;
        this.form.reset();
        $('#boutton').html("S'inscrire");
        var x = document.getElementById("success");
        x!.className = "show";
        setTimeout(function(){ x!.className = x!.className.replace("show", ""); }, 10000);
      }
    }
  }

}
