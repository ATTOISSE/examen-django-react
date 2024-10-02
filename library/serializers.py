from django.utils import timezone
from .models import User,Book,Loan
from rest_framework import serializers
from .errorSerializer import custom_to_internal_value
from rest_framework.serializers import ModelSerializer

class BookSerializer(ModelSerializer):
    
    def to_internal_value(self,data):
            return custom_to_internal_value(self,data)

    class Meta:
        model = Book
        fields = '__all__'

class UserSerializer(ModelSerializer):
    def to_internal_value(self,data):
            return custom_to_internal_value(self,data)
    class Meta:
        model = User
        fields = '__all__' 
        extra_kwargs = {'password':{'write_only': True}}

    def create(self, validated_data):
        user = User(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])  
        user.save()
        return user


class LoanSerializer(ModelSerializer):
    def to_internal_value(self,data):
            return custom_to_internal_value(self,data)
    class Meta:
        model = Loan
        fields = '__all__' 

    def validate(self,data): 
        return_date = data.get('return_date') 
        borrowing_date = data.get('borrowing_date', timezone.now()) 
        if return_date and borrowing_date and return_date < borrowing_date.date():
            raise serializers.ValidationError("La date de retour ne peut pas être antérieure à la date d'emprunt.")
        return super().validate(data) 

class LoanWithBookDetailsSerializer(serializers.ModelSerializer):
    book_title = serializers.CharField(source='book.title', read_only=True)
    book_author = serializers.CharField(source='book.author', read_only=True)
    book_gender = serializers.CharField(source='book.gender', read_only=True)

    class Meta:
        model = Loan
        fields = ['id', 'borrowing_date', 'return_date', 'book_title', 'book_author', 'book_gender']
