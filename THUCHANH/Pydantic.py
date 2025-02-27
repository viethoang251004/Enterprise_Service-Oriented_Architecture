import re
from pydantic import BaseModel, Field, validator

class UserRegistrationForm(BaseModel):
    username: str = Field(..., regex=r'^[A-Za-z0-9_]{5,}$')
    password: str = Field(..., regex=r'^(?=.*[A-Z])(?=.*\d).{8,}$')
    email: str = Field(..., regex=r'^[\w.-]+@[\w.-]+\.\w+$')

    @validator('username')
    def validate_username(cls, username):
        if not re.match(r'^[A-Za-z0-9_]{5,}$', username):
            raise ValueError("Username must be at least 5 characters long without special characters")
        return username

    @validator('password')
    def validate_password(cls, password):
        if not re.match(r'^(?=.*[A-Z])(?=.*\d).{8,}$', password):
            raise ValueError("Password must contain at least 8 characters, including one uppercase letter and one number")
        return password

    @validator('email')
    def validate_email(cls, email):
        if not re.match(r'^[\w.-]+@[\w.-]+\.\w+$', email):
            raise ValueError("Invalid email format")
        return email
    
