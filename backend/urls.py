# Libraries
from django.urls import path
from . import views
from django.conf.urls import url

urlpatterns = [
    url(r"^api/get-questions/$", views.getQuestions, name="get-questions"),
]