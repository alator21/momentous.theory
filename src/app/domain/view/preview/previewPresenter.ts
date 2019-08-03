import {Subject} from 'rxjs';
import {PreviewState} from './previewState';
import {PreviewEvent} from './previewEvent';
import {PreviewInitViewEvent} from './previewInitViewEvent';
import {PreviewToggleEvent} from './previewToggleEvent';
import {GeneralService} from '../../application/services/general.service';
import {PreviewElementChangedEvent} from './previewElementChangedEvent';

export class PreviewPresenter {
	private readonly _state: Subject<PreviewState>;


	constructor(private service:GeneralService) {
		this._state = new Subject();
	}

	get state(): Subject<PreviewState> {
		return this._state;
	}

	publishEvent(event: PreviewEvent): void {
		let nextState: PreviewState;

		if (event instanceof PreviewInitViewEvent) {
			nextState = new PreviewState(null, this.service.defaultBgColor,this.service.defaultFgColor);
			this._state.next(nextState);
		}
		else if (event instanceof PreviewToggleEvent){
			this.service.toggle();
			nextState = new PreviewState(null, this.service.defaultBgColor,this.service.defaultFgColor);
			this._state.next(nextState);
		}
		else if (event instanceof PreviewElementChangedEvent){
			nextState = new PreviewState(event.elements, this.service.defaultBgColor,this.service.defaultFgColor);
			this._state.next(nextState);
		}
	}
}
