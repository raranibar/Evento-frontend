import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../guards/auth.guard';
import { CategoriaComponent } from './categoria/categoria.component';
import { ExpositorComponent } from './expositor/expositor.component';
import { RolComponent } from './rol/rol.component';

import { CongresoComponent } from './congreso/congreso.component';
import { CongresoFormComponent } from './congreso/congreso-form/congreso-form.component';
import { CategoriasComponent } from './categoria/categorias/categorias.component';
import { RolFormComponent } from './rol/rol-form/rol-form.component';
import { ExpositorFormComponent } from './expositor/expositor-form/expositor-form.component';
import { EmprendedorComponent } from './emprendedor/emprendedor.component';
import { EmprendedorFormComponent } from './emprendedor/emprendedor-form/emprendedor-form.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';

import { TematicoComponent } from './tematico/tematico.component';
import { TematicoFormComponent } from './tematico/tematico-form/tematico-form.component';
import { BlankComponent } from './blank/blank.component';
import { ParticipanteFormComponent } from './participante/participante-form/participante-form.component';
import { ParticipanteComponent } from './participante/participante.component';
import { ProgramaComponent } from './programa/programa.component';
import { VideoejetematicoComponent } from './videoejetematico/videoejetematico.component';

import { AdminGuard } from '../guards/admin.guard';
import { ParticipanteGuard } from '../guards/participante.guard';
import { ExpositorGuard } from '../guards/expositor.guard';
import { EmprendedorGuard } from '../guards/emprendedor.guard';
import { RegparticipanteGuard } from '../guards/regparticipante.guard';


const routes: Routes = [
	{
		path: 'admin',
		component: AdminComponent,
		canActivate: [AuthGuard],
		children: [
			{ path: '', component: BlankComponent, },
			{ path: 'congreso', component: CongresoComponent, canActivate: [AdminGuard] },
			{ path: 'categoria', component: CategoriaComponent, canActivate: [AdminGuard] },
			{ path: 'expositor', component: ExpositorComponent , canActivate: [ExpositorGuard]},
			{ path: 'rol', component: RolComponent, canActivate: [AdminGuard] },
			{ path: 'emprendedor', component: EmprendedorComponent, canActivate: [AdminGuard] },
			{ path: 'usuario', component: UsuarioComponent, canActivate: [AdminGuard]  },
			{ path: 'tematico', component: TematicoComponent, canActivate: [AdminGuard] },
			{ path: 'participante', component: ParticipanteComponent, canActivate: [RegparticipanteGuard]  },
			{ path: 'programa', component: ProgramaComponent, canActivate: [ParticipanteGuard] },
			{ path: 'videoEjetematico', component: VideoejetematicoComponent, canActivate: [ParticipanteGuard] },

			{ path: 'congreso/:id', component: CongresoFormComponent, canActivate: [AdminGuard] },
			{ path: 'categorias/:id', component: CategoriasComponent, canActivate: [AdminGuard] },
			{ path: 'rol/:id', component: RolFormComponent, canActivate: [AdminGuard] },
			{ path: 'expositor/:id', component: ExpositorFormComponent, canActivate: [ExpositorGuard] },
			{ path: 'emprendedor/:id', component: EmprendedorFormComponent, canActivate: [EmprendedorGuard]  },
			{ path: 'usuario/:id', component: UsuarioFormComponent, canActivate: [EmprendedorGuard]  },
			{ path: 'tematico/:id', component: TematicoFormComponent, canActivate: [AdminGuard] },
			{ path: 'participante/:id', component: ParticipanteFormComponent, canActivate: [RegparticipanteGuard]  },


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
export class AdminRoutingModule { }
