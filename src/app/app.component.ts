import {ChangeDetectorRef, Component, ViewEncapsulation} from '@angular/core';
import {ViewElement} from './domain/model/viewElement';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class AppComponent {
	title = 'momentous.theory';

	elements: ViewElement[];
	configurationElements: ViewElement[];

	constructor() {
		this.elements = [];
		this.configurationElements = [];
	}

	gotElements(elements: ViewElement[]): void {
		setTimeout(() => {
			this.elements = elements;
		}, 100);
	}

	gotConfigurationElements(elements: ViewElement[]): void {
		setTimeout(() => {
			this.configurationElements = elements;
		}, 100);
	}
}
