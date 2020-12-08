import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';



import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario/usuario.model';
import { Pais, Ciudad } from '../models/usuario/pais.model';
import { Clasificador } from '../models/usuario/clasificador.model';
import { MainUsuario } from '../models/usuario/mainusuario.model';
import { Persona } from '../models/usuario/persona.model';
import { Respuesta } from '../interface/respuesta.interface';


const base_url = environment.base_url;
@Injectable({
	providedIn: 'root'
})
export class UsuarioService {

	globalU: Usuario;
	tempG: Usuario;


	constructor(private http: HttpClient, private router: Router) {
	}

	get token(): string {
		return localStorage.getItem('token') || '';
	}
	get role() {
		return this.globalU.idRol;
	}
	postUsuario(data: Usuario) {

		const url = `${base_url}/account/register`;
		return this.http.post(url, data)
			.pipe(
				map((resp: Respuesta) => resp)
			);

	}

	updateUsuario(data: Usuario) {
		const url = `${base_url}/account/update`;
		return this.http.put(url, data)
			.pipe(
				map((resp: Respuesta) => resp)
			);
	}

	guardarLocalStorage(token: string) {
		localStorage.setItem('token', token);
	}

	login(data: { login: string, password: string }) {

		const url = `${base_url}/account/verify`;
		return this.http.post(url, data)
			.pipe(
				tap((resp: Respuesta) => {
					if (resp.exito) {
						this.guardarLocalStorage(resp.data);
					}
				})
			);
	}



	getUsuarioById(id: number) {

		const url = `${base_url}/account/${id}`;
		return this.http.get(url)
			.pipe(
				map((resp: { data: MainUsuario }) => resp.data)
			);
	}



	getPersonaById(id: number) {

		const url = `${base_url}/persona/${id}`;
		return this.http.get(url)
			.pipe(
				map((resp: { data: Persona }) => resp.data)
			);
	}


	validateToken(): Observable<boolean> {
		const url = `${base_url}/account/verifytoken`;

		return this.http.get(url, {
			headers: {
				token: this.token
			}
		})
			.pipe(
				map((resp: Respuesta) => {
					const { idRol, email } = resp.data;
					this.globalU = new Usuario(resp.data.idUsuario, email, 0, +idRol);
					return true;
				}), catchError(error => of(false))
			);
	}

	logout() {
		// this.globalU = this.tempG;
		localStorage.removeItem('token');
		localStorage.removeItem('usuario');
		this.router.navigateByUrl('/login');
	}



	getCountry() {
		const url = `${base_url}/pais`;
		return this.http.get(url)
			.pipe(
				map((resp: { data: Pais[] }) => resp.data)
			);
	}

	getCity(id: number) {
		const url = `${base_url}/pais/ciudad/?id=${id}`;
		return this.http.get(url)
			.pipe(
				map((resp: { data: Ciudad[] }) => resp.data)
			);
	}

	getDocumento() {
		const url = `${base_url}/clasificador/documento`;
		return this.http.get(url)
			.pipe(
				map((resp: { data: Clasificador[] }) => resp.data)
			);
	}

	getGenero() {
		const url = `${base_url}/clasificador/genero`;
		return this.http.get(url)
			.pipe(
				map((resp: { data: Clasificador[] }) => resp.data)
			);
	}
}
