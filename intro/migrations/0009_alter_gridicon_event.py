# Generated by Django 4.1.5 on 2023-07-15 23:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('intro', '0008_gridicon'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gridicon',
            name='event',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='intro.event'),
        ),
    ]
