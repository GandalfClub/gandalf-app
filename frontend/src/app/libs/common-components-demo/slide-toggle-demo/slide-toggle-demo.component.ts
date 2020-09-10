import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide-toggle-demo',
  templateUrl: './slide-toggle-demo.component.html',
  styleUrls: ['./slide-toggle-demo.component.scss']
})
export class SlideToggleDemoComponent implements OnInit {

  public isDisabled: boolean = true;

  public isDark: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public onToggle(state: string): void {
		console.log(state);
  }

}
