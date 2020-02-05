from cms.plugin_pool import plugin_pool
from cms.plugin_base import CMSPluginBase
from django.utils.translation import ugettext, ugettext_lazy as _

from apps.plugins import models

prefix = 'Общие - '

# Text
class TextCKEditor(CMSPluginBase):
    model = models.common.TextCKEditor
    name = _(prefix + 'Текст')
    render_template = 'common/plugins/common/text/text.html'
plugin_pool.register_plugin(TextCKEditor)

# Text
class Separator(CMSPluginBase):
    model = models.common.Separator
    name = _(prefix + 'Разделитель')
    render_template = 'common/plugins/common/separator/separator.html'
plugin_pool.register_plugin(Separator)

# Text
class Spacer(CMSPluginBase):
    model = models.common.Spacer
    name = _(prefix + 'Отступ')
    render_template = 'common/plugins/common/spacer/spacer.html'
plugin_pool.register_plugin(Spacer)