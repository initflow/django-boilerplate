from cms.plugin_pool import plugin_pool
from cms.plugin_base import CMSPluginBase
from django.utils.translation import ugettext, ugettext_lazy as _

from apps.core import models

# Common
class Text(CMSPluginBase):
    model = models.Text
    name = _('Текст')
    render_template = 'common/plugins/text.html'
    allow_children = False

class Spacer(CMSPluginBase):
    model = models.Spacer
    name = _('Отступ')
    render_template = 'common/plugins/spacer.html'
    allow_children = False

class Decoration(CMSPluginBase):
    model = models.Decoration
    name = _('SideDecoration')
    render_template = 'common/plugins/decoration.html'

# Page About
class AboutHeadline(CMSPluginBase):
    model = models.AboutHeadline
    name = _('PageAbout - Headline')
    render_template = 'common/plugins/about/headline/headline.html'
    allow_children = False

class AboutTextStairs(CMSPluginBase):
    model = models.AboutTextStairs
    name = _('PageAbout - TextStairs')
    render_template = 'common/plugins/about/text_stairs/text_stairs.html'
    allow_children = True
    child_classes = ['AboutTextStairsItem']

class AboutTextStairsItem(CMSPluginBase):
    model = models.AboutTextStairsItem
    name = _('PageAbout - TextStairsItem')
    render_template = 'common/plugins/about/text_stairs/text_stairs_item.html'
    require_parent = True
    parent_classes = ['AboutTextStairs']

class AboutTextWithBackground(CMSPluginBase):
    model = models.AboutTextWithBackground
    name = _('PageAbout - TextWithBackground')
    render_template = 'common/plugins/about/text_with_background/text_with_background.html'
    allow_children = False

class AboutImage(CMSPluginBase):
    model = models.AboutImage
    name = _('PageAbout - Image')
    render_template = 'common/plugins/about/image/image.html'
    allow_children = False

class AboutFeatures(CMSPluginBase):
    model = models.AboutFeatures
    name = _('PageAbout - Features')
    render_template = 'common/plugins/about/features/features.html'
    allow_children = True
    child_classes = ['AboutFeaturesItem']

class AboutFeaturesItem(CMSPluginBase):
    model = models.AboutFeaturesItem
    name = _('PageAbout - FeaturesItem')
    render_template = 'common/plugins/about/features/features_item.html'
    require_parent = True
    parent_classes = ['AboutFeatures']

class AboutTitleAccentWithImage(CMSPluginBase):
    model = models.AboutTitleAccentWithImage
    name = _('PageAbout - TitleAccentWithImage')
    render_template = 'common/plugins/about/title_accent_with_image/title_accent_with_image.html'
    allow_children = False

class AboutTextWaves(CMSPluginBase):
    model = models.AboutTextWaves
    name = _('PageAbout - TextWaves')
    render_template = 'common/plugins/about/text_waves/text_waves.html'

class AboutColumnsWithBackground(CMSPluginBase):
    model = models.AboutColumnsWithBackground
    name = _('PageAbout - ColumnsWithBackground')
    render_template = 'common/plugins/about/columns_with_background/columns_with_background.html'

class AboutColumns(CMSPluginBase):
    model = models.AboutColumns
    name = _('PageAbout - Columns')
    render_template = 'common/plugins/about/columns/columns.html'

class AboutFrame(CMSPluginBase):
    model = models.AboutFrame
    name = _('PageAbout - Frame')
    render_template = 'common/plugins/about/frame/frame.html'

# EventList (for PageEvents and PageArchive)
class EventsList(CMSPluginBase):
    model = models.EventsList
    name = _('EventsList')
    render_template = 'common/plugins/events/list/list.html'

# PageShop plugins
class ShopTitle(CMSPluginBase):
    model = models.ShopTitle
    name = _('PageShop - Title')
    render_template = 'common/plugins/shop/title/title.html'

class ShopTextCylinder(CMSPluginBase):
    model = models.ShopTextCylinder
    name = _('PageShop - TextCylinder')
    render_template = 'common/plugins/shop/text_cylinder/text_cylinder.html'

class ShopListStairs(CMSPluginBase):
    model = models.ShopListStairs
    name = _('PageShop - ListStairs')
    render_template = 'common/plugins/shop/list_stairs/list_stairs.html'
    allow_children = True
    child_classes = ['ShopListStairsItem']

class ShopListStairsItem(CMSPluginBase):
    model = models.ShopListStairsItem
    name = _('PageShop - ListStairsItem')
    render_template = 'common/plugins/shop/list_stairs/list_stairs_item.html'
    require_parent = True
    parent_classes = ['ShopListStairs']

class ShopTextAndFrame(CMSPluginBase):
    model = models.ShopTextAndFrame
    name = _('PageShop - TextAndFrame')
    render_template = 'common/plugins/shop/text_and_frame/text_and_frame.html'

class ShopTextWaves(CMSPluginBase):
    model = models.ShopTextWaves
    name = _('PageShop - TextWaves')
    render_template = 'common/plugins/shop/text_waves/text_waves.html'

plugin_pool.register_plugin(Text)
plugin_pool.register_plugin(Spacer)
plugin_pool.register_plugin(Decoration)

plugin_pool.register_plugin(AboutHeadline)
plugin_pool.register_plugin(AboutTextStairs)
plugin_pool.register_plugin(AboutTextStairsItem)
plugin_pool.register_plugin(AboutTextWithBackground)
plugin_pool.register_plugin(AboutImage)
plugin_pool.register_plugin(AboutFeatures)
plugin_pool.register_plugin(AboutFeaturesItem)
plugin_pool.register_plugin(AboutTitleAccentWithImage)
plugin_pool.register_plugin(AboutTextWaves)
plugin_pool.register_plugin(AboutColumnsWithBackground)
plugin_pool.register_plugin(AboutColumns)
plugin_pool.register_plugin(AboutFrame)

plugin_pool.register_plugin(EventsList)

plugin_pool.register_plugin(ShopTitle)
plugin_pool.register_plugin(ShopTextCylinder)
plugin_pool.register_plugin(ShopListStairs)
plugin_pool.register_plugin(ShopListStairsItem)
plugin_pool.register_plugin(ShopTextAndFrame)
plugin_pool.register_plugin(ShopTextWaves)
