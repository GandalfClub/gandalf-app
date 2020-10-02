import { Component, OnInit } from '@angular/core';
import { AuthFacadeService } from '../auth/store/auth/auth.facade';
import { EntityStatus } from '../auth/models/entity-status';
import { User } from '../auth/models/user';
import { EntityWrapper } from '../auth/models/entity-wraper';

@Component({
	selector: 'app-container',
	templateUrl: './container.component.html',
	styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
	private isAuthenticated: boolean = false;

	constructor(private authFacadeService: AuthFacadeService) { }

	public ngOnInit(): void {
		this.authFacadeService.user$.subscribe((user: EntityWrapper<User>) => {
			this.isAuthenticated = user.status === EntityStatus.Success;
		})
	}
}
