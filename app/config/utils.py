from django.http import HttpRequest

def get_absolute_base_url(request: HttpRequest) -> str:
    return request.build_absolute_uri('/')