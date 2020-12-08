import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
	declarations: [
		BreadcrumbsComponent,
		SidebarComponent,
		HeaderComponent,
		AdminHeaderComponent,
		FooterComponent,
		DashboardComponent,
	],
	exports: [
		BreadcrumbsComponent,
		SidebarComponent,
		HeaderComponent,
		FooterComponent,
		AdminHeaderComponent,
		DashboardComponent,

	],
	imports: [
		CommonModule,
		RouterModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule

	]
})
export class SharedModule { }
