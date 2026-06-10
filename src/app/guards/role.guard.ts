import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RolUsuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.estaAutenticado()) {
      this.router.navigate(['/login']);
      return false;
    }

    const usuario = this.authService.obtenerUsuarioActual();
    if (!usuario) {
      this.router.navigate(['/login']);
      return false;
    }

    const rolesRequeridos = route.data['roles'] as RolUsuario[];
    if (rolesRequeridos && !rolesRequeridos.includes(usuario.rol)) {
      this.router.navigate(['/acceso-denegado']);
      return false;
    }

    return true;
  }
}
