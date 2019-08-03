import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ConfigurationPresenter} from '../../../../domain/view/configuration/configurationPresenter';
import {ViewElement} from '../../../../domain/model/viewElement';
import {ConfigurationEvent} from '../../../../domain/view/configuration/configurationEvent';
import {ConfigurationInitViewEvent} from '../../../../domain/view/configuration/configurationInitViewEvent';
import {MatDialog} from '@angular/material';
import {SelectColorDialogMaterialComponent} from '../../select-color-dialog/select-color-dialog-material/select-color-dialog-material.component';
import {SortablejsOptions} from 'ngx-sortablejs';
import {GeneralService} from '../../../../domain/application/services/general.service';
import {ConfigurationElementChangedEvent} from '../../../../domain/view/configuration/configurationElementChangedEvent';
import {ConfigurationRemoveAllEvent} from '../../../../domain/view/configuration/configurationRemoveAllEvent';

@Component({
	selector: 'app-configuration-bootstrap',
	templateUrl: './configuration-bootstrap.component.html',
	styleUrls: ['./configuration-bootstrap.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class ConfigurationBootstrapComponent implements OnInit {
	private readonly presenter: ConfigurationPresenter;
	@Output() configurationElementsEmitter = new EventEmitter<ViewElement[]>();
	elements: ViewElement[];
	sortableOptions: SortablejsOptions;

	constructor(public dialog: MatDialog,private ref: ChangeDetectorRef) {
		this.presenter = new ConfigurationPresenter();
		this.sortableOptions = {
			'group': {
				'name': 'shared'
			},
			'onAdd': (a) => {
				let element: ViewElement = this.elements[a.newIndex];

				if (element.elementName === GeneralService.customTextName) {
					let promptText = '';
					do {
						promptText = prompt('Enter your text.\n\nBash only accepts the following characters: abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPRSTUVWXYZ@#$%^&*()/[];:~1234567890');
					}
					while (promptText != null && promptText != '' && !'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPRSTUVWXYZ@#$%^&*()/[];:~1234567890'.split('').some(function(v) {
						return promptText.indexOf(v) >= 0;
					}));
					if (promptText == null || promptText === '') {
						promptText = ' ';
					}
					element.elementShowText = promptText;
				}
				let event: ConfigurationEvent = new ConfigurationElementChangedEvent(this.elements);
				this.presenter.publishEvent(event);
			},
			'onUpdate': () => {
				let event: ConfigurationEvent = new ConfigurationElementChangedEvent(this.elements);
				this.presenter.publishEvent(event);
			},
			'onRemove': () => {
				let event: ConfigurationEvent = new ConfigurationElementChangedEvent(this.elements);
				this.presenter.publishEvent(event);
			},
			'onEnd': (event)=>{
				//TODO when removeOnSpill is released on ngx-sortablejs, use that instead of this ugly hack.
				let el = document.getElementById('Configuration');
				let elementIndex= event.oldIndex;
				let originalEvent = event.originalEvent;
				let {clientX,clientY} = originalEvent;
				const { top, right, bottom, left } = el.getBoundingClientRect();
				let droppedOutside = (clientY < top || clientX < left || clientY > bottom || clientX > right);
				if (droppedOutside){
					this.elements.splice(elementIndex,1);
					let event: ConfigurationEvent = new ConfigurationElementChangedEvent(this.elements);
					this.presenter.publishEvent(event);
				}
			}

		};
	}

	ngOnInit() {
		this.presenter.state.asObservable().subscribe(state => {
			this.elements = state.elements;
			this.ref.detectChanges();
			this.emit();
		});


		let event: ConfigurationEvent = new ConfigurationInitViewEvent();
		this.presenter.publishEvent(event);
	}


	emit() {
		this.configurationElementsEmitter.emit(this.elements);
	}

	openDialog(element: ViewElement, index:number): void {
		const dialogRef = this.dialog.open(SelectColorDialogMaterialComponent, {
			width: '250px',
			height: '250px',
			data: element.clone()
		});
		dialogRef.afterClosed().subscribe((updatedElement: ViewElement) => {
			this.elements[index] = updatedElement;
			let event: ConfigurationEvent = new ConfigurationElementChangedEvent(this.elements);
			this.presenter.publishEvent(event);
		});
	}

	removeAll():void{
		let answer = confirm('Are you sure you want to remove all configuration elements?');
		if (answer){
			let event: ConfigurationEvent = new ConfigurationRemoveAllEvent();
			this.presenter.publishEvent(event);
		}
	}
}
