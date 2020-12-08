import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpositorService } from '../../services/expositor.service';
import { Expositor } from '../../models/expositor/expositor.model';
import swal from 'sweetalert2';

@Component({
	selector: 'app-expositor',
	templateUrl: './expositor.component.html',
	styles: [
	]
})
export class ExpositorComponent implements OnInit {

	expositor: Expositor[] = [];

	constructor(
		private router: Router, private expositorService: ExpositorService
	) { }

	ngOnInit(): void {
		this.getExpositores();
	}


	updateExpositor(id: number) {
		this.router.navigateByUrl(`/admin/expositor/${id}`);
	}

	getExpositores() {
		this.expositorService.getExpositores()
			.subscribe(resp => {
				this.expositor = resp;
			});
	}


	deleteExpositor(id: number) {

		swal.fire('Eliminado Expositor...');
		swal.showLoading();
		this.expositorService.deleteExpositor(id)
			.subscribe(resp => {

				if (resp.exito) {
					this.expositor = this.expositor.filter(x => x.id !== id);
					swal.fire({
						position: 'center',
						icon: 'success',
						title: resp.mensaje,
						showConfirmButton: false,
						timer: 1500
					});
				}
				else {
					swal.fire('', resp.mensaje, 'error');
				}

			});
	}

}
