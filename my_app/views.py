from django.shortcuts import render,HttpResponse
# from .models import Post
from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema

from django.http import JsonResponse
from .models3 import Attributes,Discrepency
from django.db import connection

from django.shortcuts import redirect

from django.utils import timezone
import json
from django.http import JsonResponse

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

from django.db import transaction
import uuid
@api_view(['POST'])
def update_audit_log(request,site_id):
    if request.method == 'POST':
        # Parse the JSON body of the request
        data = json.loads(request.body)
        # Retrieve the fields from the request data
        
        with transaction.atomic():
             for item in data:
                    attribute_code = item.get('attribute')
                    # print(attribute_code)
                    # print(Attributes.objects.get(primary_site_code=attribute_code))
                    attribute = Attributes.objects.get(primary_site_code=site_id)

                    discrepancy = Discrepency(
                        id=uuid.uuid4(),
                        primary_site_code=attribute,
                        audit_date=timezone.now(),  # Assuming you want to set this at save time
                        auditor_name='Auditor Name Here',  # You should get this from your auth system or the request
                        discrepancy={
                            'attribute': item.get('attribute'),
                            'actual_value': item.get('actualValue'),
                            'comments': item.get('comments'),
                            'flag_as_kdi': item.get('flagAsKDI', False),
                        }
                    )
                    discrepancy.save()
        # site_code = data.get('site_code')
        # attribute_name = data.get('attribute')
        # new_value = data.get('new_value')
        # comments = data.get('comments')
        # flag_as_kdi = data.get('flagAsKDI', False)

        # Find the corresponding Attribute entry
        try:
            attribute = Attributes.objects.get(primary_site_code=site_id)
        except Attributes.DoesNotExist:
            return JsonResponse({'error': 'Attributes with this site code does not exist.'}, status=404)

        # Update the AuditLog entry
        # Discrepency.objects.update_or_create(
        #     attribute=attribute,
        #     defaults={
        #         # 'site_details': attribute.site_details,  # Assuming this is a field in your Attributes model
        #         'audit_date': timezone.now(),
        #         'auditor_name': 'Your Auditor Name',  # This should come from the session or the request data
        #         'discrepancy': {
        #             'attribute': attribute_name,
        #             'current_value': attribute.current_value,  # Assuming this is a field in your Attributes model
        #             'new_value': new_value,
        #             'comments': comments,
        #             'flag_as_kdi': flag_as_kdi
        #         }
        #     }
        # )
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON.'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        return JsonResponse({'success': 'Audit log updated.'})
    return JsonResponse({'error': 'Invalid request'}, status=400)
