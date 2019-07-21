import {Subject} from 'rxjs';
import {ElementsListState} from './elementsListState';
import {ElementsListEvent} from './elementsListEvent';
import {ElementsListInitViewEvent} from './elementsListInitViewEvent';
import {ViewElement} from '../../model/viewElement';

export class ElementsListPresenter {
	private readonly _state: Subject<ElementsListState>;


	constructor() {
		this._state = new Subject();
	}


	get state(): Subject<ElementsListState> {
		return this._state;
	}

	publishEvent(event: ElementsListEvent): void {
		let nextState: ElementsListState;
		if (event instanceof ElementsListInitViewEvent) {
			nextState = new ElementsListState([
				ViewElement.createDefault('Hostname(short)'),
				ViewElement.createDefault('Hostname(full)'),
				ViewElement.createDefault('Username'),
				ViewElement.createDefault('Shell name'),
				ViewElement.createDefault("Terminal"),
				ViewElement.createDefault("Directory"),
				ViewElement.createDefault("Directory(base name)"),
				ViewElement.createDefault("Time-short(HH:MM)"),
				ViewElement.createDefault("Time(HH:MM:SS)"),
				ViewElement.createDefault("Exit status"),
				ViewElement.createDefault("Date"),
				ViewElement.createDefault("Text")
			]);
			this._state.next(nextState);
		}
	}
}
