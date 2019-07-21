import {ViewElement} from '../../model/viewElement';

export class PreviewState {
  private readonly _elements: ViewElement[];
  private readonly _bgColor: string;
  private readonly _fgColor:string;


	constructor(elements: ViewElement[], bgColor: string, fgColor: string) {
		this._elements = elements;
		this._bgColor = bgColor;
		this._fgColor = fgColor;
	}


	get elements(): ViewElement[] {
		return this._elements;
	}

	get bgColor(): string {
		return this._bgColor;
	}

	get fgColor(): string {
		return this._fgColor;
	}
}
