from config.settings.common import *

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles/')
STATICFILES_DIRS = [
    BASE_DIR / "static",
    "/static/",
]
STATIC_URL = "/staticfiles/"

# Allowed Hosts
ALLOWED_HOSTS = ['graphicalchat.app', '70.34.203.236']

# Debug = False
DEBUG = False