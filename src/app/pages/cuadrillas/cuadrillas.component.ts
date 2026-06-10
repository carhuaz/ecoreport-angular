import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReporteService } from '../../services/reporte.service';
import { CuadrillaService } from '../../services/cuadrilla.service';
import { Reporte } from '../../models/reporte.model';
import { Cuadrilla } from '../../models/cuadrilla.model';
import { BadgeEstadoComponent } from '../../shared/badge-estado/badge-estado.component';

@Component({
  selector: 'app-cuadrillas',
  standalone: true,
  imports: [CommonModule, FormsModule, BadgeEstadoComponent],
  templateUrl: './cuadrillas.component.html',
  styleUrls: ['./cuadrillas.component.css']
})
export class CuadrillasComponent implements OnInit {
  reportesAprobados: Reporte[] = [];
  cuadrillas: Cuadrilla[] = [];
  seleccion: { [reporteId: number]: number } = {};
  mensajeExito: string | null = null;

  constructor(
    private reporteService: ReporteService,
    private cuadrillaService: CuadrillaService
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.reportesAprobados = this.reporteService.obtenerReportesPorEstado('Aprobado');
    this.cuadrillas = this.cuadrillaService.obtenerCuadrillas();
  }

  asignar(reporteId: number): void {
    const cuadrillaId = this.seleccion[reporteId];
    if (!cuadrillaId) return;
    this.cuadrillaService.asignarCuadrilla(reporteId, cuadrillaId);
    this.mensajeExito = 'Cuadrilla asignada correctamente. El reporte ahora está Programado.';
    this.cargar();
    setTimeout(() => this.mensajeExito = null, 3000);
  }
}
