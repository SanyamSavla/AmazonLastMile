# AKIAZI2LFLFO4T7EHARZ
# environ({'MallocNanoZone': '0', 'USER': 'stlp', 'COMMAND_MODE': 'unix2003', '__CFBundleIdentifier': 'com.microsoft.VSCode', 'PATH': '/Users/stlp/.vscode/extensions/ms-python.python-2024.4.0/python_files/deactivate/zsh:/Users/stlp/Desktop/amazon/.venv/bin:/usr/local/bin:/Users/stlp/.vscode/extensions/ms-python.python-2024.4.0/python_files/deactivate/zsh:/Users/stlp/Desktop/amazon/.venv/bin:/opt/local/bin:/opt/local/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/Users/stlp/.vscode/extensions/ms-python.python-2024.4.0/python_files/deactivate/zsh:/Users/stlp/Desktop/amazon/.venv/bin:/opt/local/bin:/opt/local/sbin', 'LOGNAME': 'stlp', 'SSH_AUTH_SOCK': '/private/tmp/com.apple.launchd.B9yh5hus16/Listeners', 'HOME': '/Users/stlp', 'SHELL': '/bin/zsh', 'TMPDIR': '/var/folders/n_/m5pd8vkn6j3_184_9c73m8dw0000gn/T/', '__CF_USER_TEXT_ENCODING': '0x1F5:0x0:0x0', 'XPC_SERVICE_NAME': '0', 'XPC_FLAGS': '0x0', 'ORIGINAL_XDG_CURRENT_DESKTOP': 'undefined', 'SHLVL': '1', 'PWD': '/Users/stlp/Desktop/amazon', 'OLDPWD': '/Users/stlp/Desktop/amazon', 'TERM_PROGRAM': 'vscode', 'TERM_PROGRAM_VERSION': '1.87.2', 'LANG': 'en_US.UTF-8', 'COLORTERM': 'truecolor', 'GIT_ASKPASS': '/private/var/folders/n_/m5pd8vkn6j3_184_9c73m8dw0000gn/T/AppTranslocation/B48EFF7B-2984-4A8C-9DE1-7BA4F37A02DE/d/Visual Studio Code.app/Contents/Resources/app/extensions/git/dist/askpass.sh', 'VSCODE_GIT_ASKPASS_NODE': '/private/var/folders/n_/m5pd8vkn6j3_184_9c73m8dw0000gn/T/AppTranslocation/B48EFF7B-2984-4A8C-9DE1-7BA4F37A02DE/d/Visual Studio Code.app/Contents/Frameworks/Code Helper (Plugin).app/Contents/MacOS/Code Helper (Plugin)', 'VSCODE_GIT_ASKPASS_EXTRA_ARGS': '', 'VSCODE_GIT_ASKPASS_MAIN': '/private/var/folders/n_/m5pd8vkn6j3_184_9c73m8dw0000gn/T/AppTranslocation/B48EFF7B-2984-4A8C-9DE1-7BA4F37A02DE/d/Visual Studio Code.app/Contents/Resources/app/extensions/git/dist/askpass-main.js', 'VSCODE_GIT_IPC_HANDLE': '/var/folders/n_/m5pd8vkn6j3_184_9c73m8dw0000gn/T/vscode-git-25c7461c8c.sock', 'AWS_ACCESS_KEY_ID': 'AKIAZI2LFLFO4T7EHARZ', 'AWS_SECRET_ACCESS_KEY': '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', 'region': 'us-west-2b', 'RDS_SECRET_NAME': 'rds-db-credentials/databaseaudit/amazon/1712009767156', 'VIRTUAL_ENV': '/Users/stlp/Desktop/amazon/.venv', 'VIRTUAL_ENV_PROMPT': '(.venv) ', 'VSCODE_INJECTION': '1', 'ZDOTDIR': '/Users/stlp', 'USER_ZDOTDIR': '/Users/stlp', 'TERM': 'xterm-256color', 'PS1': '((.venv) ) %n@%m %1~ %# ', '_': '/Users/stlp/Desktop/amazon/.venv/bin/python', 'DJANGO_SETTINGS_MODULE': 'lastMile.settings', 'AWS_DEFAULT_REGION': 'uw-west-2'})
# # This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class MyAppAttribute(models.Model):
    attribute_id = models.AutoField(primary_key=True)
    attribute = models.CharField(max_length=255)
    sub_attribute = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'my_app_attribute'


class MyAppAuditor(models.Model):
    id = models.BigAutoField(primary_key=True)
    bio = models.TextField()
    name = models.CharField(max_length=255)
    user = models.OneToOneField(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'my_app_auditor'


class MyAppAuditsession(models.Model):
    audit_id = models.AutoField(primary_key=True)
    revision_date = models.DateField()
    auditor = models.ForeignKey(MyAppAuditor, models.DO_NOTHING)
    site = models.ForeignKey('MyAppSite', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'my_app_auditsession'


class MyAppFinalauditattribute(models.Model):
    id = models.BigAutoField(primary_key=True)
    value = models.TextField()
    attribute = models.ForeignKey(MyAppAttribute, models.DO_NOTHING, db_column='Attribute_id')  # Field name made lowercase.
    audit = models.ForeignKey(MyAppAuditsession, models.DO_NOTHING)
    site = models.ForeignKey('MyAppSite', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'my_app_finalauditattribute'


class MyAppSite(models.Model):
    site_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'my_app_site'
