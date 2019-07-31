import {Subject} from 'rxjs';
import {ConfigurationState} from './configurationState';
import {ConfigurationEvent} from './configurationEvent';
import {ConfigurationInitViewEvent} from './configurationInitViewEvent';
import {ConfigurationElementAddedEvent} from './configurationElementAddedEvent';
import {ViewElement} from '../../model/viewElement';
import {GeneralService} from '../../application/services/general.service';

export class ConfigurationPresenter {
	private readonly _state: Subject<ConfigurationState>;


	constructor() {
		this._state = new Subject();
	}


	get state(): Subject<ConfigurationState> {
		return this._state;
	}

	publishEvent(event: ConfigurationEvent): void {
		let nextState: ConfigurationState;

		if (event instanceof ConfigurationInitViewEvent) {
			let rainbowConfig: ViewElement[] = [];
			rainbowConfig.push(ViewElement.createText('[', null, GeneralService.COLORS().RED));
			rainbowConfig.push(ViewElement.create('Username', null, GeneralService.COLORS().YELLOW));
			rainbowConfig.push(ViewElement.createText('@', null, GeneralService.COLORS().GREEN));
			rainbowConfig.push(ViewElement.create('Hostname(short)', null, GeneralService.COLORS().BLUE));
			rainbowConfig.push(ViewElement.createText(' ', null, null));
			rainbowConfig.push(ViewElement.createText('~', null, GeneralService.COLORS().PINK));
			rainbowConfig.push(ViewElement.createText(']', null, GeneralService.COLORS().RED));
			rainbowConfig.push(ViewElement.createText('$', null, null));
			rainbowConfig.push(ViewElement.createText(' ', null, null));

			nextState = new ConfigurationState(rainbowConfig);
			this._state.next(nextState);
		} else if (event instanceof ConfigurationElementAddedEvent) {
			nextState = new ConfigurationState(event.elements);
			this._state.next(nextState);
		}
	}
}
