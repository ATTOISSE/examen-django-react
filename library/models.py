from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager

class Book(models.Model):
    title = models.CharField(max_length=50,unique=True,db_index=True)
    author = models.CharField(max_length=30,db_index=True)
    gender = models.CharField(max_length=20,db_index=True)
    isbn = models.CharField(max_length=13, unique=True, blank=True, editable=False)
    publication_date = models.DateField()
    picture = models.ImageField(upload_to='images/',null=True)
    disponibility = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        if not self.isbn:
            self.isbn = self.generate_isbn()
        super().save(*args, **kwargs)

    def generate_isbn(self):
        last_isbn = Book.objects.order_by('-isbn').first()
        if last_isbn:
            last_number = int(last_isbn.isbn.split('-')[1])
            new_number = last_number + 1
        else:
            new_number = 1
        return f"ISBN-{new_number:03d}"

class UserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password=None):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def get_by_natural_key(self, email):
        return self.get(email=email)

class User(AbstractBaseUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

class Loan(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    borrowing_date = models.DateTimeField(auto_now_add=True)
    return_date = models.DateField()