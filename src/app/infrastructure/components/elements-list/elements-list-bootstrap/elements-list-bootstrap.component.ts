import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ElementsListPresenter} from '../../../../domain/view/elements-list/elementsListPresenter';
import {ElementsListEvent} from '../../../../domain/view/elements-list/elementsListEvent';
import {ElementsListInitViewEvent} from '../../../../domain/view/elements-list/elementsListInitViewEvent';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ViewElement} from '../../../../domain/model/viewElement';
import {GeneralService} from '../../../../domain/application/services/general.service';

@Component({
	selector: 'app-elements-list-bootstrap',
	templateUrl: './elements-list-bootstrap.component.html',
	styleUrls: ['./elements-list-bootstrap.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class ElementsListBootstrapComponent implements OnInit {
	@Output() elementsEmitter = new EventEmitter<ViewElement[]>();
	private readonly presenter: ElementsListPresenter;
	private elements: ViewElement[];

	constructor(private service:GeneralService) {
		this.presenter = new ElementsListPresenter();
	}

	ngOnInit() {

		this.presenter.state.asObservable().subscribe(state => {
			this.elements = state.elements;
			this.elementsEmitter.emit(this.elements);
		});

		let event: ElementsListEvent = new ElementsListInitViewEvent();
		this.presenter.publishEvent(event);
	}


	drop(event: CdkDragDrop<ViewElement[]>) {
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			transferArrayItem(event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex);
		}
	}

	getElementDescription(element:ViewElement):string{
		return this.service.getDescriptionByViewElement(element);
	}
}
