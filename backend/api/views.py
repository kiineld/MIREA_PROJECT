from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from .models import CustomUser
from .serializers import CreateUserSerializer
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.jwt_auth import set_jwt_refresh_cookie, set_jwt_access_cookie


class CreateCustomUser(CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CreateUserSerializer
    permission_classes = [AllowAny]




class RegisterViewWithCookies(RegisterView):
    def get_response_data(self, user):
        data = super().get_response_data(user)
        return data

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)

        access = response.data.get("access")
        refresh = response.data.get("refresh")

        if access:
            set_jwt_access_cookie(response, access)
        if refresh:
            set_jwt_refresh_cookie(response, refresh)

        return response