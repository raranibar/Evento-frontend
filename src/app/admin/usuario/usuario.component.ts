import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-usuario',
	templateUrl: './usuario.component.html',
})
export class UsuarioComponent implements OnInit {

	constructor(private router: Router) { }

	ngOnInit(): void {
	}
	eliminarUsuario(id: number) {

	}
	actualizarUsuario() {
		this.router.navigateByUrl(`/admin/expositor/nuevo"`);
	}
}
