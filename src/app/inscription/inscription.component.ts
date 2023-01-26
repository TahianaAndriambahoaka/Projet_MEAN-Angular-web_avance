import { SafePipe } from '../safe.pipe';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from '../file-upload.service';
import { FileUpload } from '../file-upload.model';
import { AngularFireList } from '@angular/fire/compat/database';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  mdp1: string = "";
  mdp2: string = "";
  count: number = 0;

  constructor(private safe: SafePipe, private fb: FormBuilder, private uploadService: FileUploadService) {
    this.form = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      mdp1: ['', [Validators.required, Validators.minLength(8)]],
      mdp2: ['', [Validators.required]]
    });
  }

  passwordMatchValidator() {
    const password = this.form.get('mdp1')?.value;
    const confirmPassword = this.form.get('mdp2')?.value;
    return password === confirmPassword ? true : false;
  }

  ngOnInit(): void {}

  toggleHover(event: boolean) {
      this.isHovering = event;
  }

  onDrop(fileDropped: FileList) {
    var file = fileDropped.item(0)!;
    const split = file.name.split('.');
    var name = this.SHA256(split[0]+Date.now());
    this.pdp = new FileUpload(new File([file], name+'.'+split[1], {type: file.type}));
    this.pdpURL = this.safe.transform(window.URL.createObjectURL(file));
  }

  changePDP() {
    document.getElementById("imageUpload")!.click();
  }

  selectPDP(fichier: any) {
    var file = fichier.target.files[0];
    const split = file.name.split('.');
    var name = this.SHA256(split[0]+Date.now());
    this.pdp = new FileUpload(new File([file], name+'.'+split[1], {type: file.type}));
    this.pdpURL = this.safe.transform(window.URL.createObjectURL(file));
  }

  submit() {
    this.isSubmitted = true;
    if (this.form.valid && this.passwordMatchValidator()) {
      $('#boutton').html('<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>&nbsp;Chargement...');
      this.nom = this.form.get('nom')?.value;
      this.prenom = this.form.get('prenom')?.value;
      this.mail = this.form.get('mail')?.value;
      this.mdp1 = this.form.get('mdp1')?.value;
      this.mdp2 = this.form.get('mdp2')?.value;

      if(this.pdp) {
        this.count = 1;
        // upload
        this.uploadService.pushFileToStorage(this.pdp).subscribe(
          percentage => {
            this.percentage = percentage;
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
      this.pdp = null;
      this.pdpURL = this.defaultPdpURL;
      this.percentage = 0;

      fetch('https://garage-backend-sigma.vercel.app/users/register', {
        method: 'POST',
        body: JSON.stringify({
          nom: this.nom,
          prenom: this.prenom,
          email: this.mail,
          password: this.mdp1,
          passwordConf: this.mdp2,
          profil: downloadURL
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        console.log(res.json());
        this.isSubmitted = false;
        this.form.reset();
        $('#boutton').html("S'inscrire");
        var x = document.getElementById("success");
        x!.className = "show";
        setTimeout(function(){ x!.className = x!.className.replace("show", ""); }, 10000);
      })
      .then(data => {
        this.isSubmitted = false;
        this.form.reset();
        $('#boutton').html("S'inscrire");
        var x = document.getElementById("success");
        x!.className = "show";
        setTimeout(function(){ x!.className = x!.className.replace("show", ""); }, 10000);
      })
      .catch(err => {
        console.error(err);
        $('#boutton').html("S'inscrire");
        var x = document.getElementById("error");
        x!.className = "show";
        setTimeout(function(){ x!.className = x!.className.replace("show", ""); }, 10000);
      });
    }
  }


  SHA256(s: string){
    var chrsz = 8;
    var hexcase = 0;

    function safe_add (x:any, y:any) {
      var lsw = (x & 0xFFFF) + (y & 0xFFFF);
      var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xFFFF);
    }

    function S (X: any, n: any) { return ( X >>> n ) | (X << (32 - n)); }
    function R (X: any, n: any) { return ( X >>> n ); }
    function Ch(x: any, y: any, z: any) { return ((x & y) ^ ((~x) & z)); }
    function Maj(x: any, y: any, z: any) { return ((x & y) ^ (x & z) ^ (y & z)); }
    function Sigma0256(x: any) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
    function Sigma1256(x: any) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
    function Gamma0256(x: any) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
    function Gamma1256(x: any) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }

    function core_sha256 (m: any, l: any) {
      var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
      var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
      var W = new Array(64);
      var a, b, c, d, e, f, g, h, i:number, j:number;
      var T1, T2;

      m[l >> 5] |= 0x80 << (24 - l % 32);
      m[((l + 64 >> 9) << 4) + 15] = l;

      for ( var i = 0; i<m.length; i+=16 ) {
        a = HASH[0];
        b = HASH[1];
        c = HASH[2];
        d = HASH[3];
        e = HASH[4];
        f = HASH[5];
        g = HASH[6];
        h = HASH[7];

        for ( var j = 0; j<64; j++) {
          if (j < 16) W[j] = m[j + i];
          else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);

          T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
          T2 = safe_add(Sigma0256(a), Maj(a, b, c));

          h = g;
          g = f;
          f = e;
          e = safe_add(d, T1);
          d = c;
          c = b;
          b = a;
          a = safe_add(T1, T2);
        }

        HASH[0] = safe_add(a, HASH[0]);
        HASH[1] = safe_add(b, HASH[1]);
        HASH[2] = safe_add(c, HASH[2]);
        HASH[3] = safe_add(d, HASH[3]);
        HASH[4] = safe_add(e, HASH[4]);
        HASH[5] = safe_add(f, HASH[5]);
        HASH[6] = safe_add(g, HASH[6]);
        HASH[7] = safe_add(h, HASH[7]);
      }
      return HASH;
    }

    function str2binb (str:string) {
      var bin = Array();
      var mask = (1 << chrsz) - 1;
      for(var i = 0; i < str.length * chrsz; i += chrsz) {
        bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
      }
      return bin;
    }

    function Utf8Encode(string:string) {
      string = string.replace(/\r\n/g,'\n');
      var utftext = '';

      for (var n = 0; n < string.length; n++) {

        var c = string.charCodeAt(n);

        if (c < 128) {
          utftext += String.fromCharCode(c);
        }
        else if((c > 127) && (c < 2048)) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        }
        else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }

      }

      return utftext;
    }

    function binb2hex (binarray:any) {
      var hex_tab = hexcase ? '0123456789ABCDEF' : '0123456789abcdef';
      var str = '';
      for(var i = 0; i < binarray.length * 4; i++) {
        str += hex_tab.charAt((binarray[i>>2] >> ((3 - i % 4)*8+4)) & 0xF) +
        hex_tab.charAt((binarray[i>>2] >> ((3 - i % 4)*8 )) & 0xF);
      }
      return str;
    }

    s = Utf8Encode(s);
    return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
  }

}
