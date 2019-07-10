"""app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from cms.sitemaps import CMSSitemap
from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.i18n import i18n_patterns
from django.contrib import admin
from django.contrib.sitemaps.views import sitemap
from django.views.generic import TemplateView
from rest_framework.documentation import include_docs_urls

from apps.core.view import errors


from apps.event.sitemap import sitemaps as event_sitemaps

admin.autodiscover()

sitemaps = dict()
sitemaps.update({'cmspages': CMSSitemap})
sitemaps.update(event_sitemaps)

urlpatterns = [
    url(r'^sitemap\.xml/$', sitemap,
        {'sitemaps': sitemaps}),
    url(r'^filer/', include('filer.urls')),
    url(r'^docs/', include_docs_urls(title='API documentation', public=False)),
    url(r'^i18n/', include('django.conf.urls.i18n')),
    url(r'^robots\.txt$', TemplateView.as_view(template_name="robots.txt", content_type='text/plain')),

]


urlpatterns += i18n_patterns(
    url(r'^event/', include('apps.event.urls'), name='events'),
    url(r'^core/', include('apps.core.urls')),
    url(r'^week_record/', include('apps.week_record.urls')),
    url(r'^', include('cms.urls')),
)

# if settings.ADMIN_ENABLED:
urlpatterns += [
    url(r'^admin/', admin.site.urls),
]

if not settings.DEBUG:
    handler404 = errors.handler404
    handler500 = errors.handler500


#
# if settings.DEBUG:
#     import debug_toolbar
#     urlpatterns = [
#         url('__debug__/', include(debug_toolbar.urls)),
#
#         # For django versions before 2.0:
#         # url(r'^__debug__/', include(debug_toolbar.urls)),
#
#     ] + urlpatterns
