import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoEjeTematico } from 'src/app/models/videoejetematico/videoejetematico.model';
import { Tematico } from 'src/app/models/Tematico/tematico.model';
import { ParticipanteService } from '../../services/participante.service';
import { ExpositorService } from '../../services/expositor.service';
import { UsuarioService } from '../../services/usuario.service';
import { CongresoService } from '../../services/congreso.service';
import { Congreso } from 'src/app/models/congreso/congreso.model';
import { repeat } from 'rxjs/operators';

@Component({
  selector: 'app-videoejetematico',
  templateUrl: './videoejetematico.component.html',
  styleUrls: ['./videoejetematico.component.css']
})
export class VideoejetematicoComponent implements OnInit {

  videoEjetematicoList: VideoEjeTematico[] = [];
  videoEjeTematico: VideoEjeTematico[] = [];
  congreso: Congreso;
  idx: any[] = [];
	nPro: Tematico[] = [];

	constructor(private participanteService: ParticipanteService,
		private expositorService: ExpositorService,
		private congresoServices: CongresoService,
		private _sanitizer: DomSanitizer
		) { }

  ngOnInit(): void {
    this.getCongreso();
    this.getVideoEjeTematico();
  }

  getVideoEjeTematico() {
		this.participanteService.getVideoEjetematico()
			.subscribe((resp) => {
				this.videoEjetematicoList = resp;
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
		this.videoEjeTematico = this.videoEjetematicoList.filter(x => x.idEjeTematico === id);
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

  getTematicoTodo() {
		this.expositorService.getTematicoTodo()
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
				//this.getTematico(this.congreso.id);
				this.getTematicoTodo();
			});
	}
	getVideoIframe(url) {
		var video, results;
		if (url === null) {
			return '';
		}
		results = url.match('[\\?&]v=([^&#]*)');
		video   = (results === null) ? url : results[1];
		return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
	}
}
