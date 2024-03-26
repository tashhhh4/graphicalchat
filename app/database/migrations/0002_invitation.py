# Generated by Django 5.0 on 2024-03-26 14:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Invitation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=255)),
                ('code', models.CharField(max_length=14)),
                ('date_sent', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
