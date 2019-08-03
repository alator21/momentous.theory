import {ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {ViewElement} from './domain/model/viewElement';
import {AppPresenter} from './domain/view/app/appPresenter';
import {OutputState} from './domain/view/output/outputState';
import {AppState} from './domain/view/app/appState';
import {OutputEvent} from './domain/view/output/outputEvent';
import {OutputInitViewEvent} from './domain/view/output/outputInitViewEvent';
import {AppEvent} from './domain/view/app/appEvent';
import {AppInitViewEvent} from './domain/view/app/appInitViewEvent';
import {AppConfigurationElementChangedEvent} from './domain/view/app/appConfigurationElementChangedEvent';
import {Subject} from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class AppComponent {
	private presenter:AppPresenter;
	elements: ViewElement[];
	@Output() appElementsEmmiter = new EventEmitter<ViewElement[]>();

	constructor() {
		this.presenter = new AppPresenter();

		this.presenter.state.asObservable().subscribe((state: AppState) => {
			this.elements = state.elements;
			this.appElementsEmmiter.emit(this.elements);
		});

		let event: AppEvent = new AppInitViewEvent();
		this.presenter.publishEvent(event);
	}

	listener(elements: ViewElement[]): void {
		let event: AppEvent = new AppConfigurationElementChangedEvent(elements);
		this.presenter.publishEvent(event);
	}
}
