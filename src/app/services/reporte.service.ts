import { Injectable } from '@angular/core';
import { Reporte, EstadoReporte, PrioridadReporte, HistorialReporte, Distrito } from '../models/reporte.model';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private readonly reportesStorageKey = 'ecoreport_reportes';
  private reportes: Reporte[] = [
    {
      id: 1,
      titulo: 'Acumulación de basura en Av. Francisca de la Calle',
      descripcion: 'Bolsas de plástico y residuos acumulados en la vereda',
      distrito: 'Huancayo',
      direccion: 'Av. Francisca de la Calle, cuadra 8',
      estado: 'Pendiente',
      prioridad: 'Alta',
      puntajePrioridad: 9,
      criteriosPrioridad: ['Varias bolsas acumuladas', 'Bloqueo de vereda', 'Cercanía a viviendas'],
      fecha: '2024-01-10',
      latitud: -12.0704,
      longitud: -75.2129,
      imagenes: ['data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22150%22%3E%3Crect fill=%22%23ccc%22 width=%22200%22 height=%22150%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3EImagen 1%3C/text%3E%3C/svg%3E'],
      ciudadano: 'Juan Pérez',
      historial: [
        { fecha: '2024-01-10', accion: 'Reporte creado', usuario: 'Juan Pérez' }
      ]
    },
    {
      id: 2,
      titulo: 'Desmonte en riberas del río Shullcas',
      descripcion: 'Gran cantidad de desmonte y residuos de construcción',
      distrito: 'Huancayo',
      direccion: 'Ribera norte, Parque Constitución',
      estado: 'Aprobado',
      prioridad: 'Crítica',
      puntajePrioridad: 13,
      criteriosPrioridad: ['Gran acumulación', 'Cercanía a río', 'Residuos peligrosos'],
      fecha: '2024-01-08',
      latitud: -12.0671,
      longitud: -75.2154,
      imagenes: ['data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22150%22%3E%3Crect fill=%22%23ddd%22 width=%22200%22 height=%22150%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3EImagen 2%3C/text%3E%3C/svg%3E'],
      ciudadano: 'Ciudadano Anónimo',
      historial: [
        { fecha: '2024-01-08', accion: 'Reporte creado', usuario: 'Ciudadano Anónimo' },
        { fecha: '2024-01-09', accion: 'Aprobado', usuario: 'Validador 1', observacion: 'Situación crítica confirmada' }
      ]
    },
    {
      id: 3,
      titulo: 'Basura frente a restaurante Sabores Huancas',
      descripcion: 'Acumulación de residuos de alimentos y empaques',
      distrito: 'Huancayo',
      direccion: 'Jr. Real, zona comercial',
      estado: 'Programado',
      prioridad: 'Media',
      puntajePrioridad: 6,
      criteriosPrioridad: ['Varias bolsas', 'Malos olores', 'Zona concurrida'],
      fecha: '2024-01-07',
      latitud: -12.0687,
      longitud: -75.2104,
      imagenes: ['data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22150%22%3E%3Crect fill=%22%23eee%22 width=%22200%22 height=%22150%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3EImagen 3%3C/text%3E%3C/svg%3E'],
      ciudadano: 'María Gómez',
      cuadrillaAsignada: 'Cuadrilla A',
      historial: [
        { fecha: '2024-01-07', accion: 'Reporte creado', usuario: 'María Gómez' },
        { fecha: '2024-01-08', accion: 'Aprobado', usuario: 'Validador 2' },
        { fecha: '2024-01-09', accion: 'Programado', usuario: 'Admin' }
      ]
    },
    {
      id: 4,
      titulo: 'Residuos cerca de la Universidad Continental',
      descripcion: 'Bolsas y cartones esparcidos alrededor del campus',
      distrito: 'El Tambo',
      direccion: 'Av. San Fernando, esq. Tomás Marsano',
      estado: 'Rechazado',
      prioridad: 'Baja',
      puntajePrioridad: 2,
      criteriosPrioridad: ['Poca basura'],
      fecha: '2024-01-06',
      latitud: -12.0596,
      longitud: -75.2269,
      imagenes: ['data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22150%22%3E%3Crect fill=%22%23f5f5f5%22 width=%22200%22 height=%22150%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3EImagen 4%3C/text%3E%3C/svg%3E'],
      ciudadano: 'Ciudadano Anónimo',
      observacionValidacion: 'La cantidad de residuos no justifica intervención inmediata',
      historial: [
        { fecha: '2024-01-06', accion: 'Reporte creado', usuario: 'Ciudadano Anónimo' },
        { fecha: '2024-01-07', accion: 'Rechazado', usuario: 'Validador 1', observacion: 'Insuficiente evidencia' }
      ]
    },
    {
      id: 5,
      titulo: 'Botadero informal en mercado central',
      descripcion: 'Acumulación de residuos orgánicos e inorgánicos detrás de puestos',
      distrito: 'Huancayo',
      direccion: 'Mercado Central, zona posterior',
      estado: 'Atendido',
      prioridad: 'Alta',
      puntajePrioridad: 10,
      criteriosPrioridad: ['Gran acumulación', 'Malos olores', 'Animales presentes', 'Zona concurrida'],
      fecha: '2024-01-05',
      latitud: -12.0723,
      longitud: -75.2149,
      imagenes: ['data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22150%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22200%22 height=%22150%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3EImagen 5%3C/text%3E%3C/svg%3E'],
      ciudadano: 'Comerciante anónimo',
      cuadrillaAsignada: 'Cuadrilla B',
      historial: [
        { fecha: '2024-01-05', accion: 'Reporte creado', usuario: 'Comerciante anónimo' },
        { fecha: '2024-01-06', accion: 'Aprobado', usuario: 'Validador 2' },
        { fecha: '2024-01-08', accion: 'Atendido', usuario: 'Cuadrilla B' }
      ]
    },
    {
      id: 6,
      titulo: 'Bolsas acumuladas en Jr. Puno con Jr. Lima',
      descripcion: 'Residuos acumulados en esquina por falta de limpieza',
      distrito: 'Huancayo',
      direccion: 'Jr. Puno con Jr. Lima, cuadra 3',
      estado: 'En atención',
      prioridad: 'Media',
      puntajePrioridad: 5,
      criteriosPrioridad: ['Varias bolsas', 'Bloqueo de vereda'],
      fecha: '2024-01-09',
      latitud: -12.0714,
      longitud: -75.2120,
      imagenes: ['data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22150%22%3E%3Crect fill=%22%23efefef%22 width=%22200%22 height=%22150%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3EImagen 6%3C/text%3E%3C/svg%3E'],
      ciudadano: 'Juan Pérez',
      cuadrillaAsignada: 'Cuadrilla A',
      historial: [
        { fecha: '2024-01-09', accion: 'Reporte creado', usuario: 'Juan Pérez' },
        { fecha: '2024-01-09', accion: 'Aprobado', usuario: 'Validador 1' },
        { fecha: '2024-01-10', accion: 'En atención', usuario: 'Cuadrilla A' }
      ]
    },
    {
      id: 7,
      titulo: 'Desmonte cerca de parque Constitución',
      descripcion: 'Residuos de construcción esparcidos',
      distrito: 'Huancayo',
      direccion: 'Parque Constitución, lado sur',
      estado: 'Verificado',
      prioridad: 'Alta',
      puntajePrioridad: 8,
      criteriosPrioridad: ['Gran acumulación', 'Cercanía a área verde'],
      fecha: '2024-01-01',
      latitud: -12.0671,
      longitud: -75.2154,
      imagenes: ['data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22150%22%3E%3Crect fill=%22%23e8e8e8%22 width=%22200%22 height=%22150%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3EImagen 7%3C/text%3E%3C/svg%3E'],
      ciudadano: 'Ciudadano Anónimo',
      cuadrillaAsignada: 'Cuadrilla C',
      historial: [
        { fecha: '2024-01-01', accion: 'Reporte creado', usuario: 'Ciudadano Anónimo' },
        { fecha: '2024-01-02', accion: 'Aprobado', usuario: 'Validador 1' },
        { fecha: '2024-01-03', accion: 'Atendido', usuario: 'Cuadrilla C' },
        { fecha: '2024-01-04', accion: 'Verificado', usuario: 'Admin' }
      ]
    },
    {
      id: 8,
      titulo: 'Residuos orgánicos en zona comercial de Chilca',
      descripcion: 'Restos de alimentos y basura esparcida',
      distrito: 'Chilca',
      direccion: 'Sector comercial, Av. Principal',
      estado: 'Pendiente',
      prioridad: 'Media',
      puntajePrioridad: 7,
      criteriosPrioridad: ['Varias bolsas', 'Malos olores', 'Zona concurrida'],
      fecha: '2024-01-09',
      latitud: -12.0542,
      longitud: -75.1945,
      imagenes: ['data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22150%22%3E%3Crect fill=%22%23e0e0e0%22 width=%22200%22 height=%22150%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3EImagen 8%3C/text%3E%3C/svg%3E'],
      ciudadano: 'Comerciante',
      historial: [
        { fecha: '2024-01-09', accion: 'Reporte creado', usuario: 'Comerciante' }
      ]
    },
    {
      id: 9,
      titulo: 'Botadero en El Tambo',
      descripcion: 'Acumulación grande de residuos en terreno baldío',
      distrito: 'El Tambo',
      direccion: 'Terreno baldío, zona norte',
      estado: 'Aprobado',
      prioridad: 'Crítica',
      puntajePrioridad: 12,
      criteriosPrioridad: ['Gran acumulación', 'Residuos peligrosos', 'Animales presentes'],
      fecha: '2024-01-08',
      latitud: -12.0580,
      longitud: -75.2280,
      imagenes: ['data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22150%22%3E%3Crect fill=%22%23d8d8d8%22 width=%22200%22 height=%22150%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3EImagen 9%3C/text%3E%3C/svg%3E'],
      ciudadano: 'María Gómez',
      historial: [
        { fecha: '2024-01-08', accion: 'Reporte creado', usuario: 'María Gómez' },
        { fecha: '2024-01-08', accion: 'Aprobado', usuario: 'Validador 2' }
      ]
    },
    {
      id: 10,
      titulo: 'Maleza y basura en Chilca centro',
      descripcion: 'Acumulación mixta de maleza y residuos',
      distrito: 'Chilca',
      direccion: 'Centro comercial de Chilca',
      estado: 'Programado',
      prioridad: 'Baja',
      puntajePrioridad: 4,
      criteriosPrioridad: ['Poca basura', 'Zona concurrida'],
      fecha: '2024-01-09',
      latitud: -12.0510,
      longitud: -75.1980,
      imagenes: ['data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22150%22%3E%3Crect fill=%22%23d0d0d0%22 width=%22200%22 height=%22150%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3EImagen 10%3C/text%3E%3C/svg%3E'],
      ciudadano: 'Ciudadano Anónimo',
      cuadrillaAsignada: 'Cuadrilla D',
      historial: [
        { fecha: '2024-01-09', accion: 'Reporte creado', usuario: 'Ciudadano Anónimo' },
        { fecha: '2024-01-09', accion: 'Aprobado', usuario: 'Validador 1' },
        { fecha: '2024-01-10', accion: 'Programado', usuario: 'Admin' }
      ]
    }
  ];

  constructor() {
    const reportesGuardados = localStorage.getItem(this.reportesStorageKey);
    if (reportesGuardados) {
      try {
        const reportes = JSON.parse(reportesGuardados) as Reporte[];
        if (Array.isArray(reportes)) {
          this.reportes = reportes;
          this.actualizarImagenesDemo();
          return;
        }
      } catch {
        localStorage.removeItem(this.reportesStorageKey);
      }
    }

    this.actualizarImagenesDemo();
    this.guardarReportes();
  }

  private actualizarImagenesDemo(): void {
    let huboCambios = false;

    this.reportes.forEach(reporte => {
      const usaImagenDemoAnterior = !reporte.imagenes?.length ||
        reporte.imagenes[0].startsWith('data:image/svg+xml') ||
        reporte.imagenes[0].includes('images.unsplash.com');

      if (usaImagenDemoAnterior) {
        reporte.imagenes = [this.obtenerImagenDemo(reporte)];
        huboCambios = true;
      }
    });

    if (huboCambios) {
      this.guardarReportes();
    }
  }

  private obtenerImagenDemo(reporte: Reporte): string {
    if (reporte.id === 2 || reporte.id === 7) {
      return '/images/reporte-rio-shullcas.jpg';
    }

    if (reporte.estado === 'Atendido' || reporte.estado === 'Verificado') {
      return '/images/reporte-limpieza-atendida.jpg';
    }

    return '/images/reporte-basura-calle.jpg';
  }

  private guardarReportes(): void {
    localStorage.setItem(this.reportesStorageKey, JSON.stringify(this.reportes));
  }

  obtenerReportes(): Reporte[] {
    return [...this.reportes];
  }

  obtenerReportesPublicos(): Reporte[] {
    return this.reportes.filter(reporte =>
      reporte.estado !== 'Pendiente' && reporte.estado !== 'Rechazado'
    );
  }

  obtenerReportePorId(id: number): Reporte | undefined {
    return this.reportes.find(r => r.id === id);
  }

  obtenerReportesPorEstado(estado: EstadoReporte): Reporte[] {
    return this.reportes.filter(r => r.estado === estado);
  }

  obtenerReportesPorDistrito(distrito: Distrito): Reporte[] {
    return this.reportes.filter(r => r.distrito === distrito);
  }

  obtenerReportesPorCiudadano(ciudadano: string): Reporte[] {
    return this.reportes.filter(r => r.ciudadano === ciudadano);
  }

  agregarReporte(reporte: Omit<Reporte, 'id' | 'fecha' | 'historial'>): Reporte {
    const nuevoReporte: Reporte = {
      ...reporte,
      id: Math.max(...this.reportes.map(r => r.id), 0) + 1,
      fecha: new Date().toISOString().split('T')[0],
      historial: [
        {
          fecha: new Date().toISOString().split('T')[0],
          accion: 'Reporte creado',
          usuario: reporte.ciudadano || 'Ciudadano Anónimo'
        }
      ]
    };
    this.reportes.push(nuevoReporte);
    this.guardarReportes();
    return nuevoReporte;
  }

  aprobarReporte(id: number, observacion: string, validador: string): boolean {
    const reporte = this.reportes.find(r => r.id === id);
    if (!reporte) {
      return false;
    }
    reporte.estado = 'Aprobado';
    if (reporte.historial) {
      reporte.historial.push({
        fecha: new Date().toISOString().split('T')[0],
        accion: 'Aprobado',
        usuario: validador,
        observacion
      });
    }
    this.guardarReportes();
    return true;
  }

  rechazarReporte(id: number, observacion: string, validador: string): boolean {
    const reporte = this.reportes.find(r => r.id === id);
    if (!reporte) {
      return false;
    }
    reporte.estado = 'Rechazado';
    reporte.observacionValidacion = observacion;
    if (reporte.historial) {
      reporte.historial.push({
        fecha: new Date().toISOString().split('T')[0],
        accion: 'Rechazado',
        usuario: validador,
        observacion
      });
    }
    this.guardarReportes();
    return true;
  }

  corregirPrioridad(
    id: number,
    nuevaPrioridad: PrioridadReporte,
    observacion: string,
    validador: string
  ): boolean {
    const reporte = this.reportes.find(r => r.id === id);
    if (!reporte) {
      return false;
    }
    reporte.prioridad = nuevaPrioridad;
    reporte.prioridadCorregida = true;
    reporte.observacionPrioridad = observacion;
    if (reporte.historial) {
      reporte.historial.push({
        fecha: new Date().toISOString().split('T')[0],
        accion: 'Prioridad corregida',
        usuario: validador,
        observacion
      });
    }
    this.guardarReportes();
    return true;
  }

  asignarCuadrilla(id: number, cuadrilla: string, usuario: string): boolean {
    const reporte = this.reportes.find(r => r.id === id);
    if (!reporte) {
      return false;
    }
    reporte.cuadrillaAsignada = cuadrilla;
    reporte.estado = 'Programado';
    if (reporte.historial) {
      reporte.historial.push({
        fecha: new Date().toISOString().split('T')[0],
        accion: 'Asignado a cuadrilla',
        usuario,
        observacion: `Asignado a ${cuadrilla}`
      });
    }
    this.guardarReportes();
    return true;
  }

  marcarEnAtencion(id: number, usuario: string): boolean {
    const reporte = this.reportes.find(r => r.id === id);
    if (!reporte) {
      return false;
    }
    reporte.estado = 'En atención';
    if (reporte.historial) {
      reporte.historial.push({
        fecha: new Date().toISOString().split('T')[0],
        accion: 'En atención',
        usuario
      });
    }
    this.guardarReportes();
    return true;
  }

  marcarAtendido(id: number, usuario: string): boolean {
    const reporte = this.reportes.find(r => r.id === id);
    if (!reporte) {
      return false;
    }
    reporte.estado = 'Atendido';
    if (reporte.historial) {
      reporte.historial.push({
        fecha: new Date().toISOString().split('T')[0],
        accion: 'Atendido',
        usuario
      });
    }
    this.guardarReportes();
    return true;
  }

  marcarVerificado(id: number, usuario: string): boolean {
    const reporte = this.reportes.find(r => r.id === id);
    if (!reporte) {
      return false;
    }
    reporte.estado = 'Verificado';
    if (reporte.historial) {
      reporte.historial.push({
        fecha: new Date().toISOString().split('T')[0],
        accion: 'Verificado',
        usuario
      });
    }
    this.guardarReportes();
    return true;
  }

  calcularPrioridadAsistida(respuestas: Record<string, boolean | number>): { prioridad: PrioridadReporte; puntaje: number; criterios: string[] } {
    let puntaje = 0;
    const criterios: string[] = [];

    // Cantidad de basura
    if (respuestas['cantidad'] === 1) {
      puntaje += 1;
      criterios.push('Poca basura');
    } else if (respuestas['cantidad'] === 2) {
      puntaje += 2;
      criterios.push('Varias bolsas acumuladas');
    } else if (respuestas['cantidad'] === 3) {
      puntaje += 3;
      criterios.push('Gran acumulación de basura o desmonte');
    }

    // Malos olores
    if (respuestas['malosOlores']) {
      puntaje += 2;
      criterios.push('Malos olores');
    }

    // Animales
    if (respuestas['animales']) {
      puntaje += 3;
      criterios.push('Presencia de animales, insectos o roedores');
    }

    // Cercanía a lugares concurridos
    if (respuestas['cercania']) {
      puntaje += 3;
      criterios.push('Cercanía a viviendas, colegios, mercados, restaurantes o zonas concurridas');
    }

    // Cercanía a agua
    if (respuestas['agua']) {
      puntaje += 3;
      criterios.push('Cercanía a río, canal, acequia o área verde');
    }

    // Bloqueo de vereda
    if (respuestas['bloqueo']) {
      puntaje += 3;
      criterios.push('Bloqueo de vereda, pista o zona de tránsito');
    }

    // Residuos peligrosos
    if (respuestas['peligroso']) {
      puntaje += 4;
      criterios.push('Residuos peligrosos o sospechosos');
    }

    // Imagen clara
    if (respuestas['imagenClara']) {
      puntaje += 1;
      criterios.push('Imagen clara como evidencia');
    }

    let prioridad: PrioridadReporte = 'Baja';
    if (puntaje >= 12) {
      prioridad = 'Crítica';
    } else if (puntaje >= 8) {
      prioridad = 'Alta';
    } else if (puntaje >= 4) {
      prioridad = 'Media';
    } else {
      prioridad = 'Baja';
    }

    return { prioridad, puntaje, criterios };
  }
}
