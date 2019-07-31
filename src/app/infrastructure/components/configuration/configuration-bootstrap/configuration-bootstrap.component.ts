import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ConfigurationPresenter} from '../../../../domain/view/configuration/configurationPresenter';
import {ViewElement} from '../../../../domain/model/viewElement';
import {ConfigurationEvent} from '../../../../domain/view/configuration/configurationEvent';
import {ConfigurationInitViewEvent} from '../../../../domain/view/configuration/configurationInitViewEvent';
import {MatDialog} from '@angular/material';
import {SelectColorDialogMaterialComponent} from '../../select-color-dialog/select-color-dialog-material/select-color-dialog-material.component';
import {SortablejsOptions} from 'ngx-sortablejs';
import {GeneralService} from '../../../../domain/application/services/general.service';

declare let $: any;

@Component({
	selector: 'app-configuration-bootstrap',
	templateUrl: './configuration-bootstrap.component.html',
	styleUrls: ['./configuration-bootstrap.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class ConfigurationBootstrapComponent implements OnInit {
	private readonly presenter: ConfigurationPresenter;
	@Output() configurationElementsEmitter = new EventEmitter<ViewElement[]>();
	viewElements: ViewElement[];
	discardedElements: ViewElement[] = [];
	sortableOptions: SortablejsOptions;
	discardedOptions: SortablejsOptions;

	constructor(public dialog: MatDialog, private cd: ChangeDetectorRef) {
		this.presenter = new ConfigurationPresenter();
		this.sortableOptions = {
			'group': {
				'name': 'shared'
			},
			'onAdd': (a) => {
				let element: ViewElement = this.viewElements[a.newIndex];

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
			}
		};
		this.discardedOptions = {
			'sort': false,
			'animation': 100,
			'ghostClass': 'invisible',
			'group': {
				'name': 'shared',
				'put': (to, from, element) => {
					return from.el.id !== 'ElementsList';
				}
			}
		};
	}

	ngOnInit() {
		this.presenter.state.asObservable().subscribe(state => {
			this.viewElements = state.elements;
			this.emit();
		});


		let event: ConfigurationEvent = new ConfigurationInitViewEvent();
		this.presenter.publishEvent(event);
	}


	emit() {
		this.configurationElementsEmitter.emit(this.viewElements);
	}

	openDialog(element: ViewElement): void {
		const dialogRef = this.dialog.open(SelectColorDialogMaterialComponent, {
			width: '250px',
			height: '250px',
			data: element
		});
		dialogRef.afterClosed().subscribe((result: ViewElement) => {
			//handle the dialog close.
		});
	}
}
