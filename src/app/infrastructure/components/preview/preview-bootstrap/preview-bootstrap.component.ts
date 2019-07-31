import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {PreviewPresenter} from '../../../../domain/view/preview/previewPresenter';
import {PreviewEvent} from '../../../../domain/view/preview/previewEvent';
import {PreviewInitViewEvent} from '../../../../domain/view/preview/previewInitViewEvent';
import {ViewElement} from '../../../../domain/model/viewElement';
import {DomSanitizer} from '@angular/platform-browser';
import {PreviewToggleEvent} from '../../../../domain/view/preview/previewToggleEvent';
import {GeneralService} from '../../../../domain/application/services/general.service';


const DEFAULT_BLACK_TOGGLER_CLASS: string = 'fa fa-3x fa-toggle-on fa-rotate-180';
const DEFAULT_WHITE_TOGGLER_CLASS: string = 'fa fa-3x fa-toggle-on color-white';

const DEFAULT_BG_BLACK_FG_WHITE_PREVIEW_CLASS: string = 'background-black color-white';
const DEFAULT_FG_BLACK_BG_WHITE_PREVIEW_CLASS: string = 'background-white color-black';


@Component({
	selector: 'app-preview-bootstrap',
	templateUrl: './preview-bootstrap.component.html',
	styleUrls: ['./preview-bootstrap.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class PreviewBootstrapComponent implements OnInit {
	private readonly presenter: PreviewPresenter;
	@Input() elements: ViewElement[];
	private bgColor: string;
	private fgColor: string;

	constructor(private sanitizer: DomSanitizer, private service: GeneralService) {
		this.presenter = new PreviewPresenter(service);
	}

	ngOnInit() {
		this.presenter.state.asObservable().subscribe(state => {
			if (state.elements != null) {
				this.elements = state.elements;
			}
			this.bgColor = state.bgColor;
			this.fgColor = state.fgColor;
		});

		let event: PreviewEvent = new PreviewInitViewEvent();
		this.presenter.publishEvent(event);
	}

	toggle() {
		let event: PreviewEvent = new PreviewToggleEvent();
		this.presenter.publishEvent(event);
	}

	isBgBlackFgWhite(): boolean {
		return this.bgColor === 'black';
	}

	getTogglerClass(): string {
		if (this.isBgBlackFgWhite()) {
			return DEFAULT_BLACK_TOGGLER_CLASS;
		}
		return DEFAULT_WHITE_TOGGLER_CLASS;
	}

	getPreviewClass(): string {
		if (this.isBgBlackFgWhite()) {
			return DEFAULT_BG_BLACK_FG_WHITE_PREVIEW_CLASS;
		}
		return DEFAULT_FG_BLACK_BG_WHITE_PREVIEW_CLASS;
	}

	temp(viewElement: ViewElement): string | null {
		let example = GeneralService.getElementExampleByViewElement(viewElement);
		return example || null;
	}
}
