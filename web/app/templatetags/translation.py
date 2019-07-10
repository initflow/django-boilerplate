import django
from django import template

from apps.translations.helper import get_translation

register = template.Library()


@register.simple_tag
def trans(value):
    return get_translation(value)
    #
    # result = get_cache
    # if result:
    #     return result
    # result =  Translation.objects.get_or_create(key=value, defaults={"translate": value})[0].translate
    # caches[]


@register.simple_tag
def menu_translation(item):
    return item.safe_translation_getter('title', language_code=django.utils.translation.get_language())
