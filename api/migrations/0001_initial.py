# Generated by Django 3.1.7 on 2021-04-22 11:54

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MainCycle',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('click_count', models.IntegerField(default=0)),
                ('click_power', models.IntegerField(default=1)),
            ],
        ),
    ]
