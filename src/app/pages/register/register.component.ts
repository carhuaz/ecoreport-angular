import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nombre = '';
  email = '';
  password = '';
  confirmPassword = '';
  error = '';
  exito = false;

  constructor(private router: Router, private authService: AuthService) {}

  registrar(): void {
    this.error = '';
    
    if (!this.nombre || !this.email || !this.password || !this.confirmPassword) {
      this.error = 'Completa todos los campos.';
      return;
    }

    if (this.password.length < 6) {
      this.error = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Las contraseñas no coinciden.';
      return;
    }

    // Registrar usuario automáticamente como Ciudadano
    const registroExitoso = this.authService.registrarUsuario(this.nombre, this.email, this.password);
    
    if (!registroExitoso) {
      this.error = 'Este correo electrónico ya está registrado.';
      return;
    }

    this.exito = true;
    setTimeout(() => this.router.navigate(['/login']), 1500);
  }
}
