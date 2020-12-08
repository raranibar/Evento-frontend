import { Component, OnInit } from '@angular/core';
import { Programa } from 'src/app/models/programa/programa.model';
import { Tematico } from 'src/app/models/Tematico/tematico.model';
import { ParticipanteService } from '../../services/participante.service';
import { ExpositorService } from '../../services/expositor.service';
import { UsuarioService } from '../../services/usuario.service';
import { CongresoService } from '../../services/congreso.service';
import { Congreso } from 'src/app/models/congreso/congreso.model';
import { repeat } from 'rxjs/operators';

@Component({
	selector: 'app-programa',
	templateUrl: './programa.component.html',
	styleUrls: ['./programa.component.css']
})
export class ProgramaComponent implements OnInit {

	programaList: Programa[] = [];
	programa: Programa[] = [];

	// tematico: Tematico[] = [];
	congreso: Congreso;

	idx: any[] = [];
	nPro: Tematico[] = [];

	constructor(private participanteService: ParticipanteService,
		private expositorService: ExpositorService,
		private congresoServices: CongresoService) { }


	ngOnInit(): void {
		this.getCongreso();

		this.getPrograma();
	}
	getPrograma() {
		this.participanteService.getPrograma()
			.subscribe((resp) => {
				this.programaList = resp;
				let c = resp[0].idEjeTematico;
				this.idx.push(c);
				resp.forEach(x => {
					if (c !== x.idEjeTematico) {
						this.idx.push(x.idEjeTematico);
						c = x.idEjeTematico;
					}
				});

			});
	}

	filtrarEje(id: number) {
		this.programa = this.programaList.filter(x => x.idEjeTematico === id);
	}

	getTematico(id: number) {
		this.expositorService.getTematico(id)
			.subscribe((resp) => {
				this.idx.forEach(x => {
					resp.forEach(y => {
						if (x === y.id) {
							this.nPro.push(y);
						}
					});
				});
			});
	}

	getCongreso() {
		this.congresoServices.getCongress()
			.subscribe(resp => {
				const xe = resp.filter(x => x.estado === true);
				this.congreso = xe[0];
				this.getTematico(this.congreso.id);
			});
	}

	descargar() {
		let blob = new Blob(['https://ciceblob2020.blob.core.windows.net/images/programacice2020.pdf'], { type: 'application/pdf' });
		let fileUrl = window.URL.createObjectURL(blob);
		if (window.navigator.msSaveOrOpenBlob) {
			window.navigator.msSaveOrOpenBlob(blob, fileUrl.split(':')[1] + '.pdf');
		} else {
			window.open(fileUrl);
		}
	}

}
