from rest_framework import serializers as serializers_drf
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth import serializers as dj_serializers
from .models import CustomUser


class CreateUserSerializer(serializers_drf.ModelSerializer):
    password1 = serializers_drf.CharField(write_only=True)
    password2 = serializers_drf.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password1', 'password2']
        extra_kwargs = {"password": {"write_only": True}, "password2": {"write_only": True}, "password1": {"write_only": True}}

    def validate(self, attrs):
        if attrs["password1"] != attrs["password2"]:
            raise serializers_drf.ValidationError({"password2": "Passwords do not match"})
        return attrs

    def create(self, validated_data):
        password = validated_data.pop("password1")
        validated_data.pop("password2", None)
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()
        return user


class CustomUserDetailsSerializer(dj_serializers.UserDetailsSerializer):
    class Meta(dj_serializers.UserDetailsSerializer.Meta):
        fields = ('pk', 'username', 'email', 'is_analyst', 'is_manager', 'is_storekeeper')


class CustomRegisterSerializer(RegisterSerializer):
    username = serializers_drf.CharField(required=False, max_length=150)

    def validate_username(self, username):
        return username

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data["username"] = self.validated_data.get("username", "")
        return data


class EmailLoginSerializer(dj_serializers.LoginSerializer):
    username = None  # remove username field completely
    email = serializers_drf.EmailField(required=True)

    def validate(self, attrs):
        # dj-rest-auth expects "username" internally, so map email -> username
        attrs["username"] = attrs.get("email")
        return super().validate(attrs)