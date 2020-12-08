import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-emprendedor',
	templateUrl: './emprendedor.component.html',

})
export class EmprendedorComponent implements OnInit {

	constructor(
		private router: Router,
	) { }

	ngOnInit(): void {
	}


	deleteEntrepreneur(id: number) {

	}
	updateEntrepreneur() {
		this.router.navigateByUrl(`/admin/emprendedor/nuevo"`);
	}
}
