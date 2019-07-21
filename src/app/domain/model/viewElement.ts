export class ViewElement {
	private readonly _elementName: string;
	private _backgroundColorName: string | null;
	private _foregroundColorName: string | null;
	private _elementShowText: string;


	constructor(elementName: string, backgroundColorName: string | null, foregroundColorName: string | null, elementShowText: string) {
		this._elementName = elementName;
		this._backgroundColorName = backgroundColorName;
		this._foregroundColorName = foregroundColorName;
		this._elementShowText = elementShowText;
	}

	set elementShowText(value: string) {
		this._elementShowText = value;
	}

	static createDefault(elementName: string): ViewElement {
		return new ViewElement(elementName, null, null, elementName);
	}

	static createBgDefault(elementName: string, fgColorName: string): ViewElement {
		return new ViewElement(elementName, null, fgColorName, elementName);
	}

	static createFgDefault(elementName: string, bgColorName: string): ViewElement {
		return new ViewElement(elementName, bgColorName, null, elementName);
	}

	static create(elementName: string, bgColorName: string, fgColorName: string): ViewElement {
		return new ViewElement(elementName, bgColorName, fgColorName, elementName);
	}


	get elementName(): string {
		return this._elementName;
	}


	get backgroundColorName(): string|null {
		return this._backgroundColorName;
	}

	get backgroundColorRgb(): string|null {
		if (this.backgroundColorDefault) {
			return null;
		}
		return ViewElement.calculateRgbColorByColorName(this.backgroundColorName);
	}


	get foregroundColorName(): string|null {
		return this._foregroundColorName;
	}

	get foregroundColorRgb(): string|null {
		if (this.foregroundColorDefault) {
			return null;
		}
		return ViewElement.calculateRgbColorByColorName(this.foregroundColorName);
	}


	get colorBash(): string {
		return ViewElement.calculateBashColorByColorName(this.backgroundColorName, this.foregroundColorName);
	}


	get elementShowText(): string {
		return this._elementShowText;
	}


	get backgroundColorDefault(): boolean {
		return this._backgroundColorName == null;
	}

	get foregroundColorDefault(): boolean {
		return this._foregroundColorName == null;
	}


	set foregroundColorName(value: string | null) {
		this._foregroundColorName = value;
	}

	set backgroundColorName(value: string | null) {
		this._backgroundColorName = value;
	}

	clone(): ViewElement {
		if (this.backgroundColorDefault) {
			if (this.foregroundColorDefault) {
				return ViewElement.createDefault(this.elementName);
			} else {
				return ViewElement.createBgDefault(this.elementName, this.foregroundColorName);
			}
		}
		return ViewElement.create(this.elementName, this.backgroundColorName, this.foregroundColorName);
	}

	static calculateRgbColorByColorName(colorName: string): string {
		return '55/00/22';
	}

	static calculateBashColorByColorName(backgroundColorName: string, foregroundColorName: string): string {
		return '12321';
	}
}
