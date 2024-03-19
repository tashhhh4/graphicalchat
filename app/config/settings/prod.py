from config.settings.common import *

# Static Files
#STATICFILES_DIRS = [
#    "/app/static",
#]

# URL Where Django can access the collected static files from
STATIC_URL = "static/"

# Folder where `collectstatic` puts things in
STATIC_ROOT = '/app/staticfiles'


# Allowed Hosts
ALLOWED_HOSTS = ['graphicalchat.app', '70.34.203.236']

# Debug = False
DEBUG = False