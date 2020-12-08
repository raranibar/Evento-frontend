import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule} from '@angular/google-maps';

import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { HomeComponent } from './home/home.component';
import { EmprendedorComponent } from './emprendedor/emprendedor.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { EmprendimientoComponent } from './emprendimiento/emprendimiento.component';
import { ExpositorComponent } from './expositor/expositor.component';
import { SafePipe } from '../safe.pipe';

@NgModule({
	declarations: [
		PagesComponent,
		ProgressComponent,
		HomeComponent,
		EmprendedorComponent,
		CategoriaComponent,
		EmprendimientoComponent,
		ExpositorComponent,
		SafePipe

	],
	exports: [
		ProgressComponent,
		PagesComponent,
		HomeComponent,
		EmprendedorComponent,
		CategoriaComponent,
		EmprendimientoComponent,
		ExpositorComponent,
		GoogleMapsModule
	],
	imports: [
		CommonModule,
		FormsModule,
		SharedModule,
		ReactiveFormsModule,
		RouterModule,
		GoogleMapsModule
	]
})
export class PagesModule { }
