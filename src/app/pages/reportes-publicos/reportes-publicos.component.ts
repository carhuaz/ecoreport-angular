import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Distrito, EstadoReporte, Reporte } from '../../models/reporte.model';
import { ReporteService } from '../../services/reporte.service';
import { BadgeEstadoComponent } from '../../shared/badge-estado/badge-estado.component';

@Component({
  selector: 'app-reportes-publicos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, BadgeEstadoComponent],
  templateUrl: './reportes-publicos.component.html',
  styleUrls: ['./reportes-publicos.component.css']
})
export class ReportesPublicosComponent implements OnInit {
  reportes: Reporte[] = [];
  reportesFiltrados: Reporte[] = [];
  distrito: Distrito | '' = '';
  estado: EstadoReporte | '' = '';

  constructor(private reporteService: ReporteService) {}

  ngOnInit(): void {
    this.reportes = this.reporteService.obtenerReportesPublicos();
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    this.reportesFiltrados = this.reportes.filter(reporte =>
      (!this.distrito || reporte.distrito === this.distrito) &&
      (!this.estado || reporte.estado === this.estado)
    );
  }
}
