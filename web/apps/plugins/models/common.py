from cms.models import CMSPlugin, models
from cms.models import PlaceholderField
from django.utils.encoding import python_2_unicode_compatible
from django.utils.translation import ugettext, ugettext_lazy as _
from djangocms_text_ckeditor.fields import HTMLField
from django.db import models
from apps.core.fields import IntegerRangeField


@python_2_unicode_compatible
class TextCKEditor(CMSPlugin):
    text = HTMLField(configuration='CKEDITOR_SETTINGS_DEFAULT')

    def __str__(self):
        return self.text


@python_2_unicode_compatible
class Separator(CMSPlugin):

    size = IntegerRangeField(
        verbose_name=_('Толщина линии'),
        default=1,
        min_value=1,
        max_value=9999
    )

    color= models.CharField(
        verbose_name=_('Особый цвет линии (#HEX/RGB/RGBA)'),
        blank=True,
        null=True,
        max_length=32,
    )

    def __str__(self):
        if color:
            return str(self.size) + ' / ' + str(self.color)
        return str(self.size)


@python_2_unicode_compatible
class Spacer(CMSPlugin):

    height = IntegerRangeField(
        verbose_name=_('Отступ'),
        default=0,
        min_value=-9999,
        max_value=9999
    )
    height_mobile = IntegerRangeField(
        verbose_name=_('Особый отступ для мобильных устройств (необязательно)'),
        min_value=-9999,
        max_value=9999,
        blank=True,
        null=True
    )

    def __str__(self):
        if self.height_mobile:
            return str(self.height) + ' / ' + str(self.height_mobile)
        return str(self.height)
