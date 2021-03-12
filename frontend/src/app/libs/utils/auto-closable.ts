import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class AutoCloseable implements OnDestroy {
  protected destroyedSource$: Subject<boolean> = new Subject<boolean>();

  public ngOnDestroy(): void {
    this.destroyedSource$.next(true);
    this.destroyedSource$.complete();
  }
}
