# Generated by Django 2.2.3 on 2019-07-30 07:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('intro', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='title_prefix',
        ),
    ]
