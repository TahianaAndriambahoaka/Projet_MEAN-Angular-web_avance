import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

interface DureeReparation {
  numero: number
  debut: Date,
  fin: Date,
  reparation: string,
  duree: string
}

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {
  isLoading = true;
  error = false;
  tempRepMoyen!: string;
  listeDureeReparation!: DureeReparation[];
  colonneListeDureeReparation: string[] = ['numero', 'reparation', 'debut', 'fin', 'duree'];
  dataSourceListeDureeReparation!: MatTableDataSource<DureeReparation>;

  constructor(private _liveAnnouncer: LiveAnnouncer) {
    this.listeDureeReparation = [];
    this.tempRepMoyen = '';
  }

  ngOnInit(): void {
    this.getData();
  }

  @ViewChild(MatSort) sort!: MatSort;
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
          data.forEach((element:any) => {
            let descriptions: string = "";
            element.descriptions.forEach((element2:any) => {
              descriptions += element2+", ";
            });
            const c : DureeReparation = {
              numero: element.numero,
              debut: element.min_debut_reparation,
              fin: element.max_fin_reparation,
              reparation: descriptions.substring(0, descriptions.length - 2),
              duree: this.msToTime(element.difference_ms)
            }
            this.listeDureeReparation.push(c);
          });
          this.dataSourceListeDureeReparation = new MatTableDataSource(this.listeDureeReparation);
          this.dataSourceListeDureeReparation.sort = this.sort;
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

  announceSortChange(sortState: Sort | any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  msToTime(duration: number) {
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? 0 + hours : hours;
    minutes = (minutes < 10) ? 0 + minutes : minutes;
    seconds = (seconds < 10) ? 0 + seconds : seconds;

    return hours + "h:" + minutes + "mn:" + seconds + "sec";
  }

}
