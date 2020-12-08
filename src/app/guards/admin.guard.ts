import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
	providedIn: 'root'
})
export class AdminGuard implements CanActivate {
	constructor(private usuarioService: UsuarioService, private router: Router) {

	}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot) {

		if (this.usuarioService.globalU.idRol === 1) {
			return true;
		} else {
			this.router.navigateByUrl('/admin');
			return false;
		}

	}
}
