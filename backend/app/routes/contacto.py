import random
from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from ..database import execute_returning_id
from ..email_service import _enviar, SMTP_USER

router = APIRouter(prefix="/api/contacto", tags=["Contacto"])


class ContactoRequest(BaseModel):
    nombre: str
    email: str
    asunto: str
    mensaje: str


def _construir_acuse_html(nombre: str, codigo: str) -> str:
    return f"""\
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Recibimos tu mensaje – EcoReport</title>
</head>
<body style="margin:0;padding:0;background:#f4f7f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="480" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:#16803c;padding:32px;text-align:center;">
              <span style="font-size:40px;">🌿</span>
              <h1 style="color:#fff;margin:8px 0 0;font-size:22px;">EcoReport Huancayo</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <h2 style="color:#1f2937;font-size:18px;margin:0 0 8px;">Hola, <strong>{nombre}</strong></h2>
              <p style="color:#6b7280;font-size:14px;line-height:1.6;margin:0 0 20px;">
                Gracias por escribirnos. Hemos recibido tu mensaje y lo hemos registrado con el siguiente código de atención:
              </p>
              <div style="text-align:center;margin:24px 0;">
                <span style="display:inline-block;background:#f3f4f6;border-radius:12px;padding:16px 32px;font-size:32px;font-weight:800;letter-spacing:4px;color:#16803c;font-family:Arial,sans-serif;">{codigo}</span>
              </div>
              <p style="color:#6b7280;font-size:14px;line-height:1.6;">
                Nuestro equipo revisará tu solicitud y te responderá a la brevedad. Si tienes más información que agregar, puedes responder directamente a este correo.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#f9fafb;padding:16px 32px;text-align:center;">
              <span style="color:#9ca3af;font-size:11px;">
                EcoReport – Plataforma ciudadana de reportes ambientales<br>
                Municipalidad Provincial de Huancayo
              </span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>"""


def _construir_notificacion_html(nombre: str, email: str, asunto: str, mensaje: str) -> str:
    return f"""\
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Nuevo mensaje de contacto</title>
</head>
<body style="margin:0;padding:0;background:#f4f7f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="480" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:#16803c;padding:32px;text-align:center;">
              <span style="font-size:40px;">📬</span>
              <h1 style="color:#fff;margin:8px 0 0;font-size:22px;">Nuevo mensaje de contacto</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#374151;">
                <tr><td style="padding:4px 0;"><strong style="color:#6b7280;">Remitente:</strong> {nombre}</td></tr>
                <tr><td style="padding:4px 0;"><strong style="color:#6b7280;">Email:</strong> {email}</td></tr>
                <tr><td style="padding:4px 0;"><strong style="color:#6b7280;">Asunto:</strong> {asunto}</td></tr>
                <tr><td style="padding:16px 0 4px;"><strong style="color:#6b7280;">Mensaje:</strong></td></tr>
                <tr><td style="padding:8px 16px;background:#f9fafb;border-radius:8px;color:#374151;line-height:1.6;white-space:pre-wrap;">{mensaje}</td></tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#f9fafb;padding:16px 32px;text-align:center;">
              <span style="color:#9ca3af;font-size:11px;">
                EcoReport – Plataforma ciudadana de reportes ambientales
              </span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>"""


def _enviar_acuse(nombre: str, destinatario: str, codigo: str) -> None:
    try:
        _enviar(destinatario, "EcoReport – Hemos recibido tu mensaje", _construir_acuse_html(nombre, codigo))
    except Exception as exc:
        print(f"[contacto] Error enviando acuse a {destinatario}: {exc}")


def _enviar_notificacion(nombre: str, email: str, asunto_contacto: str, mensaje: str) -> None:
    try:
        _enviar(SMTP_USER, f"Nuevo mensaje de contacto: {nombre} - {asunto_contacto}",
                _construir_notificacion_html(nombre, email, asunto_contacto, mensaje))
    except Exception as exc:
        print(f"[contacto] Error enviando notificación: {exc}")


@router.post("")
def enviar_contacto(req: ContactoRequest, background_tasks: BackgroundTasks):
    if not req.nombre.strip():
        raise HTTPException(status_code=400, detail="El nombre es obligatorio")
    if not req.email.strip() or "@" not in req.email:
        raise HTTPException(status_code=400, detail="Correo electrónico inválido")
    if not req.mensaje.strip():
        raise HTTPException(status_code=400, detail="El mensaje es obligatorio")

    codigo = f"ECO-{random.randint(100000, 999999)}"

    execute_returning_id(
        "INSERT INTO contactos (codigo, nombre, email, asunto, mensaje) OUTPUT INSERTED.id VALUES (?, ?, ?, ?, ?)",
        (codigo, req.nombre.strip(), req.email.strip().lower(), req.asunto, req.mensaje.strip())
    )

    background_tasks.add_task(_enviar_acuse, req.nombre.strip(), req.email.strip().lower(), codigo)
    background_tasks.add_task(_enviar_notificacion, req.nombre.strip(), req.email.strip().lower(), req.asunto, req.mensaje.strip())

    return {"codigo": codigo, "mensaje": "Mensaje registrado con éxito"}
