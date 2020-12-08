import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


import { Emprendedor } from '../models/emprendedor/emprendedor.model';
import { Social } from '../models/emprendedor/social.model';
import { Foto } from '../models/emprendedor/foto.model';
import { MainEmprendedor } from '../models/emprendedor/emprendedor.main.model';
import { Respuesta } from '../interface/respuesta.interface';

const base_url = environment.base_url;
@Injectable({
	providedIn: 'root'
})
export class EmprendedorService {

	constructor(private http: HttpClient) { }

	actualizarEmprendedor(data: Emprendedor) {
		const url = `${base_url}/emprendedor`;
		return this.http.put(url, data)
			.pipe(
				map((resp: Respuesta) => resp)
			);
	}

	uploadImage(id: any, file: File[], imgDel: Foto[]) {

		const formData = new FormData();
		formData.append('idemprendedor', id);

		for (const i of Object.keys(file)) {
			formData.append('files', file[i]);
		}
		imgDel.forEach(x => {
			formData.append('imgDel', x.id.toString());
		});

		const url = `${base_url}/blobimage/uploadpicture`;
		return this.http.post(url, formData)
			.pipe(
				map((resp) => resp)
			);
	}

	uploadVideo(id: any, file: File, del: number) {

		const formData = new FormData();
		formData.append('idemprendedor', id);
		formData.append('files', file);
		if (del === undefined) {
			formData.append('idDel', '-1');
		}
		else {
			formData.append('idDel', del.toString());
		}


		const url = `${base_url}/blobvideo/uploadmovie`;
		return this.http.post(url, formData).pipe(
			map((resp: { path: boolean }) => resp)
		);
	}

	getVideo(id: any) {

		const url = `${base_url}/blobvideo/video?id=${id}`;
		return this.http.get(url).pipe(
			map((resp: { data: Foto }) => resp.data)
		);
	}

	getImages(id: any) {

		const url = `${base_url}/blobimage/images?id=${id}`;
		return this.http.get(url).pipe(
			map((resp: { data: Foto[] }) => resp.data)
		);
	}


	getEmprendedorById(id: number) {

		const url = `${base_url}/emprendedor/${id}`;
		return this.http.get(url)
			.pipe(
				map((resp: { data: MainEmprendedor }) => resp.data)
			);
	}


	getEmprendedorByUser(id: number) {

		const url = `${base_url}/emprendedor/user?id=${id}`;
		return this.http.get(url)
			.pipe(
				map((resp: { data: MainEmprendedor }) => resp.data)
			);
	}


	getEmprendedor(id: number) {
		const url = `${base_url}/emprendedor/todo?id=${id}`;
		return this.http.get(url)
			.pipe(
				map((resp: { data: Emprendedor[] }) => resp.data)
			);
	}

	getSocial() {
		const url = `${base_url}/social`;
		return this.http.get(url)
			.pipe(
				map((resp: { data: Social[] }) => resp.data)
			);
	}

	postComentario(data: any) {
		const url = `${base_url}/comentario`;
		return this.http.post(url, data)
			.pipe(
				map((resp: { data: any, exito: number, mensaje: string }) => resp)
			);
	}

	getComentario(id: number) {
		const url = `${base_url}/comentario?id=${id}`;
		return this.http.get(url)
			.pipe(
				map((resp: { data: any, comenta: string, id: number }) => resp.data)
			);
	}


	postRating(data: any) {
		const url = `${base_url}/raiting`;
		return this.http.post(url, data)
			.pipe(
				map((resp: { data: any, exito: number, mensaje: string }) => resp)
			);
	}

	getRating(id: number) {
		const url = `${base_url}/raiting/data?id=${id}`;
		return this.http.get(url)
			.pipe(
				map((resp: { data: any, comenta: string, id: number }) => resp.data)
			);
	}
}
