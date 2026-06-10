import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReporteService } from '../../services/reporte.service';
import { AuthService } from '../../services/auth.service';
import { Reporte } from '../../models/reporte.model';
import { BadgeEstadoComponent } from '../../shared/badge-estado/badge-estado.component';
import { EcoMapComponent } from '../../shared/eco-map/eco-map.component';

@Component({
  selector: 'app-validacion',
  standalone: true,
  imports: [CommonModule, FormsModule, BadgeEstadoComponent, EcoMapComponent],
  templateUrl: './validacion.component.html',
  styleUrls: ['./validacion.component.css']
})
export class ValidacionComponent implements OnInit {
  reportes: Reporte[] = [];
  reportesProcesados: Reporte[] = [];
  modalVisible = false;
  accionPendiente: 'aprobar' | 'rechazar' | null = null;
  reporteSeleccionadoId: number | null = null;
  observacion = '';
  mensajeExito = '';
  mensajeError = '';
  modalDetalleVisible = false;
  reporteDetalle: Reporte | null = null;
  reportesDetalleMapa: Reporte[] = [];
  imagenDetalleSeleccionada = '';

  get tituloModal(): string {
    return this.accionPendiente === 'aprobar' ? '¿Aprobar reporte?' : '¿Rechazar reporte?';
  }

  get mensajeModal(): string {
    return this.accionPendiente === 'aprobar'
      ? 'El reporte pasará a estado Aprobado y podrá asignarse a una cuadrilla.'
      : 'El reporte será marcado como Rechazado.';
  }

  constructor(private reporteService: ReporteService, private authService: AuthService) {}

  ngOnInit(): void {
    this.cargarReportes();
  }

  cargarReportes(): void {
    this.reportes = this.reporteService.obtenerReportesPorEstado('Pendiente');
    this.reportesProcesados = this.reporteService.obtenerReportes()
      .filter(reporte => reporte.estado === 'Aprobado' || reporte.estado === 'Rechazado')
      .slice()
      .reverse();
  }

  confirmarAccion(id: number, accion: 'aprobar' | 'rechazar'): void {
    this.cerrarDetalle();
    this.reporteSeleccionadoId = id;
    this.accionPendiente = accion;
    this.observacion = '';
    this.modalVisible = true;
  }

  ejecutarAccion(): void {
    if (this.reporteSeleccionadoId === null) return;

    this.mensajeError = '';
    if (this.accionPendiente === 'rechazar' && !this.observacion.trim()) {
      this.mensajeError = 'Indica el motivo del rechazo antes de continuar.';
      return;
    }

    const validador = this.authService.obtenerUsuarioActual()?.nombre || 'Validador';
    let accionRealizada = false;
    
    if (this.accionPendiente === 'aprobar') {
      accionRealizada = this.reporteService.aprobarReporte(
        this.reporteSeleccionadoId,
        this.observacion || 'Reporte aprobado',
        validador
      );
    } else if (this.accionPendiente === 'rechazar') {
      accionRealizada = this.reporteService.rechazarReporte(
        this.reporteSeleccionadoId,
        this.observacion,
        validador
      );
    }

    if (accionRealizada) {
      this.mensajeExito = this.accionPendiente === 'aprobar'
        ? 'Reporte aprobado correctamente.'
        : 'Reporte rechazado correctamente.';
      setTimeout(() => this.mensajeExito = '', 3000);
    }

    this.cerrarModal();
    this.cargarReportes();
  }

  cerrarModal(): void {
    this.modalVisible = false;
    this.accionPendiente = null;
    this.reporteSeleccionadoId = null;
    this.observacion = '';
    this.mensajeError = '';
  }

  abrirDetalle(reporte: Reporte): void {
    this.reporteDetalle = reporte;
    this.reportesDetalleMapa = [reporte];
    this.imagenDetalleSeleccionada = reporte.imagenes?.[0] || '/images/reporte-basura-calle.jpg';
    this.modalDetalleVisible = true;
  }

  cerrarDetalle(): void {
    this.modalDetalleVisible = false;
    this.reporteDetalle = null;
    this.reportesDetalleMapa = [];
    this.imagenDetalleSeleccionada = '';
  }

  seleccionarImagen(imagen: string): void {
    this.imagenDetalleSeleccionada = imagen;
  }
}
