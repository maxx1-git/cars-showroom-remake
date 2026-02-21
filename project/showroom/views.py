from django.shortcuts import render
from django.views import generic
from django.db.models import Count


from . import models

# def store(request):
#     return render(request, 'showroom/store.html', {'car': models.Car.objects.all()})

class StoreView(generic.ListView):
    model = models.Car
    context_object_name = 'car'
    template_name = 'showroom/store.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        brands = (
            models.Car.objects.values('brand').annotate(count=Count('id')).order_by('-count')
        )
        context['brands'] = brands
        return context

class CarDetails(generic.DetailView):
    model = models.Car
    template_name = 'showroom/car_details.html'

