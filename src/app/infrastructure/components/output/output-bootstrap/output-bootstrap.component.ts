import {ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {OutputPresenter} from '../../../../domain/view/output/outputPresenter';
import {ViewElement} from '../../../../domain/model/viewElement';
import {OutputEvent} from '../../../../domain/view/output/outputEvent';
import {OutputInitViewEvent} from '../../../../domain/view/output/outputInitViewEvent';
import {OutputState} from '../../../../domain/view/output/outputState';
import {Subject} from 'rxjs';
import {OutputChangedElementEvent} from '../../../../domain/view/output/outputChangedElementEvent';

@Component({
	selector: 'app-output-bootstrap',
	templateUrl: './output-bootstrap.component.html',
	styleUrls: ['./output-bootstrap.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class OutputBootstrapComponent implements OnInit {
	private presenter: OutputPresenter;
	@Input() listener: Subject<ViewElement[]>;

	output: string;

	constructor(private ref: ChangeDetectorRef) {
		this.presenter = new OutputPresenter();
	}

	ngOnInit() {
		this.presenter.state.asObservable().subscribe((state: OutputState) => {
			this.output = state.output;
			this.ref.detectChanges();
		});
		this.listener.subscribe((elements: ViewElement[]) => {
			let event: OutputEvent = new OutputChangedElementEvent(elements);
			this.presenter.publishEvent(event);
		});

		let event: OutputEvent = new OutputInitViewEvent();
		this.presenter.publishEvent(event);
	}
}
