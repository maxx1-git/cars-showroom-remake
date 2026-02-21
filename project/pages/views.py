from django.shortcuts import render
from django.views import generic
# Create your views here.

# def index(request):
#     return render(request, 'pages/index.html')


class Index(generic.TemplateView):
    template_name = 'pages/index.html'


class Contact(generic.TemplateView):
    template_name = 'pages/contact.html'