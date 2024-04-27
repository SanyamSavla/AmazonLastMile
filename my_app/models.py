from django.db import models

from django.contrib.auth.models import User
# class Post(models.Model):
#     title = models.CharField(max_length=200)
#     content = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

class Auditor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return "{} {}".format(self.user, 'Profile')

class Site(models.Model):
  site_id = models.AutoField(primary_key=True)
  name = models.CharField(max_length=255)
  location = models.CharField(max_length=255)

class AuditSession(models.Model):
  audit_id = models.AutoField(primary_key=True)
  # revision = models.CharField(max_length=255)
  revision_date = models.DateField()
  auditor = models.ForeignKey(Auditor, on_delete=models.CASCADE)
  site= models.ForeignKey(Site, on_delete=models.CASCADE)

class Attribute(models.Model):
  attribute_id = models.AutoField(primary_key=True)
  attribute = models.CharField(max_length=255)
  sub_attribute= models.CharField(max_length=255)



class finalAuditAttribute(models.Model):
   site= models.ForeignKey(Site, on_delete=models.CASCADE)
   Attribute= models.ForeignKey(Attribute, on_delete=models.CASCADE)
   audit= models.ForeignKey(AuditSession, on_delete=models.CASCADE)
   value = models.TextField()

# class Auditor(models.Model):
#   user_id = models.IntegerField(primary_key=True)
#   name = models.CharField(max_length=255)
#   designation = models.CharField(max_length=255)
#   admin_status = models.BooleanField()

# class Site(models.Model):
#   primary_site_code = models.CharField(max_length=255, primary_key=True)
#   city = models.CharField(max_length=255)
#   state=models.CharField(max_length=255)
#   design_type = models.CharField(max_length=255)
#   mhe_type = models.CharField(max_length=255)
#   location_status = models.CharField(max_length=255)
#   building_footprint = models.IntegerField()  # Assuming sqft is stored as an integer
#   office_support_area_size = models.IntegerField()  # Assuming sqft is stored as an integer
#   plot_size = models.FloatField()  # Assuming acreage is stored as a decimal value
#   usable_acreage = models.FloatField()  # Assuming acreage is stored as a decimal value
#   package_inbound_truck_type = models.CharField(max_length=255)
#   package_unload_medium = models.CharField(max_length=255)

# class Inbound(models.Model):
#   induct_mechanism = models.CharField(max_length=255)
#   induct_stations_asl = models.IntegerField()
#   induct_stations_manual = models.IntegerField()
#   inbound_staging_go_cart = models.IntegerField()
#   inbound_staging_plt = models.IntegerField()
#   dock_doors_inbound = models.IntegerField()
#   dock_doors_go_cart_return = models.IntegerField()
#   dock_doors_pallet_removal = models.IntegerField()

# class Staging(models.Model):
#   pick_carts_per_route = models.IntegerField()

# class Loading(models.Model):
#     loading_type = models.CharField(max_length=255)
#     loading_side = models.CharField(max_length=255)
#     loadout_door_at_grade = models.BooleanField()
#     number_of_launchpads = models.IntegerField()
#     loading_spots = models.IntegerField()
#     loading_spots_for_parking = models.IntegerField()

# class Parking(models.Model):
#     van_parking_configuration_on_site = models.CharField(max_length=255)
#     queuing_spots_for_parking = models.IntegerField()
#     associate_parking_ratio = models.FloatField() #percentages
#     total_van_parking_designed = models.IntegerField()


# class Discrepancy(models.Model):
#   discrepancy_id = models.IntegerField(primary_key=True)
#   existing_value = models.IntegerField()
#   actual_value = models.IntegerField()
#   attribute = models.ForeignKey(Attribute, on_delete=models.CASCADE)


# class Log(models.Model):
#   name = models.CharField(max_length=255)
#   audit_date = models.DateTimeField() #fetch from audit
#   comment = models.CharField(max_length=255)
#   critical = models.BooleanField()
#   non_critical = models.BooleanField()
#   ds_id = models.IntegerField()
#   ds_design_id = models.IntegerField()
#   auditor = models.ForeignKey(Auditor, on_delete=models.CASCADE)
#   site = models.ForeignKey(Site, on_delete=models.CASCADE)
#   discrepancy = models.ForeignKey(Discrepancy, on_delete=models.CASCADE)
#   induction_mechanism = models.ForeignKey(InductionMechanism, on_delete=models.CASCADE)

from django.db.models import JSONField
import uuid
from .models3 import Attributes


class Discrepency_audit(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    attribute = models.ForeignKey(Attributes, on_delete=models.CASCADE, related_name='audit_logs_1')
    # site_details = models.CharField(max_length=255)
    audit_date = models.DateTimeField()
    auditor_name = models.CharField(max_length=100)
    discrepancy = JSONField()

    def __str__(self):
        return f"{self.site_code} - {self.auditor_name}"
    
    class Meta:
        managed = False
        db_table = 'Discrepancy_audit'