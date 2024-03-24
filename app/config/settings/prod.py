from config.settings.common import *

# Allowed Hosts
ALLOWED_HOSTS = ['graphicalchat.app']

# Debug = False
DEBUG = False

# CSRF Settings
CSRF_COOKIE_SECURE = True
CSRF_TRUSTED_ORIGINS = ['https://graphicalchat.app']

# Folder where `collectstatic` puts things in
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Assets Storage
ASSETS_URL = os.environ.get('ASSETS_STORAGE_URL')