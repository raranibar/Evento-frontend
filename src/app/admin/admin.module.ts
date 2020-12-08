import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';


import { CongresoComponent } from './congreso/congreso.component';
import { CongresoFormComponent } from './congreso/congreso-form/congreso-form.component';

import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { CategoriaComponent } from './categoria/categoria.component';
import { RolComponent } from './rol/rol.component';
import { ExpositorComponent } from './expositor/expositor.component';
import { ExpositorFormComponent } from './expositor/expositor-form/expositor-form.component';
import { EmprendedorComponent } from './emprendedor/emprendedor.component';
import { EmprendedorFormComponent } from './emprendedor/emprendedor-form/emprendedor-form.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { RolFormComponent } from './rol/rol-form/rol-form.component';
import { TematicoComponent } from './tematico/tematico.component';
import { TematicoFormComponent } from './tematico/tematico-form/tematico-form.component';
import { BlankComponent } from './blank/blank.component';
import { ParticipanteComponent } from './participante/participante.component';
import { ParticipanteFormComponent } from './participante/participante-form/participante-form.component';
import { ProgramaComponent } from './programa/programa.component';
import { VideoejetematicoComponent } from './videoejetematico/videoejetematico.component';


@NgModule({
	declarations: [
		CongresoComponent,
		CongresoFormComponent,
		AdminComponent,
		CategoriaComponent,
		RolComponent,
		ExpositorComponent,
		ExpositorFormComponent,
		EmprendedorComponent,
		EmprendedorFormComponent,
		RolComponent,
		RolFormComponent,
		UsuarioComponent,
		UsuarioFormComponent,
		TematicoComponent,
		TematicoFormComponent,
		BlankComponent,
		ParticipanteComponent,
		ParticipanteFormComponent,
		ProgramaComponent,
		VideoejetematicoComponent
	],
	exports: [
		CongresoComponent,
		CongresoFormComponent,
		AdminComponent,
		CategoriaComponent,
		RolComponent,
		ExpositorComponent,
		UsuarioComponent,
		UsuarioFormComponent,
		GoogleMapsModule,
		RolFormComponent,
		EditorModule,
		TematicoComponent,
		TematicoFormComponent,
		BlankComponent,
		ParticipanteComponent,
		ParticipanteFormComponent,
		ProgramaComponent,
		VideoejetematicoComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		SharedModule,
		NgxDropzoneModule,
		EditorModule,
		FormsModule,
		ReactiveFormsModule,
		GoogleMapsModule,
	],
})
export class AdminModule { }
