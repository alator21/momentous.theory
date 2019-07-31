import {ConfigurationEvent} from './configurationEvent';
import {ViewElement} from '../../model/viewElement';

export class ConfigurationElementAddedEvent implements ConfigurationEvent{
	private readonly _elements:ViewElement[];


	constructor(elements: ViewElement[]) {
		this._elements = elements;
	}


	get elements(): ViewElement[] {
		return this._elements;
	}
}
