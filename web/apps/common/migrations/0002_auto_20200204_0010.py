# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2020-02-04 00:10
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0022_auto_20180620_1551'),
        ('common', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='textparagraph',
            name='cmsplugin_ptr',
        ),
        migrations.RemoveField(
            model_name='textplain',
            name='cmsplugin_ptr',
        ),
        migrations.DeleteModel(
            name='TextParagraph',
        ),
        migrations.DeleteModel(
            name='TextPlain',
        ),
    ]