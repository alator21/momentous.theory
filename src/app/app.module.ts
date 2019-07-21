import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ElementsListBootstrapComponent} from './infrastructure/components/elements-list/elements-list-bootstrap/elements-list-bootstrap.component';
import {PreviewBootstrapComponent} from './infrastructure/components/preview/preview-bootstrap/preview-bootstrap.component';
import {ConfigurationBootstrapComponent} from './infrastructure/components/configuration/configuration-bootstrap/configuration-bootstrap.component';
import {OutputBootstrapComponent} from './infrastructure/components/output/output-bootstrap/output-bootstrap.component';
import {CommonModule} from '@angular/common';
import {SelectColorDialogMaterialComponent} from './infrastructure/components/select-color-dialog/select-color-dialog-material/select-color-dialog-material.component';
import {MatButtonModule, MatDialogModule, MatSelectModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';


@NgModule({
	declarations: [
		AppComponent,
		ElementsListBootstrapComponent,
		PreviewBootstrapComponent,
		ConfigurationBootstrapComponent,
		OutputBootstrapComponent,
		SelectColorDialogMaterialComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		DragDropModule,
		CommonModule,
		MatDialogModule,
		BrowserAnimationsModule,
		MatSelectModule,
		FormsModule,
		MatButtonModule
	],
	entryComponents: [
		SelectColorDialogMaterialComponent
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
