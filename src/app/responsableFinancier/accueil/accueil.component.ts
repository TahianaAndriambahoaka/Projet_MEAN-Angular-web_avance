import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let url = event.url;
        document.getElementById('statistique')!.setAttribute("style", "margin-top: 5px; font-size: 1em; width: 100%; height: 3em;");
        document.getElementById('validationpaiement')!.setAttribute("style", "margin-top: 5px; font-size: 1em; width: 100%; height: 3em;");
        if (url === '/responsable-financier/statistiques') {
            document.getElementById('statistique')!.setAttribute("style", "margin-top: 5px; font-size: 1em; width: 100%; height: 3em; background-color: #3f51b5; color: white; box-shadow: 5px 5px 10px #888888;");
        } else {
            document.getElementById('validationpaiement')!.setAttribute("style", "margin-top: 5px; font-size: 1em; width: 100%; height: 3em; background-color: #3f51b5; color: white; box-shadow: 5px 5px 10px #888888;");
        }
      }
    });
}
}
