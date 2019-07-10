import django
from cms.views import details
from django.http import HttpResponseRedirect
from django.shortcuts import render


def return_page(request, page, context):
    lang = '/'+django.utils.translation.get_language()
    path = request.path
    print(path, lang)
    if not path.startswith(lang):
        return HttpResponseRedirect(lang+request.path)

    return render(request, page, context)


def handler404(request):
    context = {}
    return return_page(request, 'common/error_404.html',context)


def handler500(request):
    context = {}
    return return_page(request, 'common/error_500.html',context)