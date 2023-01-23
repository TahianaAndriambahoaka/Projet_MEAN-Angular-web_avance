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

const ELEMENT_DATA = [
  {numero: 1, marque: 'Hydrogen', status: 'Déposée', reparation_avancament: '', facture_paiement: '', historique: 'Historique des réparations'},
  {numero: 2, marque: 'Helium', status: 'En cours de réparation', reparation_avancament: '', facture_paiement: '', historique: 'Historique des réparations'},
  {numero: 3, marque: 'Lithium', status: 'Réparée', reparation_avancament: '', facture_paiement: '', historique: 'Historique des réparations'},
  {numero: 4, marque: 'Beryllium', status: 'Déposée', reparation_avancament: '', facture_paiement: '', historique: 'Historique des réparations'},
  {numero: 5, marque: 'Boron', status: 'En cours de réparation', reparation_avancament: '', facture_paiement: '', historique: 'Historique des réparations'},
  {numero: 6, marque: 'Carbon', status: 'Réparée', reparation_avancament: '', facture_paiement: '', historique: 'Historique des réparations'},
  {numero: 7, marque: 'Nitrogen', status: 'Déposée', reparation_avancament: '', facture_paiement: '', historique: 'Historique des réparations'},
  {numero: 8, marque: 'Oxygen', status: 'En cours de réparation', reparation_avancament: '', facture_paiement: '', historique: 'Historique des réparations'},
  {numero: 9, marque: 'Fluorine', status: 'Réparée', reparation_avancament: '', facture_paiement: '', historique: 'Historique des réparations'},
  {numero: 10, marque: 'Neon', status: 'Déposée', reparation_avancament: '', facture_paiement: '', historique: 'Historique des réparations'},
  {numero: 10, marque: 'Neon', status: 'Déposée', reparation_avancament: '', facture_paiement: '', historique: 'Historique des réparations'},
  {numero: 10, marque: 'Neon', status: 'Déposée', reparation_avancament: '', facture_paiement: '', historique: 'Historique des réparations'},
  {numero: 10, marque: 'Neon', status: 'Déposée', reparation_avancament: '', facture_paiement: '', historique: 'Historique des réparations'},
  {numero: 10, marque: 'Neon', status: 'Déposée', reparation_avancament: '', facture_paiement: '', historique: 'Historique des réparations'},
];

@Component({
  selector: 'app-liste-voiture',
  templateUrl: './liste-voiture.component.html',
  styleUrls: ['./liste-voiture.component.css'],
  entryComponents: [HeaderComponent, FooterComponent, ReparationAvancementComponent]
})
export class ListeVoitureComponent implements AfterViewInit {
  displayedColumns: string[] = ['numero', 'marque', 'status', 'reparation_avancament', 'facture_paiement', 'historique'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  rechercheNumero!: string | null;
  marques = [
    {value: 'steak-0'},
    {value: 'pizza-1'},
    {value: 'tacos-2'},
  ];
  topOfPage: any;

  constructor(private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog, private el: ElementRef, private router: Router) {
    this.topOfPage = el.nativeElement.querySelector('#top');
  }

  // @ViewChild('client') targetElement!: ElementRef;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    // window.addEventListener('scroll', this.onScroll);
  }

  announceSortChange(sortState: Sort | any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DepotDeVoitureComponent);
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

  // onScroll = () => {
  //   const target = this.targetElement.nativeElement;
  //   const targetPosition = target.getBoundingClientRect().top;
  //   const screenPosition = window.innerHeight/1000000;

  //   if (targetPosition >= screenPosition) {
  //     this.router.navigate(['/client']);
  //   }
  // }

  makeActive(index: number) {
    this.dataSource.data.forEach((element: any, i) => {
      element.active = i === index;
    });
    if(document.getElementById('clientreparationavancement')) {
      document.getElementById('clientreparationavancement')!.scrollIntoView({behavior: 'smooth'});
    }

  }

}
