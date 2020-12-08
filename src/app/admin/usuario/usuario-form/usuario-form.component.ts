import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivationEnd, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';



import { UsuarioService } from '../../../services/usuario.service';
import { Rol } from '../../../models/usuario/rol.model';
import { RolService } from '../../../services/rol.service';
import { CongresoService } from '../../../services/congreso.service';
import { Congreso } from '../../../models/congreso/congreso.model';
import { Pais, Ciudad } from '../../../models/usuario/pais.model';
import { Clasificador } from '../../../models/usuario/clasificador.model';
import { Usuario } from 'src/app/models/usuario/usuario.model';
import { Persona } from 'src/app/models/usuario/persona.model';


@Component({
	selector: 'app-usuario-form',
	templateUrl: './usuario-form.component.html',
})
export class UsuarioFormComponent implements OnInit {

	public usuarioForm: FormGroup;
	role: Rol[] = [];
	country: Pais[] = [];
	city: Ciudad[] = [];
	documento: Clasificador[] = [];
	genero: Clasificador[] = [];
	congress: Congreso;
	usuario: Usuario;
	vfUsuario: Usuario;
	global: Usuario;


	constructor(private fb: FormBuilder, private usuarioService: UsuarioService,
		private roleService: RolService,
		private congressServices: CongresoService,
		private activatedRoute: ActivatedRoute) {
		this.global = this.usuarioService.globalU;

	}

	ngOnInit(): void {

		this.usuarioForm = this.fb.group({
			nombres: ['', Validators.required],
			paterno: ['', Validators.required],
			materno: ['', Validators.required],
			fono: ['', Validators.required],
			direccion: ['', Validators.required],
			idTipoDocumento: [1, Validators.required],
			idPais: [123, Validators.required],
			idCiudad: [1785, Validators.required],
			idGenero: [5, Validators.required],
			numDocumento: ['', Validators.required],
			idRol: [(this.global.idRol === 5) ? 4 : 2, Validators.required],
			email: ['', Validators.required],

		});


		this.getRole();
		this.getCongress();
		this.getCountry();
		this.getCity(123);
		this.getDocumento();
		this.getGenero();
		if (this.global.idRol !== 1 && this.global.idRol !== 5) {
			this.getUsuarioById(this.global.id);
		}
		this.usuario = this.usuarioService.globalU;
	}

	postUsuario() {

		if (this.global.idRol === 1 || this.global.idRol === 5) {
			if (this.usuarioForm.valid) {
				const data = {
					...this.usuarioForm.value,
					idCongreso: this.congress.id,
				};
				swal.fire('Registrando Usuario...');
				swal.showLoading();
				this.usuarioService.postUsuario(data)
					.subscribe(resp => {
						if (resp.exito) {
							this.clearInputs();
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
			else {
				swal.fire('', 'Existen campos requeridos', 'error');
			}
		}
		else {
			this.updateUsuario();
		}
	}

	updateUsuario() {

		if (this.usuarioForm.valid) {

			const data = {
				...this.usuarioForm.value,
				id: this.usuario.persona.id,
			};

			swal.fire('Modificando Usuario...');
			swal.showLoading();
			this.usuarioService.updateUsuario(data)
				.subscribe(resp => {
					if (resp.exito) {
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
		else {
			swal.fire('', 'Existen campos requeridos', 'error');
		}

	}


	getUsuarioById(id: number) {

		this.usuarioService.getUsuarioById(id)
			.subscribe(resp => {

				const { nombres, paterno, materno, fono, direccion, idTipoDocumento,
					idPais, idCiudad, idGenero, numDocumento } = resp.persona;
				const { email } = resp.usuario;
				const { idRol } = resp.rol;
				const persona = new Persona(nombres, paterno, materno, idGenero,
					fono, idPais, idCiudad, direccion, numDocumento,
					idTipoDocumento, resp.persona.id);

				const usuario = new Usuario(this.usuario.id, email, 5, idRol, persona);
				this.usuario = usuario;
				this.vfUsuario = usuario;
				this.usuarioForm.setValue({
					idRol, nombres, paterno, materno, fono, direccion, idTipoDocumento, idPais,
					idCiudad, idGenero, numDocumento, email
				});

			});

	}

	getRole() {
		this.roleService.getRole()
			.subscribe(resp => {
				this.role = resp;
			});
	}

	getCongress() {
		this.congressServices.getCongress()
			.subscribe(resp => {
				const data = resp.filter(x => x.estado === true);
				this.congress = data[0];
			});
	}

	getCountry() {
		this.usuarioService.getCountry()
			.subscribe(resp => {
				this.country = resp;
			});
	}

	getCity(e: any) {
		let id: any = e;
		if (e !== 123) {
			const value: string = e.target.value;
			const idA = value.split(' ')[1];
			id = +idA;
		}
		this.usuarioService.getCity(id)
			.subscribe(resp => {
				this.city = resp;
			});
	}

	getDocumento() {

		this.usuarioService.getDocumento()
			.subscribe(resp => {
				this.documento = resp;
			});

	}
	getGenero() {

		this.usuarioService.getGenero()
			.subscribe(resp => {
				this.genero = resp;
			});
	}

	clearInputs() {
		this.usuarioForm.setValue({
			nombres: '',
			paterno: '',
			materno: '',
			fono: '',
			direccion: '',
			idTipoDocumento: 1,
			idPais: 123,
			idCiudad: 1785,
			idGenero: 5,
			numDocumento: '',
			idRol: (this.global.idRol === 5) ? 4 : 2,
			email: '',
		});
	}
}
