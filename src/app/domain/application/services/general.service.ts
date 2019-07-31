import {Injectable} from '@angular/core';
import {Element} from '../../model/element';
import {ViewElement} from '../../model/viewElement';


enum colorsEnum {
	RED = 'red',
	BLUE = 'blue',
	GREEN = 'green',
	YELLOW = 'yellow',
	BLACK = 'black',
	WHITE = 'white',
	PINK = 'pink'
}


const COLOR_NAMES_TO_BASH: Map<string, string> = new Map<string, string>();
COLOR_NAMES_TO_BASH.set(colorsEnum.RED, '160');
COLOR_NAMES_TO_BASH.set(colorsEnum.BLUE, '20');
COLOR_NAMES_TO_BASH.set(colorsEnum.GREEN, '118');
COLOR_NAMES_TO_BASH.set(colorsEnum.YELLOW, '220');
COLOR_NAMES_TO_BASH.set(colorsEnum.BLACK, '0');
COLOR_NAMES_TO_BASH.set(colorsEnum.WHITE, '15');
COLOR_NAMES_TO_BASH.set(colorsEnum.PINK, '201');

const COLOR_RGB_TO_NAME: Map<string, string> = new Map<string, string>();
COLOR_RGB_TO_NAME.set('rgb(0, 0, 0)', colorsEnum.BLACK);
COLOR_RGB_TO_NAME.set('rgb(255, 255, 255)', colorsEnum.WHITE);

const COLORS: string[] = [];
COLORS.push(null);
COLORS.push(colorsEnum.RED);
COLORS.push(colorsEnum.BLUE);
COLORS.push(colorsEnum.GREEN);
COLORS.push(colorsEnum.YELLOW);
COLORS.push(colorsEnum.BLACK);
COLORS.push(colorsEnum.WHITE);
COLORS.push(colorsEnum.PINK);


const elements: Map<string, Element> = new Map();

elements.set('Hostname(short)', new Element('Hostname(short)', 'the hostname up to the first period', 'macbook', '\\h'));
elements.set('Hostname(full)', new Element('Hostname(full)', 'the hostname', 'macbook.air', '\\H'));
elements.set('Username', new Element('Username', 'the username of the current user', 'John', '\\u'));
elements.set('Shell name', new Element('Shell name', 'the name of the shell', '-bash', '\\s'));
elements.set('Terminal', new Element('Terminal', 'the basename of the shell’s terminal device name', 'ttys002', '\\1'));
elements.set('Directory', new Element('Directory', 'the current working directory', '~/Desktop/images', '\\w'));
elements.set('Directory(base name)', new Element('Directory(base name)', 'the basename of the current working directory', 'images', '\\W'));
elements.set('Time-short(HH:MM)', new Element('Time-short(HH:MM)', 'the current time in 24-hour HH:MM format', '17:13', '\\A'));
elements.set('Time(HH:MM:SS)', new Element('Time(HH:MM:SS)', 'the current time in 24-hour HH:MM:SS format', '17:13:30', '\\t'));
elements.set('Exit status', new Element('Exit status', 'the exit status', '0', '\\$?'));
elements.set('Date', new Element('Date', 'the date in Weekday Month Date format', 'Wed Oct 31', '\\d'));
elements.set('Text', new Element('Text', 'your custom text', null, null));


@Injectable({
	providedIn: 'root'
})
export class GeneralService {
	static defaultBashColor: string = '\\[\\033[0m\\]';
	static customTextName: string = 'Text';

	private _defaultBgColor: string;
	private _defaultFgColor: string;

	constructor() {
		this._defaultBgColor = colorsEnum.BLACK;
		this._defaultFgColor = colorsEnum.WHITE;
	}


	get defaultBgColor(): string {
		return this._defaultBgColor;
	}

	get defaultFgColor(): string {
		return this._defaultFgColor;
	}

	toggle(): void {
		let bgColor = this.defaultFgColor;
		this._defaultFgColor = this.defaultBgColor;
		this._defaultBgColor = bgColor;
	}

	static getElementExampleByViewElement(element: ViewElement): string | null {
		if (element.elementName === GeneralService.customTextName) {
			return element.elementShowText;
		}
		let el: Element = elements.get(element.elementName);
		return el && el.example;
	}

	static getElementBashRepresentationByViewElement(element: ViewElement): string | null {
		if (element.elementName === GeneralService.customTextName) {
			return element.elementShowText;
		}
		let el: Element = elements.get(element.elementName);
		return el && el.bashRepresentation;
	}

	static getBashBgColorByViewElement(element: ViewElement): string {
		let bgColorName: string = (!element.backgroundColorDefault && element.backgroundColorName) || null;
		if (bgColorName == null) {
			return GeneralService.defaultBashColor;
		}
		return `\\[\\033[48;5;${(COLOR_NAMES_TO_BASH.get(bgColorName)) || ''}m\\]`;
	}

	static getBashFgColorByViewElement(element: ViewElement): string {
		let fgColorName: string = (!element.foregroundColorDefault && element.foregroundColorName) || null;
		if (fgColorName == null) {
			return GeneralService.defaultBashColor;
		}
		return `\\[\\033[38;5;${(COLOR_NAMES_TO_BASH.get(fgColorName)) || ''}m\\]`;
	}

	static getDescriptionByViewElement(element: ViewElement): string {
		return elements.get(element.elementName).description;
	}


	static getAvailableColors() {
		return COLORS;
	}

	static getColorNameByRgb(colorRgb: string): string | null {
		return COLOR_RGB_TO_NAME.get(colorRgb) || null;
	}

	static COLORS() {
		return colorsEnum;
	}

}
