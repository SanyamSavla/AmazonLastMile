from django.shortcuts import render,HttpResponse
# from .models import Post
from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema

def home(request):
    # posts = Post.objects.all()
    # return render(request, 'my_app/home.html', {'posts': posts})
    return HttpResponse("hello")

@swagger_auto_schema(
    method='get',
    operation_description="Retrieves a list of users",
    responses={200: 'Success'}
)
@api_view(['GET'])
def get_users(request):
    pass
