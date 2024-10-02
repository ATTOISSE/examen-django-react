from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookAPIView, UserAPIView, LoanAPIView

router = DefaultRouter()
router.register(r'books', BookAPIView, basename='books')
router.register(r'loans', LoanAPIView, basename='loans')
router.register(r'users', UserAPIView, basename='users')

urlpatterns = [
    path('api/loans/user/', LoanAPIView.as_view({'get': 'get_loans_by_user'}), name='loan-by-user'),  # Nouvelle route
    path('api/', include(router.urls)),
]
