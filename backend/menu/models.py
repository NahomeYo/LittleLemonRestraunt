from django.db import models


class MenuCategory(models.Model):
    title = models.CharField(max_length=120, unique=True)

    class Meta:
        ordering = ["title"]

    def __str__(self):
        return self.title


class MenuItem(models.Model):
    category = models.ForeignKey(MenuCategory, related_name="items", on_delete=models.CASCADE)
    name = models.CharField(max_length=120)
    description = models.TextField(blank=True)
    percentage = models.PositiveSmallIntegerField()

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return f"{self.name} ({self.category.title})"
