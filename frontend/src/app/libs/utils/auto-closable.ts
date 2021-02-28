import { OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';

export class AutoCloseable implements OnDestroy {
  protected destroyedSource$: Observable<boolean> = new Observable<boolean>();

  public ngOnDestroy(): void {
    this.destroyedSource$ = of(true);
  }
}
