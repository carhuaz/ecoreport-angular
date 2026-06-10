import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReporteService } from '../../services/reporte.service';
import { AuthService } from '../../services/auth.service';
import { Reporte, Distrito, PrioridadReporte } from '../../models/reporte.model';
import { ImageUploaderComponent } from '../../shared/image-uploader/image-uploader.component';
import { EcoMapComponent, UbicacionMapa } from '../../shared/eco-map/eco-map.component';

@Component({
  selector: 'app-reportar',
  standalone: true,
  imports: [FormsModule, CommonModule, ImageUploaderComponent, EcoMapComponent],
  templateUrl: './reportar.component.html',
  styleUrls: ['./reportar.component.css']
})
export class ReportarComponent {
  titulo = '';
  descripcion = '';
  distrito: Distrito = 'Huancayo';
  direccion = '';
  prioridad: PrioridadReporte = 'Media';
  imagenes: string[] = [];
  latitud?: number;
  longitud?: number;
  error = '';
  exito = false;

  constructor(
    private reporteService: ReporteService,
    private authService: AuthService,
    private router: Router
  ) {}

  enviar(): void {
    this.error = '';
    if (
      !this.titulo ||
      !this.descripcion ||
      !this.direccion ||
      this.imagenes.length === 0 ||
      this.latitud === undefined ||
      this.longitud === undefined
    ) {
      this.error = 'Completa los campos, agrega una imagen y selecciona la ubicación en el mapa.';
      return;
    }

    const nuevoReporte: Omit<Reporte, 'id' | 'fecha' | 'historial'> = {
      titulo: this.titulo,
      descripcion: this.descripcion,
      distrito: this.distrito,
      direccion: this.direccion,
      estado: 'Pendiente',
      prioridad: this.prioridad,
      puntajePrioridad: 5,
      criteriosPrioridad: [],
      imagenes: this.imagenes,
      ciudadano: this.authService.obtenerUsuarioActual()?.nombre || 'Ciudadano',
      latitud: this.latitud,
      longitud: this.longitud
    };

    this.reporteService.agregarReporte(nuevoReporte);
    this.exito = true;
    setTimeout(() => this.router.navigate(['/mis-reportes']), 1500);
  }

  onImagenesChange(imagenes: string[]): void {
    this.imagenes = imagenes;
  }

  onUbicacionChange(ubicacion: UbicacionMapa): void {
    this.latitud = ubicacion.latitud;
    this.longitud = ubicacion.longitud;
  }
}
