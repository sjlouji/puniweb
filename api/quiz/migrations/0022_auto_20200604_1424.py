# Generated by Django 3.0.6 on 2020-06-04 14:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0021_auto_20200604_1413'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='choice',
            name='question',
        ),
        migrations.AddField(
            model_name='questions',
            name='questions',
            field=models.ManyToManyField(blank=True, null=True, to='quiz.Choice'),
        ),
    ]
