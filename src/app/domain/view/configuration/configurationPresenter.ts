import {Subject} from 'rxjs';
import {ConfigurationState} from './configurationState';
import {ConfigurationEvent} from './configurationEvent';
import {ConfigurationInitViewEvent} from './configurationInitViewEvent';
import {ConfigurationElementAddedEvent} from './configurationElementAddedEvent';
import {ViewElement} from '../../model/viewElement';

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
      nextState = new ConfigurationState([ViewElement.createDefault("Hostname(short)")]);
      this._state.next(nextState);
    }
    else if (event instanceof  ConfigurationElementAddedEvent){
		nextState = new ConfigurationState(event.elements);
		this._state.next(nextState);
	}
  }
}
