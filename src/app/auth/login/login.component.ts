import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';

declare const gapi: any;

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {

	public auth2: any;

	public loginForm = this.fb.group({

		login: [localStorage.getItem('login') || '', [Validators.required, Validators.email]],
		password: ['', Validators.required],
		remember: [false]
	});


	constructor(private fb: FormBuilder, private router: Router, private userService: UsuarioService) {
		if (localStorage.getItem('login')) {
			this.loginForm.get('remember').setValue(true);
		}
	}


	login(): any {

		this.userService.login(this.loginForm.value)
			.subscribe(resp => {
				if (resp.exito === 1) {

					if (this.loginForm.get('remember').value) {
						localStorage.setItem('login', this.loginForm.get('login').value);
					} else {
						localStorage.removeItem('login');
					}
					this.router.navigateByUrl('/admin');
					// const rol = this.userService.globalU.idRol;
					// console.log(rol);

					// if (rol === 1) {
					// 	this.router.navigateByUrl('/admin/usuario/nuevo');
					// }
					// if (rol === 2) {
					// 	this.router.navigateByUrl('/admin/emprendedor/update');
					// }
					// if (rol === 3) {

					// }
					// if (rol === 4) {

					// }
					// if (rol === 3) {
					// }
				}
				else {
					swal.fire({
						position: 'center',
						icon: 'error',
						title: resp.mensaje,
						showConfirmButton: false,
						timer: 1000
					});
				}
			}, err => {
				swal.fire('Error', err.error.msg, 'error');
			});
	}
	ngOnInit(): void {
	}

}
