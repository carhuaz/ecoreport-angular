import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReporteService } from '../../services/reporte.service';
import { AuthService } from '../../services/auth.service';
import { Reporte } from '../../models/reporte.model';
import { CardReporteComponent } from '../../shared/card-reporte/card-reporte.component';

@Component({
  selector: 'app-mis-reportes',
  standalone: true,
  imports: [CommonModule, RouterLink, CardReporteComponent],
  templateUrl: './mis-reportes.component.html',
  styleUrls: ['./mis-reportes.component.css']
})
export class MisReportesComponent implements OnInit {
  reportes: Reporte[] = [];

  constructor(
    private reporteService: ReporteService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const ciudadano = this.authService.obtenerUsuarioActual()?.nombre;
    this.reportes = ciudadano
      ? this.reporteService.obtenerReportesPorCiudadano(ciudadano)
      : [];
  }
}
