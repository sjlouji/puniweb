# Generated by Django 3.0.6 on 2020-06-02 15:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0016_auto_20200602_1506'),
    ]

    operations = [
        migrations.AddField(
            model_name='questions',
            name='choice',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='quiz.Choice'),
        ),
    ]