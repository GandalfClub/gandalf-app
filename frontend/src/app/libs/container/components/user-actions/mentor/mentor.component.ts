import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.scss']
})
export class MentorComponent implements OnInit {

  public badge: any;

  constructor() { }

  ngOnInit(): void {
    this.badge = {
      total: '3',
    };
  }

}
