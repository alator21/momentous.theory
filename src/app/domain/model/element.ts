export class Element {
	private readonly _elementName:string;
	private readonly _description:string;
	private readonly _example:string;
	private readonly _bashRepresentation:string;


	constructor(elementName: string, description: string, example: string, bashRepresentation: string) {
		this._elementName = elementName;
		this._description = description;
		this._example = example;
		this._bashRepresentation = bashRepresentation;
	}

	get elementName(): string {
		return this._elementName;
	}

	get description(): string {
		return this._description;
	}

	get example(): string {
		return this._example;
	}

	get bashRepresentation(): string {
		return this._bashRepresentation;
	}
}
