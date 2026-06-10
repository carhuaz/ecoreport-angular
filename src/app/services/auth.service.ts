import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly usuariosStorageKey = 'ecoreport_usuarios';
  private readonly sesionStorageKey = 'ecoreport_sesion';
  private usuarioActual: Usuario | null = null;
  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);
  public usuario$: Observable<Usuario | null> = this.usuarioSubject.asObservable();

  private readonly usuariosIniciales: Usuario[] = [
    { 
      id: 1, 
      nombre: 'Juan Pérez', 
      email: 'ciudadano@ecoreport.pe', 
      password: '123456', 
      rol: 'Ciudadano',
      activo: true,
      fechaRegistro: '2024-01-15'
    },
    { 
      id: 2, 
      nombre: 'Ciudadano 2', 
      email: 'ciudadano2@ecoreport.pe', 
      password: '123456', 
      rol: 'Ciudadano',
      activo: true,
      fechaRegistro: '2024-02-10'
    },
    { 
      id: 3, 
      nombre: 'María Gómez', 
      email: 'ciudadano3@ecoreport.pe', 
      password: '123456', 
      rol: 'Ciudadano',
      activo: true,
      fechaRegistro: '2024-03-05'
    },
    { 
      id: 4, 
      nombre: 'Validador 1', 
      email: 'validador1@ecoreport.pe', 
      password: '123456', 
      rol: 'Validador',
      activo: true,
      fechaRegistro: '2023-12-01'
    },
    { 
      id: 5, 
      nombre: 'Validador 2', 
      email: 'validador2@ecoreport.pe', 
      password: '123456', 
      rol: 'Validador',
      activo: true,
      fechaRegistro: '2023-11-15'
    },
    { 
      id: 6, 
      nombre: 'Admin Municipal', 
      email: 'admin@ecoreport.pe', 
      password: '123456', 
      rol: 'Administrador',
      activo: true,
      fechaRegistro: '2023-10-01'
    }
  ];
  private usuariosSimulados: Usuario[] = [];

  constructor() {
    this.usuariosSimulados = this.cargarUsuarios();
    this.cargarSesionGuardada();
  }

  private cargarUsuarios(): Usuario[] {
    const usuariosGuardados = localStorage.getItem(this.usuariosStorageKey);
    if (usuariosGuardados) {
      try {
        const usuarios = JSON.parse(usuariosGuardados) as Usuario[];
        if (Array.isArray(usuarios) && usuarios.length > 0) {
          return usuarios;
        }
      } catch {
        localStorage.removeItem(this.usuariosStorageKey);
      }
    }

    const usuarios = this.usuariosIniciales.map(usuario => ({ ...usuario }));
    localStorage.setItem(this.usuariosStorageKey, JSON.stringify(usuarios));
    return usuarios;
  }

  private cargarSesionGuardada(): void {
    const usuarioGuardado = localStorage.getItem(this.sesionStorageKey);
    if (usuarioGuardado) {
      try {
        const sesion = JSON.parse(usuarioGuardado) as Usuario;
        const usuario = this.usuariosSimulados.find(
          item => item.id === sesion.id && item.activo
        );

        if (usuario) {
          this.establecerSesion(usuario);
          return;
        }
      } catch {
        localStorage.removeItem(this.sesionStorageKey);
      }
    }

    this.cerrarSesionLocal();
  }

  private guardarUsuarios(): void {
    localStorage.setItem(this.usuariosStorageKey, JSON.stringify(this.usuariosSimulados));
  }

  private obtenerUsuarioSeguro(usuario: Usuario): Usuario {
    const { password: _, ...usuarioSeguro } = usuario;
    return usuarioSeguro as Usuario;
  }

  private establecerSesion(usuario: Usuario): void {
    this.usuarioActual = this.obtenerUsuarioSeguro(usuario);
    localStorage.setItem(this.sesionStorageKey, JSON.stringify(this.usuarioActual));
    this.usuarioSubject.next(this.usuarioActual);
  }

  private cerrarSesionLocal(): void {
    this.usuarioActual = null;
    localStorage.removeItem(this.sesionStorageKey);
    this.usuarioSubject.next(null);
  }

  login(email: string, password: string): boolean {
    const emailNormalizado = email.trim().toLowerCase();
    const usuario = this.usuariosSimulados.find(
      u => u.email.toLowerCase() === emailNormalizado && u.password === password && u.activo
    );
    if (usuario) {
      this.establecerSesion(usuario);
      return true;
    }
    return false;
  }

  logout(): void {
    this.cerrarSesionLocal();
  }

  estaAutenticado(): boolean {
    return this.usuarioActual !== null;
  }

  obtenerUsuarioActual(): Usuario | null {
    return this.usuarioActual;
  }

  obtenerRutaInicial(): string {
    switch (this.usuarioActual?.rol) {
      case 'Validador':
        return '/validacion';
      case 'Administrador':
      case 'Ciudadano':
        return '/dashboard';
      default:
        return '/login';
    }
  }

  registrarUsuario(nombre: string, email: string, password: string): boolean {
    const emailNormalizado = email.trim().toLowerCase();
    const yaExiste = this.usuariosSimulados.some(
      u => u.email.toLowerCase() === emailNormalizado
    );
    if (yaExiste) {
      return false;
    }

    const nuevoUsuario: Usuario = {
      id: Math.max(...this.usuariosSimulados.map(u => u.id), 0) + 1,
      nombre: nombre.trim(),
      email: emailNormalizado,
      password,
      rol: 'Ciudadano',
      activo: true,
      fechaRegistro: new Date().toISOString().split('T')[0]
    };
    this.usuariosSimulados.push(nuevoUsuario);
    this.guardarUsuarios();
    return true;
  }

  obtenerTodosLosUsuarios(): Usuario[] {
    return this.usuariosSimulados.map(u => this.obtenerUsuarioSeguro(u));
  }

  cambiarRolUsuario(idUsuario: number, nuevoRol: 'Ciudadano' | 'Validador' | 'Administrador'): boolean {
    const usuario = this.usuariosSimulados.find(u => u.id === idUsuario);
    if (usuario) {
      usuario.rol = nuevoRol;
      this.guardarUsuarios();

      if (this.usuarioActual?.id === idUsuario) {
        this.establecerSesion(usuario);
      }
      return true;
    }
    return false;
  }

  cambiarEstadoUsuario(idUsuario: number, activo: boolean): boolean {
    const usuario = this.usuariosSimulados.find(u => u.id === idUsuario);
    if (!usuario || (this.usuarioActual?.id === idUsuario && !activo)) {
      return false;
    }

    usuario.activo = activo;
    this.guardarUsuarios();
    return true;
  }
}
