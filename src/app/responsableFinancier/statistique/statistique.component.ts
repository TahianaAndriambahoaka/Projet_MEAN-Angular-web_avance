import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {
  isLoading = true;
  error = false;
  tempRepMoyen!: string;

  constructor() {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.isLoading = true;
    fetch('https://garage-backend-sigma.vercel.app/voiture/temp-rep-moyenne', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': sessionStorage.getItem('token-responsable_financier')!
      }
    })
    .then(response => {
      this.isLoading = false;
      this.error = false;
      const rep = response.json();
      const code = response.status;
      if(code == 200) {
        rep.then(data => {
          const jour = data[0].duree_reparation_moyenne_reception_voiture_jour;
          const heure = data[0].duree_reparation_moyenne_reception_voiture_heure;
          const minute = data[0].duree_reparation_moyenne_reception_voiture_minute;
          const seconde = data[0].duree_reparation_moyenne_reception_voiture_seconde;
          let temp = '';
          if(jour>0) {
            if (jour == 1) {
              temp += jour+' jour';
            } else {
              temp += jour+' jours';
            }
          }
          if(heure>0) {
            if (heure == 1) {
              temp += ' '+heure+' heure';
            } else {
              temp += ' '+heure+' heures';
            }
          }
          if(minute>0) {
            if (minute == 1) {
              temp += ' '+minute+' minute';
            } else {
              temp += ' '+minute+' minutes';
            }
          }
          if(seconde>0) {
            if (seconde == 1) {
              temp += ' '+seconde+' seconde';
            } else {
              temp += ' '+seconde+' secondes';
            }
          }
          this.tempRepMoyen = temp;
        });
      } else {
        this.error = true;
        console.error("Une erreur s'est produite");
      }
    })
    .catch(error => {
      this.isLoading = false;
      this.error = true;
      console.error(error);
    })
  }

}
