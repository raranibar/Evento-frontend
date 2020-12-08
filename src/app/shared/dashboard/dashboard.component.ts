import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from 'src/app/models/usuario/usuario.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	global: Usuario;
	public passForm: FormGroup;


	constructor(private usuarioService: UsuarioService, private fb: FormBuilder,
		private router: Router) {
		this.global = this.usuarioService.globalU;
	}

	ngOnInit(): void {
		this.passForm = this.fb.group({
			cPassword: ['', [Validators.required, Validators.minLength(5)]],
			password: ['', [Validators.required, Validators.minLength(5)]],
			password2: ['', [Validators.required, Validators.minLength(5)]],
		});
	}

	cambiarClave() {
		if (this.passForm.invalid) {
			return;
		}
		if (this.passForm.get('password').value === this.passForm.get('password2').value) {
			const data = {
				id: this.global.id,
				cClave: this.passForm.get('cPassword').value,
				clave: this.passForm.get('password').value,
			}
			// this.usuarioService.updateUsuario(data)
			// 	.subscribe((resp: any) => {
			// 		console.log(resp);
			// 	});
		}
		else {
			swal.fire('', 'Las contraseñas no son las mismas');
		}
	}

	logout() {
		this.usuarioService.logout();
	}

}
