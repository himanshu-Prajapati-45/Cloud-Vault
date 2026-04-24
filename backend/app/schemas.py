from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

<<<<<<< HEAD

=======
>>>>>>> b98c8ba4272dd4ee9a18958b0041b2b4dbbbf71f
class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str

<<<<<<< HEAD

=======
>>>>>>> b98c8ba4272dd4ee9a18958b0041b2b4dbbbf71f
class UserOut(BaseModel):
    id: str
    full_name: str
    email: EmailStr
    storage_used_bytes: int

<<<<<<< HEAD

=======
>>>>>>> b98c8ba4272dd4ee9a18958b0041b2b4dbbbf71f
class Token(BaseModel):
    access_token: str
    token_type: str
    full_name: Optional[str] = None
<<<<<<< HEAD
    auth_provider: Optional[str] = None
    email: Optional[str] = None


class GoogleAuthRequest(BaseModel):
    credential: str


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str


class ChangePasswordRequest(BaseModel):
    current_password: str = ""
    new_password: str
=======

class GoogleAuthRequest(BaseModel):
    credential: str
>>>>>>> b98c8ba4272dd4ee9a18958b0041b2b4dbbbf71f
