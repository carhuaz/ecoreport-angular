import { Injectable } from '@angular/core';
import { Cuadrilla } from '../models/cuadrilla.model';
import { ReporteService } from './reporte.service';

@Injectable({
  providedIn: 'root'
})
export class CuadrillaService {
  private cuadrillas: Cuadrilla[] = [
    {
      id: 1,
      nombre: 'Cuadrilla A',
      responsable: 'Roberto Silva',
      estado: 'Disponible',
      zonaAsignada: 'Huancayo Centro',
      distrito: 'Huancayo',
      reportesAsignados: [3, 6]
    },
    {
      id: 2,
      nombre: 'Cuadrilla B',
      responsable: 'Miriam Flores',
      estado: 'En ruta',
      zonaAsignada: 'El Tambo',
      distrito: 'El Tambo',
      reportesAsignados: [5]
    },
    {
      id: 3,
      nombre: 'Cuadrilla C',
      responsable: 'Pedro Huanca',
      estado: 'Ocupada',
      zonaAsignada: 'Chilca',
      distrito: 'Chilca',
      reportesAsignados: [7]
    },
    {
      id: 4,
      nombre: 'Cuadrilla D',
      responsable: 'Carlos Mendoza',
      estado: 'Disponible',
      zonaAsignada: 'Río Shullcas',
      distrito: 'Huancayo',
      reportesAsignados: [10]
    }
  ];

  constructor(private reporteService: ReporteService) {}

  obtenerCuadrillas(): Cuadrilla[] {
    return [...this.cuadrillas];
  }

  obtenerCuadrillaPorId(id: number): Cuadrilla | undefined {
    return this.cuadrillas.find(c => c.id === id);
  }

  obtenerCuadrillasPorDistrito(distrito: string): Cuadrilla[] {
    return this.cuadrillas.filter(c => c.distrito === distrito);
  }

  obtenerCuadrillasDisponibles(): Cuadrilla[] {
    return this.cuadrillas.filter(c => c.estado === 'Disponible');
  }

  asignarCuadrilla(reporteId: number, cuadrillaId: number): boolean {
    const cuadrilla = this.cuadrillas.find(c => c.id === cuadrillaId);
    if (!cuadrilla) {
      return false;
    }
    
    // Asignar a la cuadrilla
    if (!cuadrilla.reportesAsignados.includes(reporteId)) {
      cuadrilla.reportesAsignados.push(reporteId);
      // Cambiar estado a En ruta si tiene reportes
      if (cuadrilla.reportesAsignados.length > 0) {
        cuadrilla.estado = 'En ruta';
      }
    }

    // Asignar reporte a cuadrilla
    const nombreCuadrilla = cuadrilla.nombre;
    this.reporteService.asignarCuadrilla(reporteId, nombreCuadrilla, 'Admin');
    
    return true;
  }

  asignarReporte(cuadrillaId: number, reporteId: number): boolean {
    return this.asignarCuadrilla(reporteId, cuadrillaId);
  }

  obtenerTotalReportesAsignados(cuadrillaId: number): number {
    const cuadrilla = this.cuadrillas.find(c => c.id === cuadrillaId);
    return cuadrilla ? cuadrilla.reportesAsignados.length : 0;
  }
}
