from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework import viewsets

from saleor.core.view.basic import BasicOwnerGenericAPIView, StandardResultsSetPagination
from saleor.shop.models import Shop


class BasicOwnerModelViewset(BasicOwnerGenericAPIView, viewsets.ModelViewSet):
    filter_backends = (
        DjangoFilterBackend,
        filters.OrderingFilter,
        filters.SearchFilter,
    )

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        return super().get_queryset().base_filter(self.request.user)
