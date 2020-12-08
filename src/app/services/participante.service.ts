import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Programa } from '../models/programa/programa.model';
import { VideoEjeTematico } from '../models/videoejetematico/videoejetematico.model';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;
@Injectable({
	providedIn: 'root'
})
export class ParticipanteService {

	constructor(private http: HttpClient) { }

	getPrograma() {
		const url = `${base_url}/programa/todo`;
		return this.http.get(url)
			.pipe(
				map((resp: { data: Programa[] }) => resp.data)
			);
	}

	getVideoEjetematico() {
		const url = `${base_url}/videoejetematico/todo`;
		return this.http.get(url)
			.pipe(
				map((resp: { data: VideoEjeTematico[] }) => resp.data)
			);
	}
}
