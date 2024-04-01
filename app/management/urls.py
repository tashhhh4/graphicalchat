from django.urls import path
from . import views

urlpatterns = [
    path('', views.adminMenuView, name='adminMenuView'),
    
    path('login/', views.adminLoginView, name='adminLoginView'),
    path('login/f/', views.adminLogin, name='adminLogin'),
    path('logout/', views.adminLogout, name='adminLogout'),

    path('invite-users/', views.invitationView, name='invitationView'),
    path('invite-users/f/', views.sendInvitation, name='sendInvitation'),
    path('invite-users/done', views.invitationSentView, name='invitationSentView'),

    path('game-items/', views.gameObjectsMenuView, name='gameObjectsMenuView'),
    path('game-items/hub/', views.hubBaseFormView, name='hubBaseFormView'),
    path('game-items/hub/f/add', views.addHubBase, name='addHubBase'),
    path('game-items/hub/f/delete', views.deleteHubBase, name='deleteHubBase'),
]