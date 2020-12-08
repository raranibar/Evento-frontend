import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
declare function init();
@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styles: [
	]
})
export class AdminComponent implements OnInit {


	constructor(private router: Router, private usuarioService: UsuarioService) {

		const rol = this.usuarioService.globalU.idRol;
		if (rol === 1) {
			this.router.navigateByUrl('/admin/usuario/nuevo');
		}
		if (rol === 2) {
			this.router.navigateByUrl('/admin/emprendedor/update');
		}
		if (rol === 3) {
			this.router.navigateByUrl('/admin/expositor');
		}
		if (rol === 4) {
			this.router.navigateByUrl('/admin/programa');
		}
		if (rol === 5) {
			this.router.navigateByUrl('/admin/usuario/nuevo');
		}
	}

	ngOnInit(): void {
		init();
	}

}
