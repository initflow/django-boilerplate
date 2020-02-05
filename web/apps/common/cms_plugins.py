from cms.plugin_pool import plugin_pool
from cms.plugin_base import CMSPluginBase
from django.utils.translation import ugettext, ugettext_lazy as _

from apps.common import models

# Texts
class TextCKEditor(CMSPluginBase):
    model = models.TextCKEditor
    name = _('Text (CKEditor)')
    render_template = 'common/plugins/text/text.html'
    allow_children = False
plugin_pool.register_plugin(TextCKEditor)