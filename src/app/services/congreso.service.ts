import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Congreso } from '../models/congreso/congreso.model';



const base_url = environment.base_url;

@Injectable({
	providedIn: 'root'
})
export class CongresoService {

	constructor(private http: HttpClient) { }

	get token(): string {
		return localStorage.getItem('token') || '';
	}

	get headers() {
		return {
			headers: {
				Authorization: `Bearer ${this.token}`
			}
		};
	}


	getCongress() {
		const url = `${base_url}/congreso`;
		return this.http.get(url, this.headers)
			.pipe(
				map((resp: { data: Congreso[] }) => resp.data)
			);
	}

}
