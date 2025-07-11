from django import forms
from django.contrib.auth.models import User

class RegistroUsuarioForm(forms.ModelForm):
    username = forms.CharField(
        max_length=32,
        required=True,
        widget=forms.Textarea(attrs={'placeholder': 'Nombre de usuario'})
    )
    email = forms.EmailField(
        required=True,
        widget=forms.EmailInput(attrs={'placeholder': 'usuario@unsa.edu.pe'})
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Contraseña'}),
        required=True
    )
    password2 = forms.CharField(
        label="Confirmar contraseña",
        widget=forms.PasswordInput(attrs={'placeholder': 'Confirmar contraseña'}),
        required=True
    )

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def clean_email(self):
        email = self.cleaned_data['email']
        if not email.endswith('@unsa.edu.pe'):
            raise forms.ValidationError('El correo debe pertenecer a @unsa.edu.pe')
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError('Ya existe un usuario con ese correo.')
        return email

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get("password")
        password2 = cleaned_data.get("password2")

        if password and password2 and password != password2:
            self.add_error("password2", "Las contraseñas no coinciden.")