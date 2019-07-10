from cms.models import CMSPlugin, models
from cms.models import PlaceholderField
from django.utils.encoding import python_2_unicode_compatible
from djangocms_text_ckeditor.fields import HTMLField
from django.db import models


# Common Plugins models
@python_2_unicode_compatible
class Text(CMSPlugin):
    text = HTMLField()

@python_2_unicode_compatible
class Spacer(CMSPlugin):
    size = models.PositiveSmallIntegerField(null=True, blank=False)
    size_mobile = models.PositiveSmallIntegerField(null=True, blank=True)

@python_2_unicode_compatible
class Decoration(CMSPlugin):
    offset_top = models.PositiveSmallIntegerField(null=True, blank=True, default=100)
    offset_bottom = models.PositiveSmallIntegerField(null=True, blank=True, default=0)
    variant = models.CharField(max_length=7, choices=[
        ('bird', 'Bird with radio'),
        ('disk', 'Record with cover'),
    ], default='bird')

# PageAbout Plugins models
@python_2_unicode_compatible
class AboutHeadline(CMSPlugin):
    title = models.TextField(null=False, blank=False, max_length=1000)
    subtitle = models.TextField(null=True, blank=True, max_length=1000)

@python_2_unicode_compatible
class AboutTextStairs(CMSPlugin):
    label = models.CharField(null=True, blank=True, max_length=1000)

@python_2_unicode_compatible
class AboutTextStairsItem(CMSPlugin):
    text = models.TextField(null=False, blank=False, max_length=1000)

@python_2_unicode_compatible
class AboutTextWithBackground(CMSPlugin):
    text = HTMLField(configuration='CKEDITOR_SETTINGS_MIN')

    image = models.ImageField(upload_to='about/plugins/text_with_background/', blank=False, null=True)

@python_2_unicode_compatible
class AboutImage(CMSPlugin):
    image = models.ImageField(upload_to='about/plugins/image/', blank=False, null=True)

@python_2_unicode_compatible
class AboutFeatures(CMSPlugin):
    title = models.CharField(null=True, blank=True, max_length=1000)

@python_2_unicode_compatible
class AboutFeaturesItem(CMSPlugin):
    text = models.TextField(null=False, blank=False, max_length=1000)

@python_2_unicode_compatible
class AboutTitleAccentWithImage(CMSPlugin):
    text_before_title = models.TextField(null=False, blank=False, max_length=1000)

    title = models.CharField(null=False, blank=False, max_length=1000)

    text_after_title = models.TextField(null=False, blank=False, max_length=1000)

    image = models.ImageField(upload_to='about/plugins/title_accent_with_image/', blank=False, null=True)
    
@python_2_unicode_compatible
class AboutTextWaves(CMSPlugin):
    pass

@python_2_unicode_compatible
class AboutColumnsWithBackground(CMSPlugin):
    image = models.ImageField(upload_to='about/plugins/columns_with_background/', blank=False, null=True)

    left_column_text = models.TextField(null=False, blank=False, max_length=1000)

    right_column_text = models.TextField(null=False, blank=False, max_length=1000)

@python_2_unicode_compatible
class AboutColumns(CMSPlugin):
    left_column_text = HTMLField(configuration='CKEDITOR_SETTINGS_MIN')

    right_column_text = HTMLField(configuration='CKEDITOR_SETTINGS_MIN')

@python_2_unicode_compatible
class AboutFrame(CMSPlugin):
    text = models.TextField(null=False, blank=False, max_length=1000)

# Events listings Plugins models
@python_2_unicode_compatible
class EventsList(CMSPlugin):
    mode = models.CharField(max_length=7, choices=[
        ('actual', 'Actual'),
        ('archive', 'Archive'),
    ], default='actual')

# Shop Plugins
@python_2_unicode_compatible
class ShopTitle(CMSPlugin):
    text = HTMLField(configuration='CKEDITOR_SETTINGS_MIN')

@python_2_unicode_compatible
class ShopTextCylinder(CMSPlugin):
    pass

@python_2_unicode_compatible
class ShopListStairs(CMSPlugin):
    title = models.TextField(null=False, blank=False, max_length=1000)

    image = models.ImageField(upload_to='week_record/plugins/list_stairs/', blank=False, null=True)

@python_2_unicode_compatible
class ShopListStairsItem(CMSPlugin):
    text = models.CharField(null=False, blank=False, max_length=1000)

@python_2_unicode_compatible
class ShopTextAndFrame(CMSPlugin):
    text = HTMLField(configuration='CKEDITOR_SETTINGS_HIGHLIGHT')

    frame_text = HTMLField(configuration='CKEDITOR_SETTINGS_MIN_WITH_LINKS')

@python_2_unicode_compatible
class ShopTextWaves(CMSPlugin):
    pass