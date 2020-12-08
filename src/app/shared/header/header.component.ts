import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styles: [
	]
})
export class HeaderComponent implements OnInit {

	constructor(private router: Router) {
	}

	ngOnInit(): void {
	}

	linkAdmin() {
		const d: string = localStorage.getItem('token');
		if (d) {
			this.router.navigateByUrl('/admin');
		}
		else {
			this.router.navigateByUrl('/login');
		}
	}
}
