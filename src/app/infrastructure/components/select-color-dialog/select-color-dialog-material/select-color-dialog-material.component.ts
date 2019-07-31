import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ViewElement} from '../../../../domain/model/viewElement';
import {GeneralService} from '../../../../domain/application/services/general.service';

@Component({
	selector: 'app-select-color-dialog-material',
	templateUrl: './select-color-dialog-material.component.html',
	styleUrls: ['./select-color-dialog-material.component.css']
})
export class SelectColorDialogMaterialComponent implements OnInit {
	colors: string[] = [];

	constructor(private service:GeneralService,public dialogRef: MatDialogRef<SelectColorDialogMaterialComponent>, @Inject(MAT_DIALOG_DATA) public data: ViewElement) {
		this.colors = GeneralService.getAvailableColors();
	}

	ngOnInit() {

	}

}
