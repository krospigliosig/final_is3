from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings

def enviar_correo_activacion(user, enlace):
    asunto = "Activa tu cuenta en inventar.IO"
    contenido_plano = f"""
Hola, {user.username}

Has intentado registrarte en inventar.IO a través de este correo electrónico.
Activa tu cuenta haciendo clic al enlace: {enlace}

Si no fuiste tú, puedes ignorar este mensaje.

inventar.IO

Este es un correo enviado automáticamente. Por favor, no responda a este correo.
    """.strip()
    destino = [user.email]

    html = render_to_string('usuario/activation_mail.html', {
        'user': user,
        'enlace': enlace
    })

    mensaje = EmailMultiAlternatives(
        subject=asunto,
        body=contenido_plano,
        to=destino
    )
    mensaje.attach_alternative(html, "text/html")
    mensaje.send(fail_silently=False)

def enviar_email_bienvenida(user):
    asunto = "¡Registro exitoso!"
    contenido_plano = f"""
¡Bienvenido a inventar.IO, {user.username}!

Te dejamos un manual con todo lo que puedes hacer desde tu nueva cuenta:

- Explora los artículos recreativos disponibles
    Navega entre las diferentes categorías y echa un vistazo a los artículos disponibles
- Reserva artículos ya o espera a que estén disponibles
    Si un artículo se encuentra reservado, puedes reservarlo para la fecha en que vuelva a estar disponible
- Revisa tu historial de artículos reservados
    Descarga tu registro de reservas desde la pestaña "Historial"

¡Recuerda seguir las reglas de uso de tu institución para evitar sanciones! (archivo adjunto)

inventar.IO

Este es un correo enviado automáticamente. Por favor, no responda a este correo.
    """.strip()
    
    destino = [user.email]

    html = render_to_string('usuario/welcome_mail.html', {
        'user': user
    })

    mensaje = EmailMultiAlternatives(
        subject=asunto,
        body=contenido_plano,
        to=destino,
    )
    mensaje.attach_alternative(html, "text/html")
    mensaje.attach_file("E:\\ing_software\\ing_software_3\\docs\\dominio\\reglas_uso.jpg")

    mensaje.send()
