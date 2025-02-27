from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # DB
    db_username: str
    db_password: str
    db_server: str
    db_port: int = 8001

    debug_mode: bool = False
    app_name: str

    class Config:
        env_file = ".env"  # Load settings from a .env file, if available
        env_prefix = "app_"  # Prefix for environment variables


settings = Settings()
print("Database settings:")
print("Username:", settings.db_username)
print("Password:", settings.db_password)
print("Server:", settings.db_server)
print("Port:", settings.db_port)

print("\nApplication-specific settings:")
print("Debug mode:", settings.debug_mode)
print("Application name:", settings.app_name)
