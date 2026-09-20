import os
from dotenv import load_dotenv
from pathlib import Path

# Load from the root project .env if running from python_backend or root
env_path = Path(__file__).parent.parent / ".env"
if env_path.exists():
    load_dotenv(dotenv_path=env_path)
else:
    load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://127.0.0.1:27017/cityconnect")
JWT_SECRET = os.getenv("JWT_SECRET", "cityconnect_super_secret_key_2026")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 30  # 30 days
