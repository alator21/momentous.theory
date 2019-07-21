import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ConfigurationPresenter} from '../../../../domain/view/configuration/configurationPresenter';
import {ViewElement} from '../../../../domain/model/viewElement';
import {ConfigurationEvent} from '../../../../domain/view/configuration/configurationEvent';
import {ConfigurationInitViewEvent} from '../../../../domain/view/configuration/configurationInitViewEvent';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog} from '@angular/material';
import {SelectColorDialogMaterialComponent} from '../../select-color-dialog/select-color-dialog-material/select-color-dialog-material.component';

@Component({
	selector: 'app-configuration-bootstrap',
	templateUrl: './configuration-bootstrap.component.html',
	styleUrls: ['./configuration-bootstrap.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class ConfigurationBootstrapComponent implements OnInit {
	private readonly presenter: ConfigurationPresenter;
	@Input() private elements: ViewElement[];
	@Output() configurationElementsEmitter = new EventEmitter<ViewElement[]>();
	private viewElements: ViewElement[];
	private discardedElements: ViewElement[] = [];

	constructor(private sanitizer: DomSanitizer,public dialog:MatDialog) {
		this.presenter = new ConfigurationPresenter();
	}

	ngOnInit() {
		this.presenter.state.asObservable().subscribe(state => {
			this.viewElements = state.elements;

		});

		let event: ConfigurationEvent = new ConfigurationInitViewEvent();
		this.presenter.publishEvent(event);
	}

	drop(event: CdkDragDrop<ViewElement[]>) {
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			let el = this.elements[event.previousIndex].clone();
			if (el.elementName === 'Text'){
				let promptText = '';
				do{
					promptText = prompt("Enter your text.\n\nBash only accepts the following characters: abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPRSTUVWXYZ@#$%^&*()/[];:~1234567890");
				}
				while (promptText != null && 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPRSTUVWXYZ@#$%^&*()/[];:~1234567890'.indexOf(promptText) === -1);
				if (promptText == null || promptText === ''){
					promptText = ' ';
				}
				el.elementShowText = promptText;
			}
			copyItemIntoArray(this.viewElements, event.currentIndex,el);

		}
		this.emit();
	}

	discard(event: CdkDragDrop<ViewElement[]>) {
		//From :viewElements     -previousIndex
		//To   :discardedElements-currentIndex
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			deleteItemFromArray(this.viewElements, event.previousIndex);
		}
		this.emit();
	}

	emit() {
		this.configurationElementsEmitter.emit(this.viewElements);
	}

	openDialog(element:ViewElement): void {
		const dialogRef = this.dialog.open(SelectColorDialogMaterialComponent, {
			width: '250px',
			height: '250px',
			data:element
		});

		dialogRef.afterClosed().subscribe((result:ViewElement) => {
			//handle the dialog close.
		});
	}

}

function copyItemIntoArray(arrTo: any[], indexFrom: number, el:any): void {
	arrTo.splice(indexFrom, 0, el);
}

function deleteItemFromArray(arrFrom: any[], indexFrom: number): void {
	arrFrom.splice(indexFrom, 1);
}
