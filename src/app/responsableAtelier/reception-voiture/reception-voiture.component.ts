import { ListerReparationComponent } from './../lister-reparation/lister-reparation.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

interface Voiture {
  numero: string,
  marque: string,
  dateDepot: Date
}

@Component({
  selector: 'app-reception-voiture',
  templateUrl: './reception-voiture.component.html',
  styleUrls: ['./reception-voiture.component.css']
})
export class ReceptionVoitureComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['numero', 'marque', 'dateDepot', 'reception'];
  liste_voiture!: Voiture[];
  dataSource!: MatTableDataSource<Voiture>;

  constructor(private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog) {
    this.liste_voiture = [];
    this.dataSource = new MatTableDataSource(this.liste_voiture);
  }

  ngOnInit(): void {
    fetch('https://garage-backend-sigma.vercel.app/voiture/non-receptionees', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': sessionStorage.getItem('token-responsable_atelier')!
      }
    })
    .then(response => {
      const rep = response.json();
      const code = response.status;
      if(code == 200) {
        rep.then(data => {
          data.forEach((element:any) => {
            let marque = element.voiture_join[0].marque;
            let numero = element.voiture_join[0].numero;
            let dateDepot = element.mostRecentEvent.date;
            const v: Voiture = {
              numero: numero,
              marque: marque,
              dateDepot: dateDepot
            }
            this.liste_voiture.push(v);
          });
          this.dataSource = new MatTableDataSource(this.liste_voiture);
        });
      } else {
        console.error("Une erreur s'est produite");
      }
    })
    .catch(error => {
      console.error(error)
    })
  }

  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort | any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openDialog(numero: string) {
    this.dialog.open(ListerReparationComponent, {
      data: {
        numero: numero
      }
    });
  }

}
