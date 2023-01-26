import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MediaQueryService } from 'src/app/media-query-service.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  isBigScreen: boolean = false;

  constructor(private router: Router, private mediaQueryService: MediaQueryService) {
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

  ngOnInit() {
    this.mediaQueryService.getMediaQuery().subscribe(isBigScreen => {
      this.isBigScreen = isBigScreen;
    });
  }
  
  logout() {
    sessionStorage.removeItem('token-responsable_financier');
    this.router.navigate(['/']);
  }
}
