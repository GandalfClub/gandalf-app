import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { ComponentTheme } from '../../shared/component-theme.enum';

@Directive({
	selector: '[appScrollbar]'
})
export class ScrollbarDirective implements OnInit {

	private scrollbarClassName: string = 'scrollbar';
	private scrollbarLightClassName: string = 'scrollbar--light-theme';
	private scrollbarDarkClassName: string = 'scrollbar--dark-theme';

	@Input()
	public theme: ComponentTheme = ComponentTheme.Light;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

	public ngOnInit(): void {
		this.renderer.addClass(this.elementRef.nativeElement, this.scrollbarClassName);

		switch (this.theme) {
			case ComponentTheme.Light:
				this.renderer.addClass(this.elementRef.nativeElement, this.scrollbarLightClassName);
				break;
			case ComponentTheme.Dark:
				this.renderer.addClass(this.elementRef.nativeElement, this.scrollbarDarkClassName);
				break;
			default:
				this.renderer.addClass(this.elementRef.nativeElement, this.scrollbarLightClassName);
		}
	}
}
