# AKIAZI2LFLFO4T7EHARZ
# environ({'MallocNanoZone': '0', 'USER': 'stlp', 'COMMAND_MODE': 'unix2003', '__CFBundleIdentifier': 'com.microsoft.VSCode', 'PATH': '/Users/stlp/.vscode/extensions/ms-python.python-2024.4.0/python_files/deactivate/zsh:/Users/stlp/Desktop/amazon/.venv/bin:/usr/local/bin:/Users/stlp/.vscode/extensions/ms-python.python-2024.4.0/python_files/deactivate/zsh:/Users/stlp/Desktop/amazon/.venv/bin:/opt/local/bin:/opt/local/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/Users/stlp/.vscode/extensions/ms-python.python-2024.4.0/python_files/deactivate/zsh:/Users/stlp/Desktop/amazon/.venv/bin:/opt/local/bin:/opt/local/sbin', 'LOGNAME': 'stlp', 'SSH_AUTH_SOCK': '/private/tmp/com.apple.launchd.B9yh5hus16/Listeners', 'HOME': '/Users/stlp', 'SHELL': '/bin/zsh', 'TMPDIR': '/var/folders/n_/m5pd8vkn6j3_184_9c73m8dw0000gn/T/', '__CF_USER_TEXT_ENCODING': '0x1F5:0x0:0x0', 'XPC_SERVICE_NAME': '0', 'XPC_FLAGS': '0x0', 'ORIGINAL_XDG_CURRENT_DESKTOP': 'undefined', 'SHLVL': '1', 'PWD': '/Users/stlp/Desktop/amazon', 'OLDPWD': '/Users/stlp/Desktop/amazon', 'TERM_PROGRAM': 'vscode', 'TERM_PROGRAM_VERSION': '1.87.2', 'LANG': 'en_US.UTF-8', 'COLORTERM': 'truecolor', 'GIT_ASKPASS': '/private/var/folders/n_/m5pd8vkn6j3_184_9c73m8dw0000gn/T/AppTranslocation/B48EFF7B-2984-4A8C-9DE1-7BA4F37A02DE/d/Visual Studio Code.app/Contents/Resources/app/extensions/git/dist/askpass.sh', 'VSCODE_GIT_ASKPASS_NODE': '/private/var/folders/n_/m5pd8vkn6j3_184_9c73m8dw0000gn/T/AppTranslocation/B48EFF7B-2984-4A8C-9DE1-7BA4F37A02DE/d/Visual Studio Code.app/Contents/Frameworks/Code Helper (Plugin).app/Contents/MacOS/Code Helper (Plugin)', 'VSCODE_GIT_ASKPASS_EXTRA_ARGS': '', 'VSCODE_GIT_ASKPASS_MAIN': '/private/var/folders/n_/m5pd8vkn6j3_184_9c73m8dw0000gn/T/AppTranslocation/B48EFF7B-2984-4A8C-9DE1-7BA4F37A02DE/d/Visual Studio Code.app/Contents/Resources/app/extensions/git/dist/askpass-main.js', 'VSCODE_GIT_IPC_HANDLE': '/var/folders/n_/m5pd8vkn6j3_184_9c73m8dw0000gn/T/vscode-git-25c7461c8c.sock', 'AWS_ACCESS_KEY_ID': 'AKIAZI2LFLFO4T7EHARZ', 'AWS_SECRET_ACCESS_KEY': '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', 'region': 'us-west-2b', 'RDS_SECRET_NAME': 'rds-db-credentials/databaseaudit/amazon/1712009767156', 'VIRTUAL_ENV': '/Users/stlp/Desktop/amazon/.venv', 'VIRTUAL_ENV_PROMPT': '(.venv) ', 'VSCODE_INJECTION': '1', 'ZDOTDIR': '/Users/stlp', 'USER_ZDOTDIR': '/Users/stlp', 'TERM': 'xterm-256color', 'PS1': '((.venv) ) %n@%m %1~ %# ', '_': '/Users/stlp/Desktop/amazon/.venv/bin/python', 'DJANGO_SETTINGS_MODULE': 'lastMile.settings', 'AWS_DEFAULT_REGION': 'uw-west-2'})
# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Attributes(models.Model):
    # primary_site_code = models.CharField(max_length=255, blank=True)
    primary_site_code = models.CharField(primary_key=True, max_length=255)
    city = models.CharField(max_length=255, blank=True, null=True)
    state = models.CharField(max_length=255, blank=True, null=True)
    msa = models.CharField(max_length=255, blank=True, null=True)
    design_type = models.CharField(max_length=255, blank=True, null=True)
    mhe_type = models.CharField(max_length=255, blank=True, null=True)
    locationstatus = models.CharField(max_length=255, blank=True, null=True)
    building_footprint = models.CharField(max_length=255, blank=True, null=True)
    office_support_area_size = models.CharField(max_length=255, blank=True, null=True)
    plot_size_field = models.CharField(db_column='plot_size_', max_length=255, blank=True, null=True)  # Field renamed because it ended with '_'.
    usable_acreage_field = models.CharField(db_column='usable_acreage_', max_length=255, blank=True, null=True)  # Field renamed because it ended with '_'.
    package_inbound_truck_type = models.CharField(max_length=255, blank=True, null=True)
    package_unload_medium = models.CharField(max_length=255, blank=True, null=True)
    induct_mechanism = models.CharField(max_length=255, blank=True, null=True)
    design_labor_ratio = models.CharField(max_length=255, blank=True, null=True)
    sort_zones_per_row = models.CharField(max_length=255, blank=True, null=True)
    wavesfordispatchstaging = models.CharField(max_length=255, blank=True, null=True)
    pickcartsperroute = models.CharField(max_length=255, blank=True, null=True)
    loadingtype = models.CharField(max_length=255, blank=True, null=True)
    loadingside = models.CharField(max_length=255, blank=True, null=True)
    loadoutdooratgrade = models.CharField(max_length=255, blank=True, null=True)
    demisingwallinpickstagearea = models.CharField(max_length=255, blank=True, null=True)
    canopyoverlaunchpads = models.CharField(max_length=255, blank=True, null=True)
    vanparkingconfigurationonsite = models.CharField(max_length=255, blank=True, null=True)
    designfph = models.CharField(max_length=255, blank=True, null=True)
    systemfph = models.CharField(max_length=255, blank=True, null=True)
    designpeakspr = models.CharField(max_length=255, blank=True, null=True)
    designpeakspr_co = models.CharField(max_length=255, blank=True, null=True)
    totalhconsite = models.CharField(max_length=255, blank=True, null=True)
    dockdoorsinbound = models.CharField(max_length=255, blank=True, null=True)
    dockdoorsgocartreturn = models.CharField(max_length=255, blank=True, null=True)
    dockdoorspalletremoval = models.CharField(max_length=255, blank=True, null=True)
    manualfingers = models.CharField(max_length=255, blank=True, null=True)
    adtafingers = models.CharField(max_length=255, blank=True, null=True)
    induct_stations_asl = models.CharField(max_length=255, blank=True, null=True)
    inductstations_manual = models.CharField(max_length=255, blank=True, null=True)
    number_of_launchpads = models.CharField(max_length=255, blank=True, null=True)
    loading_spots = models.CharField(max_length=255, blank=True, null=True)
    queueing_spots = models.CharField(max_length=255, blank=True, null=True)
    loading_spots_for_parking = models.CharField(max_length=255, blank=True, null=True)
    queuing_spots_for_parking = models.CharField(max_length=255, blank=True, null=True)
    associate_parking_ratio = models.CharField(max_length=255, blank=True, null=True)
    pick_cart_staging = models.CharField(max_length=255, blank=True, null=True)
    inbound_staging = models.CharField(max_length=255, blank=True, null=True)
    inbound_staging_d = models.CharField(max_length=255, blank=True, null=True)
    total_van_parking_designed = models.CharField(max_length=255, blank=True, null=True)
    total_personal_parking_designed = models.CharField(max_length=255, blank=True, null=True)
    bts_template = models.CharField(max_length=255, blank=True, null=True)
    drs_version = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'attributes'


class Test(models.Model):
    attribute_id = models.AutoField(primary_key=True)
    attribute_name = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'test'


from django.db.models import JSONField
import uuid

# class Discrepency(models.Model):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     attribute = models.ForeignKey(Attributes, on_delete=models.CASCADE, related_name='audit_logs')
#     # site_details = models.CharField(max_length=255)
#     audit_date = models.DateTimeField()
#     auditor_name = models.CharField(max_length=100)
#     discrepancy = JSONField()

#     def __str__(self):
#         return f"{self.site_code} - {self.auditor_name}"
    
#     class Meta:
#         managed = False
#         db_table = 'Discrepancy'

class Discrepency(models.Model):
    id = models.UUIDField(primary_key=True)
    primary_site_code = models.ForeignKey(Attributes, models.DO_NOTHING, db_column='primary_site_code', blank=True, null=True)
    audit_date = models.DateTimeField()
    auditor_name = models.CharField(max_length=100)
    discrepancy = models.JSONField()

    class Meta:
        managed = False
        db_table = 'discrepancy'
