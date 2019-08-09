from cms.plugin_pool import plugin_pool
from cms.plugin_base import CMSPluginBase
from django.utils.translation import ugettext, ugettext_lazy as _

from apps.common import models

# Texts
class TextCKEditor(CMSPluginBase):
    model = models.TextCKEditor
    name = _('Text (CKEditor)')
    render_template = 'common/plugins/text_ckeditor/text_ckeditor.html'
    allow_children = False
plugin_pool.register_plugin(TextCKEditor)

class TextParagraph(CMSPluginBase):
    model = models.TextParagraph
    name = _('Text (Paragraph)')
    render_template = 'common/plugins/text_paragraph/text_paragraph.html'
    allow_children = False
plugin_pool.register_plugin(TextParagraph)

class TextPlain(CMSPluginBase):
    model = models.TextPlain
    name = _('Text (Plain)')
    render_template = 'common/plugins/text_plain/text_plain.html'
    allow_children = False
plugin_pool.register_plugin(TextPlain)