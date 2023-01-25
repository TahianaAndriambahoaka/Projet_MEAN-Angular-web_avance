import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MediaQueryService {
  private mediaQuery$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.checkWidth();
  }

  public getMediaQuery(): BehaviorSubject<boolean> {
    return this.mediaQuery$;
  }

  private checkWidth(): void {
    const mediaQuery = window.matchMedia("(min-width: 600px)");
    this.mediaQuery$.next(mediaQuery.matches);
  }
}
