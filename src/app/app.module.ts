import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { RatingModule } from 'ng-starrating';

import { AppComponent } from './app.component';
import { NofoundComponent } from './nofound/nofound.component';
import { PagesModule } from './pages/pages.module';
import { AdminModule } from './admin/admin.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { EditorModule } from '@tinymce/tinymce-angular';

import { NgImageSliderModule } from 'ng-image-slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@NgModule({
	declarations: [
		AppComponent,
		NofoundComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		AuthModule,
		PagesModule,
		AdminModule,
		NgxDropzoneModule,
		EditorModule,
		RatingModule,
		NgImageSliderModule,
		FormsModule,
		ReactiveFormsModule,
		GoogleMapsModule,
		CommonModule,
	],

	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
