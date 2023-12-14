from django.db import models


class BinVO(models.Model):
    closet_name = models.CharField(max_length=100)
    import_href = models.CharField(max_length=100, unique=True, null=True)

class Shoe(models.Model):
    name = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    picture_url = models.URLField(max_length=200)

    bin = models.ForeignKey(
        BinVO,
        related_name="shoes",
        on_delete=models.CASCADE,
    )
