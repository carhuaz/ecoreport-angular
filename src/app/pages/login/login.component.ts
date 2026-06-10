import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  exito = false;

  constructor(private authService: AuthService, private router: Router) {}

  ingresar(): void {
    this.error = '';
    if (!this.email || !this.password) {
      this.error = 'Completa todos los campos.';
      return;
    }
    const ok = this.authService.login(this.email, this.password);
    if (ok) {
      this.exito = true;
      setTimeout(() => this.router.navigate([this.authService.obtenerRutaInicial()]), 700);
    } else {
      this.error = 'Correo o contraseña incorrectos, o el usuario está inactivo.';
    }
  }
}
