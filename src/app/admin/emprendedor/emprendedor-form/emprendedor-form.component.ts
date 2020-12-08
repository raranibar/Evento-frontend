import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import swal from 'sweetalert2';



import { EmprendedorService } from '../../../services/emprendedor.service';
import { Categoria } from '../../../models/categoria/categoria.model';
import { CategoriaService } from '../../../services/categoria.service';
import { Emprendedor } from '../../../models/emprendedor/emprendedor.model';
import { Social } from '../../../models/emprendedor/social.model';
import { Foto } from 'src/app/models/emprendedor/foto.model';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from 'src/app/models/usuario/usuario.model';


@Component({
	selector: 'app-emprendedor-form',
	templateUrl: './emprendedor-form.component.html',
	styleUrls: ['./emprendedor-form.component.css']

})
export class EmprendedorFormComponent implements OnInit {

	public emprendedorForm: FormGroup;

	urlV: Foto;
	urlSupp: File;

	emprendedor: Emprendedor;
	category: Categoria[] = [];
	social: Social[] = [];
	video: File;

	url: Foto[] = [];
	delU: Foto[] = [];
	temp: any[] = [];
	file: File[] = [];
	messageV: string;
	global: Usuario;

	constructor(private fb: FormBuilder,
		private emprendedorService: EmprendedorService,
		private categoriaService: CategoriaService,
		private usuarioService: UsuarioService) {
		this.global = this.usuarioService.globalU;
	}

	ngOnInit(): void {

		this.emprendedorForm = this.fb.group({
			idCategoria: [1, Validators.required],
			nombreEmprendimiento: ['', Validators.required],
			descripcion: ['', Validators.required],
			ubicacion: ['', Validators.required],
		});
		this.getCategory();

		if (this.global.idRol !== 1) {

			this.getEmprendedorByUser(this.global.id);
			this.getSocial(this.global.id);

		}
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

	getCategory() {
		this.categoriaService.getCategory()
			.subscribe(resp => {
				this.category = resp;
			});
	}

	getEmprendedorByUser(id: number) {

		this.emprendedorService.getEmprendedorByUser(id)
			.subscribe(resp => {
				const data = resp.emprendedor;
				this.social = resp.social;
				this.emprendedor = data;

				const { nombreEmprendimiento, idCategoria, descripcion, ubicacion } = data;
				this.emprendedorForm.setValue({ nombreEmprendimiento, idCategoria, descripcion, ubicacion });
				this.getImages(this.emprendedor.id);
				this.getVideo(this.emprendedor.id);


			});
	}


	updateEmprendedor() {
		if (this.url.length + this.file.length <= 6) {

			const data = {
				...this.emprendedorForm.value,
				id: this.emprendedor.id,
				latitud: 'lat',
				longitud: 'lng',
				idpersona: this.emprendedor.idPersona,
				EmprendedorRedSocial: this.social,
			};

			this.emprendedorService.uploadImage(this.emprendedor.id, this.file, this.delU)
				.subscribe(resp => {
					if (resp) {
						this.url = [];
						this.temp = [];
						this.delU = [];
						this.file = [];
						this.getImages(this.emprendedor.id);
					}
				});
			if (this.video !== undefined) {
				this.messageV = 'Subiendo Video...';
				this.emprendedorService.uploadVideo(this.emprendedor.id, this.video, this.urlV?.id)
					.subscribe(resp => {
						if (resp.path) {
							this.messageV = '';
							this.deleteVideo();
							this.getVideo(this.emprendedor.id);
						}
					});
			}

			swal.fire('Actualizando Emprendimiento');
			swal.showLoading();
			this.emprendedorService.actualizarEmprendedor(data)
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
			swal.fire({
				position: 'center',
				icon: 'error',
				title: 'Solo se permiten 6 imagenes',
				showConfirmButton: false,
				timer: 1500
			});
		}
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

	getImages(id: number) {
		this.emprendedorService.getImages(id)
			.subscribe(resp => {
				this.url = resp;
			});
	}
	getVideo(id: number) {
		this.emprendedorService.getVideo(id)
			.subscribe(resp => {
				this.urlV = resp[0];
			});
	}

	getSocial(id: number) {
		this.emprendedorService.getSocial()
			.subscribe(resp => {
				this.social = resp;
				this.social.forEach(x => {
					x.idEmprendedor = id;
					x.idRedSocial = x.id;
				});
			});
	}

	setVideo(e) {
		this.video = e.target.files[0];
	}

	deleteVideo() {
		this.video = this.urlSupp;
	}

	changeText(id: number, e) {
		this.social[id].direccion = e.target.value;
		// this.social[id].idRedSocial = this.social[id].id;
		// this.social[id].nombre =e.value
	}

	openFile() {
		document.getElementById('file').click();
	}
	openVideo() {
		document.getElementById('video').click();
	}


}
