# Generated by Django 3.0.1 on 2019-12-23 17:00

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('priority', models.PositiveIntegerField()),
                ('url', models.URLField()),
            ],
        ),
        migrations.CreateModel(
            name='Stanza',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('priority', models.PositiveIntegerField()),
                ('text', models.TextField(blank=True)),
            ],
        ),
    ]
