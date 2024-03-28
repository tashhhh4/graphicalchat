from django.urls import path
from . import views

urlpatterns = [
    path('', views.mainAppView, name='mainAppView'),

    # Test pages
    path('debug/', views.debugPageView, name='debug_page_view'),
    path('ui-test/', views.uiTestView, name='ui_test_view'),
]