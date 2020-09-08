import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ContainerModule } from './libs/container/container.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppModule } from './app.module';

describe('AppComponent', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule
			],
			declarations: [
				AppComponent
			],
		}).compileComponents();
	});

	it('should create the app', () => {
		const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
		const app: AppComponent = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it(`should have as title 'gandalf'`, () => {
		const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
		const app: AppComponent = fixture.componentInstance;
		expect(app.title).toEqual('gandalf');
	});

	it('should render title', () => {
		const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
		fixture.detectChanges();
		const compiled: any = fixture.nativeElement;
		expect(compiled.querySelector('.content span').textContent).toContain('gandalf app is running!');
	});
});
