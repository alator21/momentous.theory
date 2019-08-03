import {ViewElement} from '../../model/viewElement';

export class OutputState {
  private readonly _elements: ViewElement[];
  private readonly _output:string;


	constructor(elements: ViewElement[], output: string) {
		this._elements = elements;
		this._output = output;
	}


	get elements(): ViewElement[] {
		return this._elements;
	}

	get output(): string {
		return this._output;
	}
}
