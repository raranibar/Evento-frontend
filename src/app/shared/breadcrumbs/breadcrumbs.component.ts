import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-breadcrumbs',
	templateUrl: './breadcrumbs.component.html',
	styles: [
	]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

	constructor() {
	}
	ngOnDestroy(): void {
	}

	ngOnInit(): void {
	}

}
