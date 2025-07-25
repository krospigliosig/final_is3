from django.contrib.auth.models import User
from django.contrib import messages
from django.http import JsonResponse
from django_ratelimit.decorators import ratelimit
from django.contrib.auth import authenticate, login, logout

from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse

from .forms import RegistroUsuarioForm
from .utils import generar_token_activacion, verificar_token_activacion
from .mail import enviar_correo_activacion

from articulo.models import Articulo
# Create your views here.
def index(request):
    return render(request, "usuario/login.html")

def registrar_usuario(request):
    if request.method == 'POST':
        form = RegistroUsuarioForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            user.set_password(form.cleaned_data['password'])
            user.save()

            token = generar_token_activacion(user)
            enlace = request.build_absolute_uri(reverse('usuario:activar_cuenta', args=[token]))

            enviar_correo_activacion(user, enlace)
            # TODO: cambiar los messages.success por vistas HTML
            messages.success(request, 'Registro exitoso. Revisa tu correo para activar tu cuenta.')

            return redirect('usuario:index')
    else: 
        form = RegistroUsuarioForm()
    
    return render(request, 'usuario/register.html', {'form': form})

# @ratelimit(key='ip', rate='5/m', block=True)
def validar_email_ajax(request):
    email = request.GET.get('email', '').strip().lower()

    if not email.endswith('@unsa.edu.pe'):
        return JsonResponse({'valido': False, 'mensaje': 'El correo debe ser institucional.'})

    if User.objects.filter(email=email).exists():
        return JsonResponse({'valido': False, 'mensaje': 'Correo inválido.'})

    return JsonResponse({'valido': True})

def activar_cuenta(request, token):
    user_id = verificar_token_activacion(token)

    if user_id is None:
        messages.error(request, "Enlace de activación inválido o expirado")
        return redirect('usuario:   index')
    
    user = get_object_or_404(User, pk=user_id)

    if user.is_active:
        messages.info(request,"Esta cuenta ya se encuentra activa")
    else:
        user.is_active = True
        user.save()
        # TODO: cambiar los messages.success por vistas HTML
        messages.success(request,"La cuenta se ha verificado y ahora está activa. Puede acceder a todas las funcionalidades iniciando sesión.")
    
    return redirect('usuario:index')


def login_usuario(request):
    if request.method == 'POST':
        email    = request.POST.get('email', '').strip().lower()
        password = request.POST.get('password', '')

        # Buscamos al usuario por email para luego autenticar por username
        try:
            user_obj = User.objects.get(email=email)
        except User.DoesNotExist:
            messages.error(request, 'Usuario no encontrado.')
            return redirect('usuario:index')

        user = authenticate(username=user_obj.username, password=password)
        if user:
            if user.is_active:
                login(request, user)
                return redirect('usuario:home')
            else:
                messages.warning(request, 'Cuenta no activada.')
        else:
            messages.error(request, 'Contraseña incorrecta.')

    return render(request, 'usuario/login.html')


def logout_usuario(request):
    logout(request)
    return redirect('usuario:index')


def home(request):
    articulos = Articulo.objects.all()
    return render(request, 'usuario/home.html', {'articulos': articulos})