from django.db import models

class Question(models.Model):
    error = models.TextField()
    title = models.TextField()
    link = models.TextField()