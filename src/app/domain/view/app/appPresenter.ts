import {Subject} from 'rxjs';
import {AppState} from './appState';
import {AppEvent} from './appEvent';
import {AppInitViewEvent} from './appInitViewEvent';
import {AppConfigurationElementChangedEvent} from './appConfigurationElementChangedEvent';

export class AppPresenter {
	private readonly _state:Subject<AppState>;

	constructor() {
		this._state = new Subject();
	}


	get state(): Subject<AppState> {
		return this._state;
	}

	publishEvent(event: AppEvent): void {
		let nextState: AppState;

		if (event instanceof AppInitViewEvent) {
			nextState = new AppState( []);
			this._state.next(nextState);
		}
		else if (event instanceof AppConfigurationElementChangedEvent){
			nextState = new AppState(event.elements);
			this._state.next(nextState);
		}
	}
}
