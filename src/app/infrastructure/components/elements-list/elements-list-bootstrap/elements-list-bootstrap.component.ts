import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ElementsListPresenter} from '../../../../domain/view/elements-list/elementsListPresenter';
import {ElementsListEvent} from '../../../../domain/view/elements-list/elementsListEvent';
import {ElementsListInitViewEvent} from '../../../../domain/view/elements-list/elementsListInitViewEvent';
import {ViewElement} from '../../../../domain/model/viewElement';
import {GeneralService} from '../../../../domain/application/services/general.service';
import {SortablejsOptions} from 'ngx-sortablejs';

@Component({
	selector: 'app-elements-list-bootstrap',
	templateUrl: './elements-list-bootstrap.component.html',
	styleUrls: ['./elements-list-bootstrap.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class ElementsListBootstrapComponent implements OnInit {
	@Output() elementsEmitter = new EventEmitter<ViewElement[]>();
	private readonly presenter: ElementsListPresenter;
	elements: ViewElement[];
	sortableOptions: SortablejsOptions;

	constructor() {
		this.presenter = new ElementsListPresenter();
		this.sortableOptions = {
			"sort": false,
			"group" : {
				"name" : "shared",
				"pull" : "clone"
			}
		};
	}

	ngOnInit() {
		this.presenter.state.asObservable().subscribe(state => {
			this.elements = state.elements;
			this.elementsEmitter.emit(this.elements);
		});

		let event: ElementsListEvent = new ElementsListInitViewEvent();
		this.presenter.publishEvent(event);
	}

	myCloneImplementation = (item:ViewElement) => {
		return item.clone(); // this is what happens if sortablejsCloneFunction is not provided. Add your stuff here
	};

	getElementDescription(element: ViewElement): string {
		return GeneralService.getDescriptionByViewElement(element);
	}
}
