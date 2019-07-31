import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {OutputPresenter} from '../../../../domain/view/output/outputPresenter';
import {ViewElement} from '../../../../domain/model/viewElement';
import {OutputEvent} from '../../../../domain/view/output/outputEvent';
import {OutputInitViewEvent} from '../../../../domain/view/output/outputInitViewEvent';
import {GeneralService} from '../../../../domain/application/services/general.service';

@Component({
	selector: 'app-output-bootstrap',
	templateUrl: './output-bootstrap.component.html',
	styleUrls: ['./output-bootstrap.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class OutputBootstrapComponent implements OnInit {
	private presenter: OutputPresenter;
	@Input() elements: ViewElement[];

	constructor(private  service: GeneralService) {
		this.presenter = new OutputPresenter();
	}

	ngOnInit() {
		this.presenter.state.asObservable().subscribe(state => {
		});

		let event: OutputEvent = new OutputInitViewEvent();
		this.presenter.publishEvent(event);
	}

	getOutput(): string {
		const START_OUTPUT: string = `PS1="`;
		const END_OUTPUT_COLOR: string = `${GeneralService.defaultBashColor}"`;
		const END_OUTPUT_NO_COLOR: string = `"`;
		let output: string = ``;

		output += START_OUTPUT;
		let previousFGColor: string = GeneralService.getBashFgColorByViewElement(ViewElement.createDefault(null));
		let previousBGColor: string = GeneralService.getBashBgColorByViewElement(ViewElement.createDefault(null));
		for (let element of this.elements) {
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
