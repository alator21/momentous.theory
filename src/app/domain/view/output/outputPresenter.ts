import {OutputState} from './outputState';
import {Subject} from 'rxjs';
import {OutputEvent} from './outputEvent';
import {OutputInitViewEvent} from './outputInitViewEvent';
import {ViewElement} from '../../model/viewElement';
import {OutputChangedElementEvent} from './outputChangedElementEvent';
import {GeneralService} from '../../application/services/general.service';

export class OutputPresenter {
	private readonly _state: Subject<OutputState>;


	constructor() {
		this._state = new Subject();
	}


	get state(): Subject<OutputState> {
		return this._state;
	}

	publishEvent(event: OutputEvent): void {
		let nextState: OutputState;

		if (event instanceof OutputInitViewEvent) {
			nextState = new OutputState([], this.calculateOutput([]));
			this._state.next(nextState);
		} else if (event instanceof OutputChangedElementEvent) {
			nextState = new OutputState(event.elements, this.calculateOutput(event.elements));
			this._state.next(nextState);
		}
	}

	private calculateOutput(elements: ViewElement[]): string {
		const START_OUTPUT: string = `PS1="`;
		const END_OUTPUT_COLOR: string = `${GeneralService.defaultBashColor}"`;
		const END_OUTPUT_NO_COLOR: string = `"`;
		let output: string = ``;

		output += START_OUTPUT;
		let previousFGColor: string = GeneralService.getBashFgColorByViewElement(ViewElement.createDefault(null));
		let previousBGColor: string = GeneralService.getBashBgColorByViewElement(ViewElement.createDefault(null));
		for (let element of elements) {
			let fgColor: string = GeneralService.getBashFgColorByViewElement(element);
			let bgColor: string = GeneralService.getBashBgColorByViewElement(element);
			let isFgChanging: boolean = false;
			let isBgChanging: boolean = false;
			if (previousFGColor !== fgColor) {
				previousFGColor = fgColor;
				isFgChanging = true;
			}
			if (previousBGColor !== bgColor) {
				previousBGColor = bgColor;
				isBgChanging = true;
			}

			if (fgColor === GeneralService.defaultBashColor && bgColor === GeneralService.defaultBashColor) {
				if (isFgChanging || isBgChanging) {
					output += GeneralService.defaultBashColor;
				}
			} else {
				if (fgColor === GeneralService.defaultBashColor || bgColor === GeneralService.defaultBashColor) {
					if (fgColor === GeneralService.defaultBashColor) {
						if (isFgChanging) {
							output += fgColor;
						}
						if (isBgChanging) {
							output += bgColor;
						}
					} else if (bgColor === GeneralService.defaultBashColor) {
						if (isBgChanging) {
							output += bgColor;
						}
						if (isFgChanging) {
							output += fgColor;
						}
					}
				} else {
					if (isBgChanging) {
						output += bgColor;
					}
					if (isFgChanging) {
						output += fgColor;
					}
				}

			}


			let bashRepresentation = GeneralService.getElementBashRepresentationByViewElement(element);
			output += bashRepresentation;
		}

		let containsAnyColor: boolean = output.includes('[');
		if (!containsAnyColor) {
			output += END_OUTPUT_NO_COLOR;
		} else {
			output += END_OUTPUT_COLOR;

		}

		return output;
	}
}
