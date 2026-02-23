from django.shortcuts import render
from django.views import generic
from showroom.models import Car
# Create your views here.

# def index(request):
#     return render(request, 'pages/index.html')


class Index(generic.TemplateView):
    template_name = 'pages/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['featured_cars'] = Car.objects.order_by('-created_at')[:3]
        return context




class Contact(generic.TemplateView):
    template_name = 'pages/contact.html'