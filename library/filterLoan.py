from django import forms
from .models import Loan
from django_filters import rest_framework as filters

class LoanFilter(filters.FilterSet):
    borrowing_date = filters.DateFilter(widget=forms.DateInput(attrs={'type': 'date'}))
    return_date = filters.DateFilter(widget=forms.DateInput(attrs={'type': 'date'}))

    class Meta:
        model = Loan
        fields = ['borrowing_date', 'return_date']