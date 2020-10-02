import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-manager',
  templateUrl: './event-manager.component.html',
  styleUrls: ['./event-manager.component.scss']
})
export class EventManagerComponent implements OnInit {

  public badge: any;

  constructor() { }

  ngOnInit(): void {
    this.badge = {
      total: '3',
    };
  }

}
