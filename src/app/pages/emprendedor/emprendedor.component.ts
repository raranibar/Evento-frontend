import { Component, OnInit } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { EmprendedorService } from 'src/app/services/emprendedor.service';
import { Emprendedor } from 'src/app/models/emprendedor/emprendedor.model';
import { Foto } from 'src/app/models/emprendedor/foto.model';
import { Social } from 'src/app/models/emprendedor/social.model';
import { Persona } from '../../models/usuario/persona.model';
import swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
	selector: 'app-emprendedor',
	templateUrl: './emprendedor.component.html',
	styleUrls: ['./emprendedor.component.css']
})
export class EmprendedorComponent implements OnInit {

	public comentarioForm: FormGroup;
	rate: any = 4;

	foto: Foto[] = [];
	video: Foto;
	social: Social[] = [];
	comentario: any[] = [];

	votos: number;
	puntaje: string;


	emprendedor: Emprendedor;
	persona: Persona;
	email: string = '';
	constructor(private activatedRoute: ActivatedRoute, private emprendedorService: EmprendedorService,
		private dom: DomSanitizer, private fb: FormBuilder) {

		const id: any = this.activatedRoute.snapshot.paramMap.get('id');
		this.getEmprendedorById(id);
		this.getImagenes(id);
		this.getVideo(id);
		this.getComentar(id);
		this.getRating(id);
	}

	ngOnInit(): void {

		this.comentarioForm = this.fb.group({
			comenta: ['', Validators.required],
		});



	}

	onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
		alert(`Old Value:${$event.oldValue}, 
			New Value: ${$event.newValue}, 
			Checked Color: ${$event.starRating.checkedcolor}, 
			Unchecked Color: ${$event.starRating.uncheckedcolor}`);
	}


	getEmprendedorById(id: number) {
		this.emprendedorService.getEmprendedorById(id)
			.subscribe(resp => {
				const data = resp.emprendedor;
				this.emprendedor = data;
				this.persona = resp.persona;
				this.email = resp.email;
				this.social = resp.social;

			});
	}

	starHandler(value) {
		console.log(value)
	}
	getImagenes(id: number) {
		this.emprendedorService.getImages(id).subscribe(data => {
			this.foto = data;
		});
	}
	getVideo(id: number) {
		this.emprendedorService.getVideo(id).subscribe(data => {
			this.video = data[0];
		});
	}

	saveComentar() {
		const key = this.emprendedor.id + '#^3';
		const getKey = localStorage.getItem('cXn');
		if (getKey) {
			if (getKey.includes(key)) {
				swal.fire('', '<b>Usted ya ha realizado un comentario</b>');
				// localStorage.setItem('cXn', key);
			}
			else {
				const newKey = getKey + key + ',';
				const data = {
					idEmprendedor: this.emprendedor.id,
					...this.comentarioForm.value,
				}
				this.postComentario(data);
				localStorage.setItem('cXn', newKey);
			}
		}
		else {
			const data = {
				idEmprendedor: this.emprendedor.id,
				...this.comentarioForm.value,
			}
			this.postComentario(data);
			localStorage.setItem('cXn', key + ',');
		}
	}

	postComentario(data: any) {
		this.emprendedorService.postComentario(data)
			.subscribe(resp => {
				if (resp.exito === 1) {
					swal.fire('', '<b>Comentario realizado</b>');

					this.getComentar(this.emprendedor.id);
				}
				else {
					swal.fire('', 'error');

				}
			});

	}
	getComentar(id: number) {
		this.emprendedorService.getComentario(id)
			.subscribe(resp => {
				this.comentario = resp;
			});
	}




	/**RATING */

	procesoValor(value: number) {
		console.log(value);
		const key = this.emprendedor.id + '#^7';
		const getKey = localStorage.getItem('t998r');
		if (getKey) {
			if (getKey.includes(key)) {
				swal.fire('', '<b>Usted ya realizó un una votación</b>');
				// localStorage.setItem('cXn', key);
			}
			else {

				//MANDAR EL VALOR Y EL EMPRENDIMIENTO
				const data = {
					idEmprendedor: this.emprendedor.id,
					rating: value
				}
				this.postRating(data);
				const newKey = getKey + key + ',';
				localStorage.setItem('t998r', newKey);
			}
		}
		else {
			const data = {
				idEmprendedor: this.emprendedor.id,
				rating: value
			}
			this.postRating(data);
			localStorage.setItem('t998r', key + ',');
		}
	}

	postRating(data: any) {
		this.emprendedorService.postRating(data)
			.subscribe(resp => {
				if (resp.exito === 1) {
					swal.fire('', '<b>Votación realizada, gracias.</b>');
					this.getRating(this.emprendedor.id);
				}
				else {
					swal.fire('', 'error');


				}
			});

	}
	getRating(id: number) {
		this.emprendedorService.getRating(id)
			.subscribe(resp => {
				this.puntaje = resp.puntaje;

				if (resp.puntaje === 'NaN') {
					this.puntaje = '0';
				}
				this.votos = resp.votos;
			});
	}


}
