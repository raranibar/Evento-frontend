import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Tematico } from '../models/Tematico/tematico.model';
import { MainExpositor } from '../models/expositor/mainexpositor.model';
import { Expositor } from '../models/expositor/expositor.model';
import { Respuesta } from '../interface/respuesta.interface';
import { FotoExp } from '../models/expositor/fotoexp.model';


const base_url = environment.base_url;

@Injectable({
	providedIn: 'root'
})
export class ExpositorService {

	constructor(private http: HttpClient) { }

	getTematico(id: number) {
		//const url = `${base_url}/ejetematico?id=${id}`;
		const url = `${base_url}/ejetematico/${id}`;
		return this.http.get(url)
			.pipe(
				map((resp: { data: Tematico[] }) => resp.data)
			);
	}

	getTematicoTodo() {
		const url = `${base_url}/ejetematico/todo/`;
		return this.http.get(url)
			.pipe(
				map((resp: { data: Tematico[] }) => resp.data)
			);
	}

	postExpositor(data: any) {
		const url = `${base_url}/expositor`;
		return this.http.post(url, data).pipe(
			map((resp: Respuesta) => resp)
		);
	}

	putExpositor(data: any) {
		const url = `${base_url}/expositor`;
		return this.http.put(url, data)
			.pipe(
				map((resp: Respuesta) => resp)
			);
	}



	getExpositorById(id: number) {

		const url = `${base_url}/expositor/${id}`;
		return this.http.get(url)
			.pipe(
				map((resp: { data: MainExpositor }) => resp.data)
			);
	}



	getExpositores() {

		const url = `${base_url}/expositor/personaexpositor`;
		return this.http.get(url)
			.pipe(
				map((resp: { data: Expositor[] }) => resp.data)
			);
	}

	getExpositoresByEje(id: number) {

		const url = `${base_url}/expositor/eje?id=${id}`;
		return this.http.get(url)
			.pipe(
				map((resp: { data: Expositor[] }) => resp.data)
			);
	}

	deleteExpositor(id: number) {
		const url = `${base_url}/expositor/${id}`;
		return this.http.delete(url)
			.pipe(
				map((resp: Respuesta) => resp)
			);
	}

	getFotoExp(id: number) {
		const url = `${base_url}/blobimage/expositor?id=${id}`;
		return this.http.get(url)
			.pipe(
				map((resp: { exito: boolean, data: FotoExp }) => resp)
			);
	}

	uploadImage(id: any, file: File[], imgDel: FotoExp[]) {

		// const formData = new FormData();
		// formData.append('idExpositor', id);
		// formData.append('files', file);
		// if (del === undefined) {
		// 	formData.append('idDel', '-1');
		// }
		// else {
		// 	formData.append('idDel', del.toString());
		// }

		// const url = `${base_url}/blobimage/uploadexp`;
		// return this.http.post(url, formData)
		// 	.pipe(
		// 		map((resp: any) => resp)
		// 	);

		const formData = new FormData();
		formData.append('idExpositor', id);

		for (const i of Object.keys(file)) {
			formData.append('files', file[i]);
		}
		imgDel.forEach(x => {
			formData.append('imgDel', x.id.toString());
		});

		const url = `${base_url}/blobimage/uploadexp`;
		return this.http.post(url, formData)
			.pipe(
				map((resp: any) => resp)
			);

	}


}
