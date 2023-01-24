import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

var ELEMENT_DATA = [
  {description: 'Réparation ...', quantite: 1, prix: 20000, montant: 0},
  {description: 'Réparation ...', quantite: 2, prix: 20000, montant: 0},
  {description: 'Réparation ...', quantite: 1, prix: 20000, montant: 0},
  {description: 'Réparation ...', quantite: 2, prix: 20000, montant: 0},
  {description: 'Réparation ...', quantite: 1, prix: 20000, montant: 0},
  {description: 'Réparation ...', quantite: 2, prix: 20000, montant: 0},
  {description: 'Réparation ...', quantite: 1, prix: 20000, montant: 0},
  {description: 'Réparation ...', quantite: 2, prix: 20000, montant: 0},
  {description: 'Réparation ...', quantite: 1, prix: 20000, montant: 0},
  {description: 'Réparation ...', quantite: 2, prix: 20000, montant: 0},
  {description: 'Réparation ...', quantite: 1, prix: 20000, montant: 0},
  {description: 'Réparation ...', quantite: 2, prix: 20000, montant: 0},
  {description: 'Réparation ...', quantite: 1, prix: 20000, montant: 0},
  {description: 'Réparation ...', quantite: 2, prix: 20000, montant: 0},
];

@Component({
  selector: 'facture-etat-paiement',
  templateUrl: './facture-etat-paiement.component.html',
  styleUrls: ['./facture-etat-paiement.component.css']
})
export class FactureEtatPaiementComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['description', 'quantite', 'prix', 'montant'];
  dataSource:any;
  numero!: string;
  marque!: string;
  montantTotal: number = 0;
  montantPaye: number = 0;
  montantAPaye: number = 0;

  constructor(private _liveAnnouncer: LiveAnnouncer, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.numero = params.get('numero')!;
      this.montantTotal = 0;
      ELEMENT_DATA = ELEMENT_DATA.map(obj => {
        obj.montant = obj.prix * obj.quantite;
        this.montantTotal += obj.montant;
        return obj;
      });
      this.montantAPaye = this.montantTotal - this.montantAPaye;
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    });
  }

  @ViewChild('factureetatpaiement') inputElement!: ElementRef;
  ngAfterViewInit() {
    this.inputElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
