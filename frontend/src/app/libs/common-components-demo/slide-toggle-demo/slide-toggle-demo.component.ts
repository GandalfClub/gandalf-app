import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide-toggle-demo',
  templateUrl: './slide-toggle-demo.component.html',
  styleUrls: ['./slide-toggle-demo.component.scss']
})
export class SlideToggleDemoComponent {

  public isDisabled: boolean = true;

  public isDark: boolean = false;

  public onToggle(state: string): void {
		console.log(state);
  }

}
