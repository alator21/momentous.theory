import {ViewElement} from '../../model/viewElement';

export class AppState {

	private readonly _elements: ViewElement[];


	constructor(configurationElements: ViewElement[]) {
		this._elements = configurationElements;
	}


	get elements(): ViewElement[] {
		return this._elements;
	}
}
