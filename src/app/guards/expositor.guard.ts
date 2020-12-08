import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ExpositorGuard implements CanActivate {
	constructor(private usuarioService: UsuarioService, private router: Router) {

	}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot) {
		if (this.usuarioService.role === 3 || this.usuarioService.role === 1) {
			return true;
		} else {
			this.router.navigateByUrl('/admin');
			return false;
		}

	}
}
