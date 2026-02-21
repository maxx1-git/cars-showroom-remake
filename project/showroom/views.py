from django.shortcuts import render
from django.views import generic

from . import models

# def store(request):
#     return render(request, 'showroom/store.html', {'car': models.Car.objects.all()})

class StoreView(generic.ListView):
    model = models.Car
    context_object_name = 'car'
    template_name = 'showroom/store.html'

class CarDetails(generic.DetailView):
    model = models.Car
    template_name = 'showroom/car_details.html'

