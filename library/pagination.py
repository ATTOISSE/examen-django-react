from rest_framework.pagination import PageNumberPagination

class BookPagination(PageNumberPagination):
    page_size = 8
    max_page_size = 10
    page_size_query_param = 'page_size'

class UserPagination(PageNumberPagination):
    page_size = 8
    max_page_size = 10
    page_size_query_param = 'page_size'

class LoanPagination(PageNumberPagination):
    page_size = 8
    max_page_size = 10
    page_size_query_param = 'page_size'