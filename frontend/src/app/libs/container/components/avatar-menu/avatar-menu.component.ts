import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar-menu',
  templateUrl: './avatar-menu.component.html',
  styleUrls: ['./avatar-menu.component.scss']
})
export class AvatarMenuComponent implements OnInit {

  public username: string;
  public fullname: string;
  public id: any;
  public badge: any;

  constructor() { }

  ngOnInit(): void {
    this.username = 'Bob'
    this.fullname = 'Bob Dylan';
    this.badge = {
      total: '3',
      account: '1',
      invintation: '1',
      notification: '2',
      settings: '2'
    };
    this.id = {
      github: '5f119992db6fca0022da61c2'
    };
  }
}
