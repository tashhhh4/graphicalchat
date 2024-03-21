from config.settings.common import *

# Allowed Hosts
ALLOWED_HOSTS = ['graphicalchat.app', '70.34.203.236']

# Debug = False
DEBUG = False

# Folder where `collectstatic` puts things in
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Assets Storage
ASSETS_URL = os.environ.get('ASSETS_STORAGE_URL')