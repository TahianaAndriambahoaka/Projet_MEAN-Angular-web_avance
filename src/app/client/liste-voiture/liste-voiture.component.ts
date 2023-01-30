import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { DepotDeVoitureComponent } from '../depot-de-voiture/depot-de-voiture.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from 'src/app/footer/footer.component';
import { ReparationAvancementComponent } from '../reparation-avancement/reparation-avancement.component';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

const ELEMENT_DATA = [
  {numero: '1', marque: 'Hydrogen', status: 'Déposée', boutton: ''},
  {numero: '2', marque: 'Helium', status: 'En cours de réparation', boutton: ''},
  {numero: '3', marque: 'Lithium', status: 'Réparée', boutton: ''},
  {numero: '4', marque: 'Beryllium', status: 'Déposée', boutton: ''},
  {numero: '5', marque: 'Boron', status: 'En cours de réparation', boutton: ''},
  {numero: '6', marque: 'Carbon', status: 'Réparée', boutton: ''},
  {numero: '7', marque: 'Nitrogen', status: 'Déposée', boutton: ''},
  {numero: '8', marque: 'Oxygen', status: 'En cours de réparation', boutton: ''},
  {numero: '9', marque: 'Fluorine', status: 'Réparée', boutton: ''},
  {numero: '10', marque: 'Neon', status: 'Déposée', boutton: ''},
  {numero: '10', marque: 'Neon', status: 'Déposée', boutton: ''},
  {numero: '10', marque: 'Neon', status: 'Déposée', boutton: ''},
  {numero: '10', marque: 'Neon', status: 'Déposée', boutton: ''},
  {numero: '10', marque: 'Neon', status: 'Déposée', boutton: ''},
];

interface AchatPiece {
  nom: string,
  pu: number,
  quantite: number
}

interface Reparation {
  achat_piece: AchatPiece[],
  frais: number,
  debut_reparation: Date | null,
  fin_reparation: Date | null,
  description: string,
  payement: Date | null
}

interface Voiture {
  marque: string,
  numero: string,
  reparation: Reparation[],
  type: string
}

@Component({
  selector: 'app-liste-voiture',
  templateUrl: './liste-voiture.component.html',
  styleUrls: ['./liste-voiture.component.css'],
  entryComponents: [HeaderComponent, FooterComponent]
})
export class ListeVoitureComponent implements OnInit {
  loading = false;
  isLoading = true;
  error = false;
  liste_voiture!: Voiture[];
  displayedColumns: string[] = ['numero', 'marque', 'status', 'boutton'];
  dataSource!: MatTableDataSource<Voiture>;
  marques: string[] = ['Hydrogen', 'Beryllium', 'Neon'];
  topOfPage: any;

  public form!: FormGroup;
  formControl = new FormControl('');
  rechercheNumero!: string | null;
  rechercheMarque!: string | null;
  filteredOptions!: Observable<string[]>;

  constructor(private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog, private el: ElementRef, private router: Router, private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.topOfPage = el.nativeElement.querySelector('#top');
    this.form = this.fb.group({
      rechercheNumero: [''],
      rechercheMarque: ['']
    });
  }

  ngOnInit() {
    this.getData();
    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  @ViewChild(MatSort) sort!: MatSort;
  getData() {
    this.isLoading = true;
    this.liste_voiture = [];
    fetch('https://garage-backend-sigma.vercel.app/voiture/voiture-present', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': sessionStorage.getItem('token-client')!
      }
    })
    .then(response => {
      this.isLoading = false;
      this.error = false;
      const rep = response.json();
      const code = response.status;
      if(code == 200) {
        rep.then(data => {
          this.liste_voiture = [];
          data.forEach((element:any) => {
            let reparation : Reparation[] = [];
            if(element.evenement.type == 'validation sortie') {
              const voiture : Voiture = {
                marque: element.marque,
                numero: element.numero,
                reparation: reparation,
                type: 'validation sortie'
              }
              this.liste_voiture.push(voiture);
            } else if(element.evenement.type == 'reception') {
              element.evenement.reparation.forEach((element2:any) => {
                let achat_piece : AchatPiece[] = [];
                element2.achat_piece.forEach((element3:any) => {
                  const ap : AchatPiece = {
                    nom : element3.nom,
                    pu : element3.pu,
                    quantite : element3.quantite
                  }
                  achat_piece.push(ap);
                });
                const rep : Reparation = {
                  frais: element2.frais,
                  debut_reparation: element2.debut_reparation,
                  fin_reparation : element2.fin_reparation,
                  description : element2.description,
                  achat_piece : achat_piece,
                  payement: element2.payement
                };
                reparation.push(rep);
              });
              const voiture : Voiture = {
                marque: element.marque,
                numero: element.numero,
                reparation: reparation,
                type: 'reception'
              }
              this.liste_voiture.push(voiture);
            }

          });
          this.dataSource = new MatTableDataSource(this.liste_voiture);

          this.dataSource.sort = this.sort;

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

  openDialog() {
    this.dialog.open(DepotDeVoitureComponent);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.topOfPage = this.el.nativeElement.querySelector('#top');
    if (document.documentElement.scrollTop || document.body.scrollTop > this.topOfPage.offsetTop) {
      document.querySelector('.scrollToTop')!.classList.add('show');
    } else {
      document.querySelector('.scrollToTop')!.classList.remove('show');
    }
  }


  scrollToTop() {
    document.getElementById('top')!.scrollIntoView({behavior: 'smooth'});
  }

  makeActive(index: number) {
    this.dataSource.data.forEach((element: any, i) => {
      element.active = i === index;
    });
    if(document.getElementById('clientreparationavancement')) document.getElementById('clientreparationavancement')!.scrollIntoView({behavior: 'smooth'});
    if(document.getElementById('factureetatpaiement')) document.getElementById('factureetatpaiement')!.scrollIntoView({behavior: 'smooth'});
    if(document.getElementById('historiquereparation')) document.getElementById('historiquereparation')!.scrollIntoView({behavior: 'smooth'});
  }

  private _filter(value: string): string[] {
    return this.marques.filter(option => option.toLowerCase().includes(value.toLowerCase()));
  }

  rechercher() {
    var tab: any[] = [];
    this.liste_voiture.forEach(element => {
      if((element.numero.includes(this.rechercheNumero!)&&element.marque.includes(this.rechercheMarque!)&&this.rechercheMarque&&this.rechercheNumero) ||(element.numero.includes(this.rechercheNumero!)&&!this.rechercheMarque) || (element.marque.includes(this.rechercheMarque!)&&!this.rechercheNumero) || (!this.rechercheNumero&&!this.rechercheMarque)) {
        tab.push(element);
      }
    });
    this.dataSource = new MatTableDataSource(tab);
    this.dataSource.sort = this.sort;
  }

  recuperer(numero: string) {
    this.loading = true;
    fetch('https://garage-backend-sigma.vercel.app/voiture/recuperer', {
        method: 'PUT',
        body: JSON.stringify({
          numero: numero
        }),
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': sessionStorage.getItem('token-client')!
        }
      })
      .then(response => {
        this.isLoading = false;
        const code = response.status;
        if(code == 200) {
          this.snackBar.open('Voiture récupérée avec succès!', 'Fermer', {
            duration: 10000
          });
          this.getData();
        } else {
          this.snackBar.open("Une erreur s'est produite!", 'Fermer', {
            duration: 10000
          });
        }
        this.loading = false;
      })
      .catch(error => {
        this.isLoading = false;
        console.error(error);
        this.snackBar.open("Une erreur s'est produite!", 'Fermer', {
          duration: 10000
        });
        this.loading = false;
      })
  }
}
