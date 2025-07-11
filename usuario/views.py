from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.http import JsonResponse
from django_ratelimit.decorators import ratelimit
from .forms import RegistroUsuarioForm

# Create your views here.
def index(request):
    return render(request, "usuario/index.html")

def registrar_usuario(request):
    if request.method == 'POST':
        form = RegistroUsuarioForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            user.set_password(form.cleaned_data['password'])
            user.save()

            return redirect('index')
    else: 
        form = RegistroUsuarioForm()
    
    return render(request, 'usuario/registro.html', {'form': form})

# @ratelimit(key='ip', rate='5/m', block=True)
def validar_email_ajax(request):
    email = request.GET.get('email', '').strip().lower()

    if not email.endswith('@institucion.edu'):
        return JsonResponse({'valido': False, 'mensaje': 'El correo debe ser institucional.'})

    if User.objects.filter(email=email).exists():
        return JsonResponse({'valido': False, 'mensaje': 'Correo inválido.'})

    return JsonResponse({'valido': True})