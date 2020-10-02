import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent implements OnInit {

  public badge: any;

  constructor() { }

  ngOnInit(): void {
    this.badge = {
      total: '3',
    };
  }
}
