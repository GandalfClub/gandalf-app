import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './store/sample/sample.reducer';
import { selectSampleState } from './store/sample/sample.selectors';

@Component({
	selector: 'app-container',
	templateUrl: './container.component.html',
	styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

	constructor(private store: Store<State>) { }

	public ngOnInit(): void {
		this.store.select(selectSampleState).subscribe((state: State) => {
			console.log(state, 'store works');
		});
	}
}
