from django.shortcuts import render,HttpResponse
# from .models import Post
from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema

from django.http import JsonResponse
from .models3 import Attributes

from django.db import connection

from django.shortcuts import redirect

def home(request):
    # posts = Post.objects.all()
    # return render(request, 'my_app/home.html', {'posts': posts})
    # attributes = Attributes.objects.all().values('primary_site_code')
    # return JsonResponse(list(attributes), safe=False)
    # print(Attributes.objects)
    attributes = Attributes.objects.filter(primary_site_code="").values()
    if attributes:
            # Since .values() gives us a QuerySet of dictionaries, we can convert it to a list and return it.
        return JsonResponse(list(attributes), safe=False)
    else:
        return JsonResponse({'error': 'No attribute found with the provided site ID'}, status=404)
    
    # return HttpResponse("hello")

@swagger_auto_schema(
    method='get',
    operation_description="Retrieves a list of users",
    responses={200: 'Success'}
)
@api_view(['GET'])
def get_users(request,site_id):
    # pass
    # return HttpResponse("hello")
    # attributes = Attributes.objects.all().values('primary_site_code')
    # return JsonResponse(list(attributes), safe=False)
    print("site",site_id)
    with connection.cursor() as cursor:
        # cursor.execute('SELECT * FROM attributes WHERE primary_site_code= %s',[site_id] )
        # row = cursor.fetchone()
        try:
                # attributes = Attributes.objects.filter(primary_site_code=site_id).values()
                # attribute = Attributes.objects.get(primary_site_code=site_id).values()
                # from django.forms.models import model_to_dict
                # attribute_dict = model_to_dict(attribute)
                cursor.execute('SELECT * FROM attributes WHERE primary_site_code= %s',[site_id] )
                row = cursor.fetchone()
                columns = [col[0] for col in cursor.description]

                if row is not None:
                    # Use a dictionary comprehension to match column names with row values
                    data = {columns[index]: value for index, value in enumerate(row)}
                    return JsonResponse(data)
                else:
                    return JsonResponse({'error': 'No '}, status=404)
        
            
                # return JsonResponse(attribute_dict)
                # return JsonResponse(attributes_list, safe=False)
        except Exception as e:
                return JsonResponse({'error': 'Attribute with this site ID does not exist'}, status=404)

#  routes for get request for values for 


@api_view(['POST'])
# @require_POST
def handle_site_id(request,site_id):
    # print(request)
    # print("s",site_id)
    with connection.cursor() as cursor:
         try:
              cursor.execute('SELECT * FROM attributes WHERE primary_site_code= %s',[site_id] )
              row = cursor.fetchone()
              if row is not None:
                    return JsonResponse({'success': True})
              else:
                   return JsonResponse({'error': 'No '}, status=404)
                   
                
         
         except Exception as e:
              return HttpResponse(400)
              
    # if request.method == 'POST':
    #     site_id = request.POST.get('primary_site_code')
    #     # Check site_id in the database
    #     # Assuming you have a Site model and you're checking if the site_id exists
    #     if Attributes.objects.filter(primary_site_code=site_id).exists():
    #         # Call another API
    #         # Assuming you have a function to call another API
    #         # api_response = call_another_api(site_id)
    #         # If the API call is successful, redirect to the home page
    #         # return redirect('/home')
    #         # For demonstration, returning a JSON response
    #         return JsonResponse({'success': True})
    #     else:
    #         return JsonResponse({'error': 'Site ID not found'}, status=400)



