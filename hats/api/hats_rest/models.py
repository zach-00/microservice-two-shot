from django.db import models
# Create your models here.


class LocationVO(models.Model):
    closet_name = models.CharField(max_length=100)
    import_href = models.CharField(max_length=200, unique=True)


class Hat(models.Model):

    fabric = models.CharField(max_length=200)
    style_name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.URLField(max_length=200)

    location = models.ForeignKey(
        LocationVO,
        related_name="hat",
        on_delete=models.CASCADE,
    )
