from django.shortcuts import render,HttpResponse
# from .models import Post
from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema

from django.http import JsonResponse
from .models3 import Attributes,Discrepency,AuditSessions
from django.db import connection

from django.shortcuts import redirect

from django.utils import timezone
import json
from django.http import JsonResponse


from django.core.mail import send_mail
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.core.mail import EmailMessage

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

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

def get_or_none(model, **kwargs):
    try:
        return model.objects.get(**kwargs)
    except model.DoesNotExist:
        return None

@api_view(['GET'])
def fetchDiscrepency(request):
    print("here")
    try:
        # Pagination settings
        page = request.GET.get('page', 1)
        per_page = request.GET.get('per_page', 40)
        discrepancies = Discrepency.objects.all()
        data = []   
        paginator = Paginator(discrepancies, per_page)
        try:
            discrepancies_page = paginator.page(page)
        except PageNotAnInteger:
            discrepancies_page = paginator.page(1)
        except EmptyPage:
            discrepancies_page = paginator.page(paginator.num_pages)
        # print(discrepancies

        for discrepancy in discrepancies_page:
        # for discrepancy in discrepancies:
            d=discrepancy.primary_site_code.primary_site_code
            print(d)
            primary_site_code = discrepancy.primary_site_code  # Assuming this is a ForeignKey to an Attributes model
            site_id = primary_site_code.primary_site_code  # Adjust this if `site_id` is the correct field in Attributes

            print(f"Primary site code: {site_id}")
            try:
                # audit_session = AuditSessions.objects.get(site_id=site_id)
                audit_session = AuditSessions.objects.filter(site_id=site_id).first()
                print(f"Found audit session for site_id {site_id}")
                print("audit,",audit_session)
                discrepancy_data = discrepancy.discrepancy  # Assuming this is a JSON field
               

                data.append({
                    'site_id': audit_session.site_id,
                    'attribute_logs': discrepancy_data.get('attribute', 'N/A'),
                    'audit_date': discrepancy.audit_date.strftime('%Y-%m-%d'),
                    'auditor_name': f"{audit_session.auditor_first_name}, {audit_session.auditor_last_name}",
                    'existing_value': discrepancy_data.get('existing_value', 'N/A'),
                    'location': f"{audit_session.city}, {audit_session.state}",
                    'new_value': discrepancy_data.get('actual_value', 'N/A')
                })
                print(data)
            except AuditSessions.DoesNotExist:
                # Handle the case where there is no corresponding audit session
                data.append({
                    'site_id': discrepancy.primary_site_code,
                    'attribute_logs': discrepancy_data.get('attribute', 'N/A'),
                    'audit_date': discrepancy.audit_date.strftime('%Y-%m-%d'),
                    'auditor_name': discrepancy.auditor_name,
                    'existing_value': discrepancy_data.get('existing_value', 'N/A'),
                    'location': 'N/A',
                    'new_value': discrepancy_data.get('new_value', 'N/A')
                })
                print(data)
            response = {
            'data': data,
            'page': discrepancies_page.number,
            'pages': paginator.num_pages,
            'per_page': per_page,
            'total': paginator.count
        }
        return JsonResponse(response, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    


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
    data = json.loads(request.body)
    if request.method == 'POST':
        data = json.loads(request.body)
        with transaction.atomic():
            for item in data:
                auditor_first_name = item.get('auditor_first_name')
                auditor_last_name = item.get('auditor_last_name')
                site_code = item.get('site_code')
                site_type = item.get('site_type')
                city = item.get('city')
                state = item.get('state')
                review_type = item.get('review_type')
                review_date = item.get('review_date')
                
                audit_session = AuditSessions(
                    id=uuid.uuid4(),
                    auditor_first_name=auditor_first_name,
                    auditor_last_name=auditor_last_name,
                    site_code=site_code,
                    site_type=site_type,
                    city=city,
                    state=state,
                    review_type=review_type,
                    # review_date=review_date,
                    site_id=site_id
                )
                audit_session.save()

        # return Response({'success': True}, status=status.HTTP_201_CREATED)

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


# import io
# from django.http import JsonResponse
# from django.core.mail import EmailMessage
# from reportlab.pdfgen import canvas
# from reportlab.lib.pagesizes import letter
# from reportlab.lib import colors
# from reportlab.platypus import SimpleDocTemplate, Table, TableStyle

# def generate_pdf(data):
#     # Create a file-like buffer to receive PDF data
#     buffer = io.BytesIO()

#     # Create the PDF object, using the buffer as its "file."
#     p = canvas.Canvas(buffer, pagesize=letter)

#     # Draw things on the PDF. Here's where the PDF generation happens.
#     # Let's assume 'data' is a list of dictionaries
#     y = 750
#     for item in data:
#         p.drawString(100, y, f"{item['attribute']}: Current Value: {item['currentValue']} Actual Value: {item['actualValue']}")
#         y -= 30

#     # Close the PDF object cleanly, and we're done.
#     p.showPage()
#     p.save()

#     # File-like buffer to rewind
#     buffer.seek(0)
#     return buffer

# def send_audit_report(request):
#     if request.method == 'POST':
#         # Assuming JSON data is sent with attribute details
#         data = request.json['auditData']

#         # Generate PDF
#         pdf = generate_pdf(data)

#         # Create email
#         email = EmailMessage(
#             'Audit Report Completed', 
#             'Find attached the PDF of the completed audit.', 
#             'from@example.com', 
#             ['to@example.com']
#         )

#         # Attach PDF
#         email.attach('audit_report.pdf', pdf.read(), 'application/pdf')

#         # Send the email
#         email.send()

#         return JsonResponse({'status': 'Email sent successfully'})
#     else:
#         return JsonResponse({'error': 'Invalid request'}, status=400)

# Sending Email Route:



def convert_data_to_html_table(kdi_data):
    table_header = """
    <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">
        <thead>
            <tr>
                <th>Attribute</th>
                <th>Current Value</th>
                <th>Actual Value</th>
                <th>Comments</th>
                <th>Flag as KDI</th>
            </tr>
        </thead>
        <tbody>
    """

    table_rows = ""
    for item in kdi_data:
        table_rows += f"""
        <tr>
            <td>{item.get('attribute', '')}</td>
            <td>{item.get('currentValue', '')}</td>
            <td>{item.get('actualValue', '')}</td>
            <td>{item.get('comments', '')}</td>
            <td>{item.get('flagAsKDI', False)}</td>
        </tr>
        """

    table_footer = """
        </tbody>
    </table>
    """

    return table_header + table_rows + table_footer


@api_view(['POST'])
def send_kdi_data(request):
    print("here?")
    print(request)
    try:
        # data = json.loads(request.body)2
        data=request.POST
        email = data.get('email')
        print(email)
        pdf = request.FILES['pdf']
        # print(pdf)
        # kdi_data = data.get('data')
        data_blob = request.FILES.get('data')
        print(data_blob)
        # kdi_data = json.loads(request.POST.get('data'))
        kdi_data = json.loads(data_blob.read())
        # file_path = default_storage.save(pdf.name, pdf)
        
        # Convert the list of dictionaries to a string for the email
        kdi_data_str = json.dumps(kdi_data, indent=2)
        kdi_data_html = convert_data_to_html_table(kdi_data)
        print("here")
        print(data,email, kdi_data_str)
        # send_mail(
        #     'KDI Data Report',
        #    f'<p>Here is your KDI flagged data:</p>{kdi_data_html}',
        #     'tphoenix318@gmail.com',  # Update with your actual sender email
        #     [email],
        #     fail_silently=False,
        # )
        email_message = EmailMessage(
            'KDI Data Report',
            f'Here is your KDI flagged data:\n{kdi_data_html}',
            'tphoenix318@gmail.com',  # Update with your actual sender email
            [email],
        )
        email_message.content_subtype = "html"

        # Attach the PDF file to the email
        # with open(file_path, 'rb') as f:
        #     email_message.attach(pdf.name, f.read(), 'application/zip')
        # email_message.attach(pdf.name, pdf.read(), pdf.content_type)
        email_message.send()
        
        return JsonResponse({"message": "Email sent successfully!"}, status=200)
    except Exception as e:
        print(e)
        # print(traceback.format_exc())
        return JsonResponse({"error": str(e)}, status=500)
