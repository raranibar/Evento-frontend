import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Categoria } from '../models/categoria/categoria.model';



const base_url = environment.base_url;

@Injectable({
	providedIn: 'root'
})
export class CategoriaService {

	constructor(private http: HttpClient) { }

	get token(): string {
		return localStorage.getItem('token') || '';
	}

	get headers() {
		return {
			headers: {
				'x-token': this.token
			}
		};
	}

	getCategory() {

		const url = `${base_url}/categoria`;
		return this.http.get(url )
			.pipe(
				map((resp: { data: Categoria[] }) => resp.data)
			);
	}

}
