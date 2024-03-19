from config.settings.common import *


# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'
STATICFILES_DIRS = [
    BASE_DIR / "static",
    "/static/",
]

# Allowed Hosts
ALLOWED_HOSTS = ['*']

# Debug = True
DEBUG = True