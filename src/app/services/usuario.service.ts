import { Injectable } from '@angular/core';
import { Usuario, RolUsuario } from '../models/usuario.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private authService: AuthService) {}

  obtenerUsuarios(): Usuario[] {
    return this.authService.obtenerTodosLosUsuarios();
  }

  obtenerUsuarioPorId(id: number): Usuario | undefined {
    return this.obtenerUsuarios().find(u => u.id === id);
  }

  buscarUsuarios(termino: string): Usuario[] {
    const terminoLower = termino.toLowerCase();
    return this.obtenerUsuarios().filter(u =>
      u.nombre.toLowerCase().includes(terminoLower) ||
      u.email.toLowerCase().includes(terminoLower)
    );
  }

  filtrarPorRol(rol: RolUsuario): Usuario[] {
    return this.obtenerUsuarios().filter(u => u.rol === rol);
  }

  cambiarRolUsuario(id: number, nuevoRol: RolUsuario): boolean {
    return this.authService.cambiarRolUsuario(id, nuevoRol);
  }

  activarUsuario(id: number): boolean {
    return this.authService.cambiarEstadoUsuario(id, true);
  }

  desactivarUsuario(id: number): boolean {
    return this.authService.cambiarEstadoUsuario(id, false);
  }

  agregarUsuario(usuario: Omit<Usuario, 'id'>): Usuario {
    throw new Error('Usar AuthService.registrarUsuario() en su lugar');
  }
}
