from django.urls import path
from . import views
urlpatterns = [
    path('', views.StoreView.as_view() , name='store'),
    path('car/<int:pk>/', views.CarDetails.as_view(), name='car_details'),
]