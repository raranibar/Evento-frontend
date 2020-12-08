import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { Emprendedor } from 'src/app/models/emprendedor/emprendedor.model';
import { EmprendedorService } from 'src/app/services/emprendedor.service';


@Component({
	selector: 'app-emprendimiento',
	templateUrl: './emprendimiento.component.html',
	styles: [
	]
})
export class EmprendimientoComponent implements OnInit {

	id: any;
	emprendedor: Emprendedor[] = [];


	constructor(private activatedRoute: ActivatedRoute, private emprendedorService: EmprendedorService) {
		this.id = this.activatedRoute.snapshot.paramMap.get('id');

		this.emprendedorService.getEmprendedor(this.id)
			.subscribe(data => {
				this.emprendedor = data.filter(x => x.estado === true);
			});
	}

	ngOnInit(): void {

	}

}
