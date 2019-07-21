import {Component, ViewEncapsulation} from '@angular/core';
import {ViewElement} from './domain/model/viewElement';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	encapsulation:ViewEncapsulation.None
})
export class AppComponent {
	title = 'z8';

	private elements: ViewElement[] = [];
	private configurationElements: ViewElement[] = [];


	gotElements(elements: ViewElement[]) {
		setTimeout(() => {
			this.elements = elements;

		}, 100);
	}

	gotConfigurationElements(elements: ViewElement[]) {
		setTimeout(() => {
			this.configurationElements = elements;
		}, 100);
	}
}
