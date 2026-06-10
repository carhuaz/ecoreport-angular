import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reporte } from '../../models/reporte.model';

@Component({
  selector: 'app-badge-estado',
  standalone: true,
  imports: [CommonModule],
  template: `<span class="badge" [ngClass]="clase">{{ estado }}</span>`,
  styles: [`
    .badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 999px;
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.3px;
    }
    .pendiente  { background: #fee2e2; color: #dc2626; }
    .aprobado   { background: #dbeafe; color: #2563eb; }
    .programado { background: #fef3c7; color: #d97706; }
    .atendido   { background: #dcfce7; color: #16803c; }
    .rechazado  { background: #f3f4f6; color: #6b7280; }
  `]
})
export class BadgeEstadoComponent {
  @Input() estado: Reporte['estado'] = 'Pendiente';

  get clase(): string {
    return this.estado.toLowerCase();
  }
}
