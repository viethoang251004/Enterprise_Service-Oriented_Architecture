from pydantic import BaseModel, constr, validator
import re


class UserRegistration(BaseModel):
    username: constr(min_length=5)
    password: constr(min_length=8)
    email: str

    @validator('username')
    def validate_username(cls, value):
        if not re.match(r'^[a-zA-Z0-9_]{5,}$', value):
            raise ValueError(
                "Username must be at least 5 characters long and contain only alphanumeric characters or underscores")
        return value

    @validator('password')
    def validate_password(cls, value):
        if not re.match(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$', value):
            raise ValueError(
                "Password must be at least 8 characters long, containing at least one number and one uppercase letter")
        return value

    @validator('email')
    def validate_email(cls, value):
        if not re.match(r'^[\w\.-]+@[\w\.-]+$', value):
            raise ValueError("Invalid email format")
        return value


user_data = {
    "username": "user123",
    "password": "Password123",
    "email": "user123@yahoo.com"
}

try:
    user = UserRegistration(**user_data)
    print("User registration successful!")
except ValueError as e:
    print(e)
