from django.urls import path
from . import views
from django.urls import path
from .swagger import schema_view
from .views import send_kdi_data 


app_name = 'my_app'
urlpatterns = [
    path('', views.home, name='home'),
    path('get/<str:site_id>/', views.get_users, name='get'),
    path('post/<str:site_id>/', views.handle_site_id),
    path('discrepancy/<str:site_id>', views.update_audit_log),
    path('send-email/', views.send_kdi_data),
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

]

# urlpatterns = []
