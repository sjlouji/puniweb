# Generated by Django 3.0.6 on 2020-06-02 11:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0008_category'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='category',
            name='quiz',
        ),
        migrations.DeleteModel(
            name='Answer',
        ),
        migrations.DeleteModel(
            name='Category',
        ),
    ]
