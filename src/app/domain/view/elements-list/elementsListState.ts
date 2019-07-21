import {ViewElement} from '../../model/viewElement';

export class ElementsListState {
	private readonly _elements:ViewElement[];


	constructor(elements: ViewElement[]) {
		this._elements = elements;
	}


	get elements(): ViewElement[] {
		return this._elements;
	}
}
