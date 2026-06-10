import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteService } from '../../services/reporte.service';
import { Reporte } from '../../models/reporte.model';
import { CardReporteComponent } from '../../shared/card-reporte/card-reporte.component';
import { EcoMapComponent } from '../../shared/eco-map/eco-map.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardReporteComponent, EcoMapComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  reportes: Reporte[] = [];

  // KPIs
  get total()      { return this.reportes.length; }
  get pendientes() { return this.reportes.filter(r => r.estado === 'Pendiente').length; }
  get programados(){ return this.reportes.filter(r => r.estado === 'Programado').length; }
  get atendidos()  { return this.reportes.filter(r => r.estado === 'Atendido').length; }

  constructor(private reporteService: ReporteService) {}

  ngOnInit(): void {
    this.reportes = this.reporteService.obtenerReportes();
  }
}
