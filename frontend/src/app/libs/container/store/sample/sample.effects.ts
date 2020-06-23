import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of, Observable } from 'rxjs';
import { LoadSamplesFailure, LoadSamplesSuccess, SampleActionTypes, SampleActions } from './sample.actions';

@Injectable()
export class SampleEffects {

	@Effect()
	public loadSamples$: Observable<LoadSamplesSuccess | LoadSamplesFailure> = this.actions$.pipe(
		ofType(SampleActionTypes.LoadSamples),
		concatMap(() =>
			/** An EMPTY observable only emits completion. Replace with your own observable API request */
			EMPTY.pipe(
				map((data: unknown) => new LoadSamplesSuccess({ data })),
				catchError((error: Error) => of(new LoadSamplesFailure({ error }))))
		)
	);

	constructor(private actions$: Actions<SampleActions>) { }

}
