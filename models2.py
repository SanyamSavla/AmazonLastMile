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
# Unable to inspect table 'attribute'
# The error was: relation "attribute" does not exist
# LINE 1: SELECT * FROM "attribute" LIMIT 1

# from django.contrib.postgres.fields import JSONField
# import uuid

                      
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
#         db_table = 'test'
