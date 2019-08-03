import {AppEvent} from './appEvent';
import {ViewElement} from '../../model/viewElement';

export class AppConfigurationElementChangedEvent implements AppEvent{
	private readonly _elements:ViewElement[];


	constructor(elements: ViewElement[]) {
		this._elements = elements;
	}


	get elements(): ViewElement[] {
		return this._elements;
	}
}
