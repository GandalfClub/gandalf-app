import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { EntityWrapper } from '../../auth/models/entity-wraper';
import { User } from '../../auth/models/user';
import { AuthFacadeService } from '../../auth/store/auth/auth.facade';

@Injectable({
	providedIn: 'root'
})
export class AdminPanelGuard implements CanLoad {

	constructor(private authFacadeService: AuthFacadeService) {}

	public async canLoad (
		route: Route,
		segments: UrlSegment[]): Promise<boolean> {
		return new Promise ((resolve: (value?: boolean | PromiseLike<boolean>) => void) => {
			const destroy$: Subject<any> = new Subject;
			this.authFacadeService.user$.pipe(takeUntil(destroy$)).subscribe((user: EntityWrapper<User>) => {
				if (Boolean(user?.value)) {
					destroy$.next();
					destroy$.complete();
					resolve(user?.value.isAdmin);
				}
			});
		});
	}
}
