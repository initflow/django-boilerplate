from rest_framework import generics
from rest_framework.generics import GenericAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.core.authentication import IsSuperUser
from apps.translations.helper import init_cache


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 300


class BasicOwnerGenericAPIView(GenericAPIView):

    def get_queryset(self):
        return self.queryset.all()


class ClearCache(APIView):
    permission_classes = (IsSuperUser,)

    def get(self, request, format=None):
        from django.core.cache import cache
        cache.clear()
        init_cache()
        return Response('Cache has been cleared')

# class BasicOwnerGenericAPIView(BasicOwnerGenericAPIView, generics.ListCreateAPIView):
#
#     def get_queryset(self):
#         return super().get_queryset()
