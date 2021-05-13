from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class MainCycle(models.Model):
    user = models.OneToOneField(User, null=False, on_delete=models.CASCADE, default=0)
    click_count = models.IntegerField(default=0)
    click_power = models.IntegerField(default=1)

    def click(self):
        self.click_count += self.click_power


class Boost(models.Model):
    mainCycle = models.ForeignKey(MainCycle, null=False, on_delete=models.CASCADE)
    power = models.IntegerField(default=1)
    price = models.IntegerField(default=10)

    def update(self):
        self.mainCycle.click_power += self.power
        self.mainCycle.click_count -= self.price

        self.power *= 2 
        self.price *= 2
