import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-non-auth',
  templateUrl: './non-auth.component.html',
  styleUrls: ['./non-auth.component.scss']
})
export class NonAuthComponent implements OnInit {

  public badge: any;

  constructor() { }

  ngOnInit(): void {
    this.badge = {
      total: '3',
    };
  }
}
