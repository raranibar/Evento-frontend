import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';


import { Congreso } from 'src/app/models/congreso/congreso.model';
import { Clasificador } from 'src/app/models/usuario/clasificador.model';
import { Ciudad, Pais } from 'src/app/models/usuario/pais.model';
import { CongresoService } from 'src/app/services/congreso.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ExpositorService } from '../../../services/expositor.service';
import { Tematico } from 'src/app/models/Tematico/tematico.model';
import { MainExpositor } from '../../../models/expositor/mainexpositor.model';
import { Usuario } from 'src/app/models/usuario/usuario.model';
import { FotoExp } from '../../../models/expositor/fotoexp.model';




@Component({
	selector: 'app-expositor-form',
	templateUrl: './expositor-form.component.html',
	styles: [
	]
})
export class ExpositorFormComponent implements OnInit {

	public expositorForm: FormGroup;
	country: Pais[] = [];
	city: Ciudad[] = [];
	documento: Clasificador[] = [];
	genero: Clasificador[] = [];
	tematico: Tematico[] = [];
	mainExpositor: MainExpositor;
	congreso: Congreso;
	foto: File;
	stateForm = true;
	global: Usuario;

	url: FotoExp[] = [];
	delU: FotoExp[] = [];
	temp: any[] = [];
	file: File[] = [];


	constructor(private fb: FormBuilder, private usuarioService: UsuarioService,
		private congressServices: CongresoService, private expositorService: ExpositorService,
		private activatedRoute: ActivatedRoute) {
		this.global = this.usuarioService.globalU;

		this.activatedRoute.params
			.subscribe(({ id }) => {
				if (id !== 'nuevo') {
					this.stateForm = false;
					this.getExpositorById(id);
				}
			});
	}

	ngOnInit(): void {
		this.expositorForm = this.fb.group({
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
			email: ['', Validators.required],

			idEjeTematico: [1, Validators.required],
			nombreExposicion: ['', Validators.required],
			institucion: ['', Validators.required],
			resumenCv: ['', Validators.required],

		});
		this.getCongreso();
		this.getCountry();
		this.getCity(123);
		this.getDocumento();
		this.getGenero();

	}

	saveExpositor() {
		if (this.url.length + this.file.length <= 1) {
			if (this.stateForm) {
				if (this.expositorForm.valid) {
					const data = {
						...this.expositorForm.value,
						idRol: 4,
						idCongreso: this.congreso.id
					};
					swal.fire('Registrando Expositor...');
					swal.showLoading();
					this.expositorService.postExpositor(data)
						.subscribe(resp => {
							this.uploadImage(resp.data, false);
							if (resp.exito) {
								this.clearInputs();
								this.clearList();
								this.msjSwal('success', resp.mensaje);
							}
							else {
								swal.fire('', resp.mensaje, 'error');
							}
						});
				}
				else {
					this.msjSwal('error', 'Existen campos necesarios que no fueron llenados');
				}
			}
			else {
				swal.fire('Modificando Expositor...');
				swal.showLoading();
				this.updateExpositor();
			}
		}
		else {
			this.msjSwal('error', 'Solo se permite una imagen');

		}
	}




	getExpositorById(id: number) {

		this.expositorService.getExpositorById(id)
			.subscribe(resp => {
				this.mainExpositor = resp;
				const { nombres, paterno, materno, fono, direccion, idTipoDocumento,
					idPais, idCiudad, idGenero, numDocumento } = resp.persona;
				const { idEjeTematico, nombreExposicion, institucion, resumenCv } = resp.expositor;
				const { email } = resp.usuario;

				this.expositorForm.setValue({
					nombres, paterno, materno, fono, direccion,
					idTipoDocumento, idPais, idCiudad, idGenero, numDocumento,
					idEjeTematico, nombreExposicion, institucion, resumenCv, email
				});
				this.getImage(resp.expositor.id);
			});

	}

	updateExpositor() {
		if (this.expositorForm.valid) {
			const data = {
				id: this.mainExpositor.expositor.id,
				idPersona: this.mainExpositor.expositor.idPersona,
				...this.expositorForm.value,
			};
			this.expositorService.putExpositor(data)
				.subscribe(resp => {
					if (resp.exito) {
						this.updatePersona();

					}
					else {
						swal.fire('', resp.mensaje, 'error');
					}
				});

			this.uploadImage(this.mainExpositor.expositor.id, true);
			this.url = [];
			this.temp = [];
			this.delU = [];
			this.file = [];
		}
		else {
			this.msjSwal('error', 'Existen campos necesarios que no fueron llenados');
		}
	}


	updatePersona() {
		if (this.expositorForm.valid) {
			// this.expositorForm.setValue({ email: this.mainExpositor.usuario.email });
			const data = {
				id: this.mainExpositor.persona.id,
				...this.expositorForm.value,
				idCongreso: this.congreso.id,
				idRol: 4,
			};

			if (this.url.length + this.file.length <= 1) {
				this.usuarioService.updateUsuario(data)
					.subscribe(resp => {
						if (resp.exito) {
							this.msjSwal('success', resp.mensaje);
						}
						else {
							swal.fire('', resp.mensaje, 'error');
						}
					});
			}
			else {
				this.msjSwal('error', 'Solo se permite una imagen');

			}
		}
		else {
			swal.fire({
				position: 'center',
				icon: 'error',
				title: 'Existen campos necesarios',
				showConfirmButton: false,
				timer: 1500
			});
		}
	}

	msjSwal(tipo: any, mensaje: any) {
		swal.fire({
			position: 'center',
			icon: tipo,
			title: mensaje,
			showConfirmButton: false,
			timer: 1500
		});
	}

	uploadImage(id: number, state: boolean) {
		this.expositorService.uploadImage(id, this.file, this.delU)
			.subscribe(data => {
				if (state) {
					this.getImage(this.mainExpositor.expositor.id);
				}
			});
	}

	clearList() {
		this.url = [];
		this.temp = [];
		this.delU = [];
		this.file = [];
	}

	getImage(id: number) {
		this.expositorService.getFotoExp(id)
			.subscribe(resp => {
				if (resp.exito) {
					this.url.push(resp.data);
				}
			});
	}

	eliminarFileId(id: number) {
		this.file[id] = null;
		this.temp[id] = null;
		delete this.temp[id];
		delete this.file[id];
		this.temp.splice(id, 1);
		this.file.splice(id, 1);
	}
	eliminarUrlId(id: number) {
		this.delU.push(this.url[id]);
		this.url[id] = null;

		delete this.url[id];
		this.url.splice(id, 1);
	}


	getCongreso() {
		this.congressServices.getCongress()
			.subscribe(resp => {
				const xe = resp.filter(x => x.estado === true);
				this.congreso = xe[0];
				this.getTematico(this.congreso.id);

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
	getTematico(id: number) {
		this.expositorService.getTematico(id)
			.subscribe(resp => {
				this.tematico = resp;
			});
	}


	openFile() {
		document.getElementById('file').click();
	}

	changeImg(event) {

		const file = event.target.files;
		for (const i of file) {
			const reader = new FileReader();
			reader.readAsDataURL(i);
			reader.onloadend = () => {
				this.file.push(i);
				this.temp.push(reader.result);
			};
		}

	}
	clearInputs() {
		this.expositorForm.setValue({
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
			idEjeTematico: 1,
			nombreExposicion: '',
			institucion: '',
			resumenCv: '',
			email: ''
		});
	}

}
