# Generated by Django 3.2.8 on 2021-10-14 04:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('intro', '0004_auto_20190730_0936'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='event_type',
        ),
        migrations.AddField(
            model_name='event',
            name='priority',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
