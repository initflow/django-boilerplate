# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2020-02-05 16:00
from __future__ import unicode_literals

import apps.core.fields
from django.db import migrations, models
import django.db.models.deletion
import djangocms_text_ckeditor.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('cms', '0022_auto_20180620_1551'),
    ]

    operations = [
        migrations.CreateModel(
            name='PluginSeparator',
            fields=[
                ('cmsplugin_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, related_name='plugins_pluginseparator', serialize=False, to='cms.CMSPlugin')),
                ('size', apps.core.fields.IntegerRangeField(default=1, verbose_name='Толщина линии')),
                ('color', models.CharField(blank=True, max_length=32, null=True, verbose_name='Особый цвет линии (#HEX/RGB/RGBA)')),
            ],
            options={
                'abstract': False,
            },
            bases=('cms.cmsplugin',),
        ),
        migrations.CreateModel(
            name='PluginSpacer',
            fields=[
                ('cmsplugin_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, related_name='plugins_pluginspacer', serialize=False, to='cms.CMSPlugin')),
                ('height', apps.core.fields.IntegerRangeField(default=0, verbose_name='Отступ')),
                ('height_mobile', apps.core.fields.IntegerRangeField(blank=True, null=True, verbose_name='Особый отступ для мобильных устройств (необязательно)')),
            ],
            options={
                'abstract': False,
            },
            bases=('cms.cmsplugin',),
        ),
        migrations.CreateModel(
            name='TextCKEditor',
            fields=[
                ('cmsplugin_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, related_name='plugins_textckeditor', serialize=False, to='cms.CMSPlugin')),
                ('text', djangocms_text_ckeditor.fields.HTMLField()),
            ],
            options={
                'abstract': False,
            },
            bases=('cms.cmsplugin',),
        ),
    ]
