from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import  staticfiles_urlpatterns



urlpatterns = [
    path('admin/', admin.site.urls),
    path('authentication/', include('authentication.urls')),
    path('product/', include('product.urls')),
    path('profile/', include('profile_user.urls')),
    path('shipping/', include('shipping.urls')),
    path('order/', include('order.urls')),
    path('category/', include('category.urls')),
    path('reviews/', include('reviews.urls')),
    path('admin_panel/', include('admin_panel.urls'))
]



urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

urlpatterns += staticfiles_urlpatterns()
