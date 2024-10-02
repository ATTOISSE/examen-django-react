from rest_framework import status 
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import OrderingFilter
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer,LoanSerializer,BookSerializer,LoanWithBookDetailsSerializer
from .pagination import BookPagination,UserPagination,LoanPagination
from .filterLoan import LoanFilter
from .models import User,Loan,Book

class BookAPIView(ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    ordering_fields = ['title', 'author','gender','publication_date']
    filterset_fields = ['title', 'author','gender','publication_date']
    pagination_class = BookPagination 
    filter_backends = [DjangoFilterBackend,OrderingFilter]
    
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

class LoanAPIView(ModelViewSet):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer
    filterset_class = LoanFilter 
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    pagination_class = LoanPagination
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():  
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_loans_by_user(self, request):
        user = request.user
        loans = user.loan_set.all()
        serializer = LoanWithBookDetailsSerializer(loans, many=True)
        return Response(serializer.data)

class UserAPIView(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer 
    filterset_fields = ['first_name', 'last_name','email']
    ordering_fields = ['first_name', 'last_name','email']
    filter_backends = [DjangoFilterBackend,OrderingFilter]
    pagination_class = UserPagination
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['last_name'] = user.last_name
        token['first_name'] = user.first_name
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
