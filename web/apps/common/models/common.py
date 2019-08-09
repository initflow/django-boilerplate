from cms.models import CMSPlugin, models
from cms.models import PlaceholderField
from django.utils.encoding import python_2_unicode_compatible
from djangocms_text_ckeditor.fields import HTMLField
from django.db import models


# Common Plugins models
@python_2_unicode_compatible
class TextCKEditor(CMSPlugin):
    text = HTMLField(configuration='CKEDITOR_SETTINGS_DEFAULT')
    
@python_2_unicode_compatible
class TextParagraph(CMSPlugin):
    text = models.TextField(null=False, blank=False, max_length=5000)
    
@python_2_unicode_compatible
class TextPlain(CMSPlugin):
    text = models.TextField(null=False, blank=False, max_length=5000)