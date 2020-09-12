import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlideToggleComponent {

  @Input()
  public isDisabled: boolean = true;

  @Input()
  public isDarkTheme: boolean = false;

  @Output()
  public onToggle: EventEmitter<boolean> = new EventEmitter();

  @Input()
	public isActive: boolean = false;

  public toggle(): void {
		this.isActive = !this.isActive;
		this.onToggle.emit(this.isActive);
  }

}
