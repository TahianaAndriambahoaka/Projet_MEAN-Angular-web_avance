import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FooterComponent } from 'src/app/footer/footer.component';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
  entryComponents: [FooterComponent]
})
export class AccueilComponent {
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let url = event.url;
        document.getElementById('listevoituresgarage')!.setAttribute("style", "margin-top: 5px; font-size: 1em; width: 100%; height: 3em;");
        document.getElementById('listevoituresareceptionner')!.setAttribute("style", "margin-top: 5px; font-size: 1em; width: 100%; height: 3em;");
        if (url === '/responsable-atelier/voitures') {
            document.getElementById('listevoituresgarage')!.setAttribute("style", "margin-top: 5px; font-size: 1em; width: 100%; height: 3em; background-color: #3f51b5; color: white; box-shadow: 5px 5px 10px #888888;");
        } else {
            document.getElementById('listevoituresareceptionner')!.setAttribute("style", "margin-top: 5px; font-size: 1em; width: 100%; height: 3em; background-color: #3f51b5; color: white; box-shadow: 5px 5px 10px #888888;");
        }
      }
    });
}
}
