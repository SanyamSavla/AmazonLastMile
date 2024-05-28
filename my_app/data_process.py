# # import boto3
# # import pandas as pd
# # from my_app.models import MyModel
# # from .models import Site, AuditSession, Attribute, finalAuditAttribute

# # # Initialize S3 client
# # s3 = boto3.client('s3')

# # def process_excel_data():
# #     # Read Excel file from S3
# #     bucket_name = 'your-bucket-name'
# #     key = 'path/to/your/excel-file.xlsx'
# #     response = s3.get_object(Bucket=bucket_name, Key=key)
# #     excel_data = pd.read_excel(response['Body'])
# #     process_excel_data(excel_data)

# #     # Iterate over rows and insert data into Django models
# #     # for index, row in excel_data.iterrows():
# #     #     # Extract data from the row and create an instance of your model
# #     #     instance = MyModel(field1=row['Column1'], field2=row['Column2'], ...)  # Adjust this according to your model fields

# #     #     # Save the instance to the database
# #     #     instance.save()

# # # Call the function to process the Excel data
# # process_excel_data()

# # def process_excel_data(excel_data):
# #     for index, row in excel_data.iterrows():
# #         # Create Site instance
# #         site_instance = Site.objects.create(
# #             name=row['Site Name'],
# #             location=row['Site Location']
# #         )
# #         # Create AuditSession instance
# #         audit_session_instance = AuditSession.objects.create(
# #             revision_date=row['Revision Date'],
# #             auditor_id=row['Auditor ID'],  # Assuming you have this data
# #             site=site_instance
# #         )
# #         # Create Attribute instance
# #         attribute_instance = Attribute.objects.create(
# #             attribute=row['Attribute'],
# #             sub_attribute=row['Sub Attribute']
# #         )
# #         # Create finalAuditAttribute instance
# #         final_audit_attribute_instance = finalAuditAttribute.objects.create(
# #             site=site_instance,
# #             attribute=attribute_instance,
# #             audit=audit_session_instance,
# #             value=row['Value']
# #         )

# # def process_excel_file(file_path):
# #     # Read Excel file into a DataFrame
# #     excel_data = pd.read_excel(file_path)

# #     # Process the Excel data
# #     process_excel_data(excel_data)

# # # Call the function to process the Excel file
# # process_excel_file('path/to/your/excel_file.xlsx')

# ### 

# # print("here.!")

# # import pandas as pd
# # import boto3
# # from io import BytesIO
# # import csv
# # import os
# # os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lastMile.settings')

# # def convert_excel_to_attributes(bucket_name, excel_file_key):
# #     # Connect to S3

# #     from models import Attribute
# #     s3 = boto3.client('s3')

# #     # Read the Excel file from S3
# #     response = s3.get_object(Bucket=bucket_name, Key=excel_file_key)

# #     # csv_data = response['Body'].read().decode('utf-8').splitlines()
# #     excel_data = response['Body'].read()

# #     # Load Excel data into pandas DataFrame
# #     df = pd.read_excel(BytesIO(excel_data))
# #     # csv_reader = csv.reader(excel_data)

# #     # Get column names from the Excel sheet
# #     column_names = df.columns.tolist()

# #     # Iterate through column names and create Attribute objects
# #     for column_name in column_names:
# #         # Check if the attribute already exists
# #         if not Attribute.objects.filter(attribute=column_name).exists():
# #             # Create a new Attribute object
# #             attribute = Attribute(attribute=column_name)
# #             # Save the Attribute object to the database
# #             attribute.save()
# #             print(f"Attribute '{column_name}' saved successfully.")

# # # Specify the name of your S3 bucket and the key of the Excel file within the bucket
# # bucket_name = 'digitaltwin-dssq'
# # excel_file_key = 'digitaltwin-dssq/dummy_data_dev.csv'


# # # Call the function to convert Excel columns to Attribute objects
# # convert_excel_to_attributes(bucket_name, excel_file_key)


# import boto3
# import pandas as pd
# import os
# import django
# from lastMile import settings

# # Assuming the Django settings.py file is within the 'AMAZON' directory
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lastMile.settings')
# django.setup()

# from models import Attribute

# def load_excel_from_s3(bucket_name, file_key):
#     # Initialize a session using boto3
#     s3 = boto3.client('s3')
    
#     # Get an object and download file from S3 to temp file
#     obj = s3.get_object(Bucket=bucket_name, Key=file_key)
    
#     # Load the data into pandas DataFrame
#     data = pd.read_excel(obj['Body'].read(), engine='openpyxl')
    
#     return data

# def insert_into_database(df):
#     for column in df.columns:
#         # Create an instance of the Attribute model
#         attribute = Attribute(attribute=column, sub_attribute="")
#         # Save the instance to the database
#         attribute.save()

# def main():
#     bucket_name = 'digitaltwin-dssq'
#     file_key = 'digitaltwin-dssq/dummy_data_dev.xlsx'
    
#     # Load the dataframe from S3
#     df = load_excel_from_s3(bucket_name, file_key)
    
#     # Insert data into the database
#     insert_into_database(df)


from django.core.mail.backends.smtp import EmailBackend
import ssl

class MyEmailBackend(EmailBackend):
    def open(self):
        try:
            self.connection = self.connection_class(self.host, self.port, **self.connection_params)
            self.connection.ehlo_or_helo_if_needed()
            if self.connection.has_extn('starttls'):
                self.connection.starttls()
                self.connection.ehlo()
            self.connection.login(self.username, self.password)
        except:
            if not self.fail_silently:
                raise

if __name__ == '__main__':
    main()
