import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReporteService } from '../../services/reporte.service';
import { BadgeEstadoComponent } from '../../shared/badge-estado/badge-estado.component';

interface ValidacionItem {
  id: number;
  reporte_id: number;
  fecha: string;
  accion: string;
  usuario_id: string;
  observacion: string;
  titulo: string;
  distrito: string;
  prioridad: string;
  estado_reporte: string;
  validador_nombre: string | null;
}

@Component({
  selector: 'app-admin-auditoria',
  standalone: true,
  imports: [CommonModule, FormsModule, BadgeEstadoComponent],
  templateUrl: './admin-auditoria.component.html',
  styleUrls: ['./admin-auditoria.component.css']
})
export class AdminAuditoriaComponent implements OnInit {
  validaciones: ValidacionItem[] = [];

  page = 1;
  pageSize = 20;
  total = 0;
  totalPages = 0;

  get desde(): number { return (this.page - 1) * this.pageSize + 1; }
  get hasta(): number { return Math.min(this.page * this.pageSize, this.total); }

  constructor(private reporteService: ReporteService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.reporteService.obtenerAuditoriaValidaciones(this.page, this.pageSize).subscribe(res => {
      this.validaciones = res.items;
      this.total = res.total;
      this.totalPages = res.total_pages;
    });
  }

  irPagina(p: number): void {
    if (p < 1 || p > this.totalPages) return;
    this.page = p;
    this.cargar();
  }

  paginas(): number[] {
    const paginas: number[] = [];
    const inicio = Math.max(1, this.page - 2);
    const fin = Math.min(this.totalPages, this.page + 2);
    for (let i = inicio; i <= fin; i++) paginas.push(i);
    return paginas;
  }
}
