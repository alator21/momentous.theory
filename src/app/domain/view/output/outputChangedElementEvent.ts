import {OutputEvent} from './outputEvent';
import {ViewElement} from '../../model/viewElement';

export class OutputChangedElementEvent implements OutputEvent{
	private readonly _elements:ViewElement[];


	constructor(elements: ViewElement[]) {
		this._elements = elements;
	}


	get elements(): ViewElement[] {
		return this._elements;
	}
}
