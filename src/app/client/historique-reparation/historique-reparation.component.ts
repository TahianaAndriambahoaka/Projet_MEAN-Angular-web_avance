import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

const ELEMENT_DATA = [
  {reparation: 'Réparation ...', date: new Date(), etat_avancement: 'Réparée'},
  {reparation: 'Réparation ...', date: new Date(), etat_avancement: 'En cours de réparation'},
  {reparation: 'Réparation ...', date: new Date(), etat_avancement: 'Réparée'},
  {reparation: 'Réparation ...', date: new Date(), etat_avancement: 'En cours de réparation'},
  {reparation: 'Réparation ...', date: new Date(), etat_avancement: 'Réparée'},
  {reparation: 'Réparation ...', date: new Date(), etat_avancement: 'En cours de réparation'},
  {reparation: 'Réparation ...', date: new Date(), etat_avancement: 'Réparée'},
  {reparation: 'Réparation ...', date: new Date(), etat_avancement: 'En cours de réparation'},
  {reparation: 'Réparation ...', date: new Date(), etat_avancement: 'Réparée'},
  {reparation: 'Réparation ...', date: new Date(), etat_avancement: 'En cours de réparation'},
  {reparation: 'Réparation ...', date: new Date(), etat_avancement: 'Réparée'},
  {reparation: 'Réparation ...', date: new Date(), etat_avancement: 'En cours de réparation'},
  {reparation: 'Réparation ...', date: new Date(), etat_avancement: 'Réparée'},
  {reparation: 'Réparation ...', date: new Date(), etat_avancement: 'En cours de réparation'},
];

@Component({
  selector: 'historique-reparation',
  templateUrl: './historique-reparation.component.html',
  styleUrls: ['./historique-reparation.component.css']
})
export class HistoriqueReparationComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['reparation', 'date', 'etat_avancement'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  numero!: string;
  marque!: string;
  
  constructor(private _liveAnnouncer: LiveAnnouncer, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.numero = params.get('numero')!;
    });
  }

  @ViewChild('historiquereparation') inputElement!: ElementRef;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit() {
    this.inputElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort | any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
