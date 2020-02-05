from django.conf.urls import url
from django.views.decorators.cache import never_cache
from rest_framework.urlpatterns import format_suffix_patterns

from apps.core.view.basic import ClearCache
from apps.event.views.event import EventDetailView, EventListViews, EventLiveList

urlpatterns = [
    url(r'^clear_cache/$', never_cache(ClearCache.as_view()), name='clear_cache'),
]

urlpatterns = format_suffix_patterns(urlpatterns)