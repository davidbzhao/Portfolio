# Generated by Django 4.1.5 on 2023-07-15 23:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('intro', '0007_auto_20211014_0515'),
    ]

    operations = [
        migrations.CreateModel(
            name='GridIcon',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('colors', models.JSONField()),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='intro.event')),
            ],
        ),
    ]