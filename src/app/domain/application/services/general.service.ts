import {Injectable} from '@angular/core';
import {Element} from '../../model/element';
import {ViewElement} from '../../model/viewElement';


const BG_COLOR: string = 'black';
const FG_COLOR: string = 'white';

const COLOR_NAMES_TO_BASH: Map<string, string> = new Map<string, string>();
COLOR_NAMES_TO_BASH.set('red', '160');
COLOR_NAMES_TO_BASH.set('blue', '20');
COLOR_NAMES_TO_BASH.set('green', '118');
COLOR_NAMES_TO_BASH.set('yellow', '220');
COLOR_NAMES_TO_BASH.set('black', '0');
COLOR_NAMES_TO_BASH.set('white', '15');


const COLORS: string[] = [];
COLORS.push(null);
COLORS.push('red');
COLORS.push('blue');
COLORS.push('green');
COLORS.push('yellow');
COLORS.push('black');
COLORS.push('white');


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
elements.set('Text', new Element('Text', "your custom text", null, null));


@Injectable({
	providedIn: 'root'
})
export class GeneralService {
	static defaultBashColor: string = '\\[\\033[0m\\]';
	private _defaultBgColor: string;
	private _defaultFgColor: string;

	constructor() {
		this._defaultBgColor = BG_COLOR;
		this._defaultFgColor = FG_COLOR;
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

	getElementExampleByViewElement(element: ViewElement): string | null {
		if (element.elementName === 'Text') {
			return element.elementShowText;
		}
		let el: Element = elements.get(element.elementName);
		return el && el.example;
	}

	getElementBashRepresentationByViewElement(element: ViewElement): string | null {
		if (element.elementName === 'Text') {
			return element.elementShowText;
		}
		let el: Element = elements.get(element.elementName);
		return el && el.bashRepresentation;
	}

	getBashBgColorByViewElement(element: ViewElement): string {
		let bgColorName: string = (!element.backgroundColorDefault && element.backgroundColorName) || null;
		if (bgColorName == null) {
			return GeneralService.defaultBashColor;
		}
		return `\\[\\033[48;5;${(COLOR_NAMES_TO_BASH.get(bgColorName)) || ''}m\\]`;
	}

	getBashFgColorByViewElement(element: ViewElement): string {
		let fgColorName: string = (!element.foregroundColorDefault && element.foregroundColorName) || null;
		if (fgColorName == null) {
			return GeneralService.defaultBashColor;
		}
		return `\\[\\033[38;5;${(COLOR_NAMES_TO_BASH.get(fgColorName)) || ''}m\\]`;
	}

	getDescriptionByViewElement(element: ViewElement): string {
		return elements.get(element.elementName).description;
	}


	getAvailableColors() {
		return COLORS;
	}

}
