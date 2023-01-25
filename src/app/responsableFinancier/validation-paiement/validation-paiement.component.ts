import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VoirFactureComponent as VoirFactureResponsableFinancierComponent } from '../voir-facture/voir-facture.component';

const ELEMENT_DATA = [
  {numero: '9876TBS', marque: 'Ford Raptor', voirFacture: '', validerPaiement: ''},
  {numero: '9877TBS', marque: 'Ford Ranger', voirFacture: '', validerPaiement: ''},
  {numero: '9876TBS', marque: 'Toyota Hilux', voirFacture: '', validerPaiement: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', voirFacture: '', validerPaiement: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', voirFacture: '', validerPaiement: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', voirFacture: '', validerPaiement: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', voirFacture: '', validerPaiement: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', voirFacture: '', validerPaiement: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', voirFacture: '', validerPaiement: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', voirFacture: '', validerPaiement: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', voirFacture: '', validerPaiement: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', voirFacture: '', validerPaiement: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', voirFacture: '', validerPaiement: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', voirFacture: '', validerPaiement: ''},
];

@Component({
  selector: 'app-validation-paiement',
  templateUrl: './validation-paiement.component.html',
  styleUrls: ['./validation-paiement.component.css']
})
export class ValidationPaiementComponent {
  displayedColumns: string[] = ['numero', 'marque', 'voirFacture', 'validerPaiement'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog) {}

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

  voirFacture(numero: string) {
    this.dialog.open(VoirFactureResponsableFinancierComponent, {
      data: {
        numero: numero
      }
    });
  }

  validerPaiement(numero: string) {
    console.log(numero);
  }
}
