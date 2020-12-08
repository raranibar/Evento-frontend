import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthRoutingModule } from './auth/auth.routing';

import { NofoundComponent } from './nofound/nofound.component';
import { PagesRoutingModule } from './pages/pages.routing';
import { AdminRoutingModule } from './admin/admin.routing';


const routes: Routes = [

	{ path: '', redirectTo: '/', pathMatch: 'full' },
	{ path: '**', component: NofoundComponent },

];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', scrollPositionRestoration: 'enabled' }),
		PagesRoutingModule,
		AdminRoutingModule,
		AuthRoutingModule
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
