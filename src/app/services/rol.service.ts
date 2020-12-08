import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Rol } from '../models/usuario/rol.model';



const base_url = environment.base_url;


@Injectable({
	providedIn: 'root'
})
export class RolService {

	constructor(private http: HttpClient) { }

	getRole() {
		const url = `${base_url}/rol`;
		return this.http.get(url)
			.pipe(
				map((resp: { data: Rol[] }) => resp.data)
			);
	}
}
