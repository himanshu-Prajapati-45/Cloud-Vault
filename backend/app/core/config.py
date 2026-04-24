import os
from pydantic_settings import BaseSettings

<<<<<<< HEAD

class Settings(BaseSettings):
    MONGO_URI: str = os.getenv("MONGO_URI", "mongodb://localhost:27017/cloudvault")
    SECRET_KEY: str = os.getenv("SECRET_KEY")
    GOOGLE_CLIENT_ID: str = os.getenv("GOOGLE_CLIENT_ID", "YOUR_GOOGLE_CLIENT_ID")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:5173")

=======
class Settings(BaseSettings):
    MONGO_URI: str = os.getenv("MONGO_URI", "mongodb://localhost:27017/cloudvault")
    SECRET_KEY: str
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    
>>>>>>> b98c8ba4272dd4ee9a18958b0041b2b4dbbbf71f
    AWS_ACCESS_KEY_ID: str = os.getenv("AWS_ACCESS_KEY_ID", "")
    AWS_SECRET_ACCESS_KEY: str = os.getenv("AWS_SECRET_ACCESS_KEY", "")
    AWS_REGION: str = os.getenv("AWS_REGION", "ap-south-1")
    S3_BUCKET_NAME: str = os.getenv("S3_BUCKET_NAME", "cloudvault-files")

<<<<<<< HEAD
    # Email / SMTP
    SMTP_HOST: str = os.getenv("SMTP_HOST", "smtp.gmail.com")
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", "587"))
    SMTP_USER: str = os.getenv("SMTP_USER", "")
    SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "")
    EMAIL_FROM: str = os.getenv("EMAIL_FROM", "noreply@cloudvault.app")
    APP_NAME: str = os.getenv("APP_NAME", "CloudVault")
=======
    VITE_GOOGLE_CLIENT_ID: str = os.getenv("VITE_GOOGLE_CLIENT_ID", "")
>>>>>>> b98c8ba4272dd4ee9a18958b0041b2b4dbbbf71f

    class Config:
        env_file = ".env"

<<<<<<< HEAD

=======
>>>>>>> b98c8ba4272dd4ee9a18958b0041b2b4dbbbf71f
settings = Settings()
