import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlideToggleComponent implements OnInit {

  @Input()
  public isDisabled: boolean = true;

  @Input()
  public isDarkTheme: boolean = false;

  @Output()
  public onToggle: EventEmitter<any> = new EventEmitter();

	public isActive: boolean = false;

  constructor() { }

  ngOnInit(): void {
	}

  public toggle(): void {
		// this.isActive = !this.isActive;
		console.log(this.isActive)
		this.onToggle.emit(this.isActive);
		console.log(this.isActive)

  }

}
