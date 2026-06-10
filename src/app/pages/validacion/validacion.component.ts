import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReporteService } from '../../services/reporte.service';
import { AuthService } from '../../services/auth.service';
import { Reporte } from '../../models/reporte.model';
import { BadgeEstadoComponent } from '../../shared/badge-estado/badge-estado.component';

@Component({
  selector: 'app-validacion',
  standalone: true,
  imports: [CommonModule, FormsModule, BadgeEstadoComponent],
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
}
