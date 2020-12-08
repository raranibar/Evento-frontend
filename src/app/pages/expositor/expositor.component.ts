import { Component, OnInit } from '@angular/core';
import { Expositor } from 'src/app/models/expositor/expositor.model';
import { ExpositorService } from '../../services/expositor.service';
import { Tematico } from '../../models/Tematico/tematico.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { FotoExp } from '../../models/expositor/fotoexp.model';
import { Persona } from '../../models/usuario/persona.model';
import { DataExpositor } from '../../models/expositor/dataexpositor.model';

@Component({
	selector: 'app-expositor',
	templateUrl: './expositor.component.html',
	styleUrls: ['./expositor.component.css']
})
export class ExpositorComponent implements OnInit {

	expositor: Expositor[] = [];
	expId: Expositor;
	tematico: Tematico[] = [];
	public expoForm: FormGroup;

	dataExpo: DataExpositor[] = [];
	constructor(private expositorService: ExpositorService,
		private usuarioService: UsuarioService, private fb: FormBuilder) { }

	ngOnInit(): void {
		this.expoForm = this.fb.group({
			idExpo: [1, Validators.required],
		});
		this.getTematico();
		this.getExpositoresEje(1);
	}

	async getExpositoresEje(e: any) {

		let id: any = e;
		if (e !== 1) {
			const value: string = e.target.value;
			const idA = value.split(' ')[1];
			id = +idA;
		}
		this.expositorService.getExpositoresByEje(id)
			.subscribe(resp => {
				this.expositor = resp;
			});
	}

	mostrarExp(i: number) {
		this.expId = this.expositor[i];
	}

	getFotoExp(id: number) {
		return this.expositorService.getFotoExp(id)
			.subscribe(resp => {
				// console.log(resp);
			});
	}
	getPersonaById(id: number) {
		return this.usuarioService.getPersonaById(id)
			.subscribe(resp => {
				// console.log(resp);
			});
	}

	getTematico() {
		this.expositorService.getTematico(1)
			.subscribe(resp => {
				this.tematico = resp;
			});
	}

}
