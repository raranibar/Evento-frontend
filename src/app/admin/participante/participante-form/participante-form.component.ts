import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Clasificador } from 'src/app/models/usuario/clasificador.model';
import { Ciudad, Pais } from 'src/app/models/usuario/pais.model';
import { CongresoService } from 'src/app/services/congreso.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import swal from 'sweetalert2';

@Component({
	selector: 'app-participante-form',
	templateUrl: './participante-form.component.html',
})
export class ParticipanteFormComponent implements OnInit {

	public expositorForm: FormGroup;
	country: Pais[] = [];
	city: Ciudad[] = [];
	documento: Clasificador[] = [];
	genero: Clasificador[] = [];
	tematico: any[] = [];
	mainExpositor: any;
	congreso: any;
	foto: File;
	stateForm = true;
	global: any;



	constructor(private fb: FormBuilder, private usuarioService: UsuarioService,
		private congressServices: CongresoService,
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
		if (this.stateForm) {
			const data = {
				...this.expositorForm.value,
			};
			swal.fire('Registrando Expositor...');
			swal.showLoading();

			// this.expositorService.postExpositor(data)
			// 	.subscribe(resp => {
			// 		this.uploadImage(resp.data, false);

			// 		if (resp.exito) {
			// 			this.clearInputs();
			// 			this.clearList();
			// 			swal.fire({
			// 				position: 'center',
			// 				icon: 'success',
			// 				title: resp.mensaje,
			// 				showConfirmButton: false,
			// 				timer: 1500
			// 			});
			// 		}
			// 		else {
			// 			swal.fire('', resp.mensaje, 'error');
			// 		}
			// 	});
		}
		else {
			swal.fire('Modificando Expositor...');
			swal.showLoading();
			this.updateExpositor();
		}

	}




	getExpositorById(id: number) {

		// this.expositorService.getExpositorById(id)
		// 	.subscribe(resp => {
		// 		this.mainExpositor = resp;
		// 		const { nombres, paterno, materno, fono, direccion, idTipoDocumento,
		// 			idPais, idCiudad, idGenero, numDocumento } = resp.persona;
		// 		const { idEjeTematico, nombreExposicion, institucion, resumenCv } = resp.expositor;
		// 		this.expositorForm.setValue({
		// 			nombres, paterno, materno, fono, direccion,
		// 			idTipoDocumento, idPais, idCiudad, idGenero, numDocumento,
		// 			idEjeTematico, nombreExposicion, institucion, resumenCv
		// 		});
		// 		this.getImage(resp.expositor.id);
		// 	});

	}

	updateExpositor() {
		const data = {
			id: this.mainExpositor.expositor.id,
			idPersona: this.mainExpositor.expositor.idPersona,
			...this.expositorForm.value,
		};

		// this.expositorService.putExpositor(data)
		// 	.subscribe(resp => {
		// 		if (resp.exito) {
		// 			this.updatePersona();

		// 		}
		// 		else {
		// 			swal.fire('', resp.mensaje, 'error');
		// 		}
		// 	});

	}


	updatePersona() {
		const data = {
			id: this.mainExpositor.persona.id,
			...this.expositorForm.value,
		};
			this.usuarioService.updateUsuario(data)
				.subscribe(resp => {

					if (resp.exito) {
						swal.fire({
							position: 'center',
							icon: 'success',
							title: 'Expositor modificado correctamente',
							showConfirmButton: false,
							timer: 1500
						});
					}
					else {
						swal.fire('', resp.mensaje, 'error');
					}
				});
	
	}


	getCongreso() {
		this.congressServices.getCongress()
			.subscribe(resp => {
				const xe = resp.filter(x => x.estado === true);
				this.congreso = xe[0];

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
			resumenCv: ''
		});
	}

}
