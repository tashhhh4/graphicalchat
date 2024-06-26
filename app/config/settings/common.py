"""
Common Django settings for config project.

https://docs.djangoproject.com/en/5.0/topics/settings/
https://docs.djangoproject.com/en/5.0/ref/settings/
https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/
https://docs.djangoproject.com/en/5.0/howto/static-files/
https://docs.djangoproject.com/en/5.0/ref/settings/#databases
"""

import os
from pathlib import Path

# WSGI Application
WSGI_APPLICATION = 'config.wsgi.application'

# Build paths inside the project like this: BASE_DIR / 'subdir'
BASE_DIR = Path(__file__).resolve().parent.parent.parent

ROOT_URLCONF = 'common.urls'


# Secret Key
SECRET_KEY = os.environ.get('SECRET_KEY')


# Application definition
INSTALLED_APPS = [
    'management.apps.ManagementConfig',
    'common.apps.CommonConfig',
    'gcmain.apps.GcmainConfig',
    'gclogin.apps.GcloginConfig',
    'database.apps.DatabaseConfig',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    #'common.middleware.PasswordLockMiddleware',
]

# Temporary universal alpha testing password
ALPHA_PASSWORD = os.environ.get('ALPHA_PASSWORD')

# Login Required
# PASSWORD_URL = '/auth/'
LOGIN_URL = 'login'

# Login Redirect
LOGIN_REDIRECT_URL = '/'
LOGOUT_REDIRECT_URL = '/'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            BASE_DIR / 'dist' / 'templates' / 'dist',
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


# URL that triggers the retrieval of static files
STATIC_URL = "static/"

# Folders where the local development server will
#      search for static files
STATICFILES_DIRS = [
    BASE_DIR / 'common' / 'static' / 'common',
    BASE_DIR / 'gclogin' / 'static' / 'gclogin',
    BASE_DIR / 'gcmain' / 'static' / 'gcmain',

    BASE_DIR / 'dist' / 'static' / 'dist',
]

# Assets Config
ASSETS_URL = '/assets/'
ASSETS_ROOT = BASE_DIR / 'assets'

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('POSTGRES_NAME'),
        'USER': os.environ.get('POSTGRES_USER'),
        'PASSWORD': os.environ.get('POSTGRES_PASSWORD'),
        'HOST': 'db',
        'PORT': 5432,
    }
}

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Email Settings
EMAIL_HOST_PASSWORD = os.environ['EMAIL_PASSWORD']
EMAIL_HOST_USER = os.environ['EMAIL_USER']
DEFAULT_FROM_EMAIL = os.environ['EMAIL_USER']
EMAIL_PORT = os.environ['EMAIL_PORT']
EMAIL_HOST = os.environ['EMAIL_HOST']
EMAIL_USE_TLS = True
# EMAIL_USE_SSL = True