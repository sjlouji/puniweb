# Generated by Django 3.0.6 on 2020-06-04 13:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('quiz', '0017_questions_choice'),
    ]

    operations = [
        migrations.RenameField(
            model_name='choice',
            old_name='choice_1',
            new_name='choices',
        ),
        migrations.RemoveField(
            model_name='choice',
            name='choice_2',
        ),
        migrations.RemoveField(
            model_name='choice',
            name='choice_3',
        ),
        migrations.RemoveField(
            model_name='choice',
            name='choice_4',
        ),
        migrations.RemoveField(
            model_name='questions',
            name='choice',
        ),
        migrations.AddField(
            model_name='choice',
            name='created_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='choice',
            name='question',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='quiz.Questions'),
        ),
        migrations.AlterField(
            model_name='choice',
            name='answer',
            field=models.CharField(default=models.CharField(max_length=1000), max_length=1000, null=True),
        ),
    ]
