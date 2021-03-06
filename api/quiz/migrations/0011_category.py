# Generated by Django 3.0.6 on 2020-06-02 11:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0010_choice_answer'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(choices=[('simple', 'intermediate')], default='simple', max_length=10)),
                ('quiz_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='quiz.Quiz')),
            ],
        ),
    ]
