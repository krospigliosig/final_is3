from django.core.signing import TimestampSigner, BadSignature, SignatureExpired
from django.conf import settings

signer = TimestampSigner()

def generar_token_activacion(user):
    return signer.sign(user.pk)

def verificar_token_activacion(token, duracion=60*60*24): # vence en 24 horas
    try:
        user_id = signer.unsign(token, max_age=duracion)
        return int(user_id)
    except (BadSignature, SignatureExpired):
        return None