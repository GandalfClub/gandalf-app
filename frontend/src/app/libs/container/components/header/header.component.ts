import { Component, OnInit } from '@angular/core';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { User } from 'src/app/libs/auth/models/user';
import { AuthFacadeService } from 'src/app/libs/auth/store/auth/auth.facade';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user: any = {
    role: 'ev'
  }
  public isAuthenticated: boolean = false;

  constructor(private authFacadeService: AuthFacadeService) { }

  public ngOnInit(): void {
    this.authFacadeService.user$.subscribe((user: EntityWrapper<User>) => {
      if (user.status === EntityStatus.Success) {
        if (user.value.isAdmin === true) {
          this.user.role = 'admin';
        } else {
          this.user.role = 'participant';
        }
      } 
    })
  }

}
