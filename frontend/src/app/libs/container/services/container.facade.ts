import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Notification } from '../models/notification';
import { AuthFacadeService } from '../../auth/store/auth/auth.facade';
import { EntityWrapper } from '../../auth/models/entity-wraper';
import { User } from '../../auth/models/user';

@Injectable({
  providedIn: 'root'
})
export class ContainerFacadeService {

  private fakeRole: String = 'admin';
  private fakeNotifications: Notification[] = [
    { title: 'Test 1', content: 'FAKE NOTIFICATION' },
    { title: 'Test 2', content: 'Content' }
  ];

  constructor(private authFacadeService: AuthFacadeService) { }

  public get user$(): Observable<EntityWrapper<User>> {
    return this.authFacadeService.user$;
  }

  public get role$(): Observable<String> {
    return of(this.fakeRole);
  }

  public get notifications$(): Observable<Notification[]> {
    return of(this.fakeNotifications)
  }
}
