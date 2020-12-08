import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
// import { AuthGuard } from '../guards/auth.guard';

import { ProgressComponent } from './progress/progress.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { EmprendedorComponent } from './emprendedor/emprendedor.component';
import { HomeComponent } from './home/home.component';
import { EmprendimientoComponent } from './emprendimiento/emprendimiento.component';
import { ExpositorComponent } from './expositor/expositor.component';


const routes: Routes = [
	{
		path: '',
		component: PagesComponent,
		children: [

			{ path: '', component: HomeComponent },
			{ path: 'progress', component: ProgressComponent },
			{ path: 'categorias', component: CategoriaComponent },
			{ path: 'emprendedor/:id', component: EmprendedorComponent },
			{ path: 'emprendimientos/:id', component: EmprendimientoComponent },
			{ path: 'expositor', component: ExpositorComponent },
		]
	}
];

@NgModule({
	declarations: [
	],
	exports: [RouterModule],
	imports: [
		RouterModule.forChild(routes)
	]
})
export class PagesRoutingModule { }
