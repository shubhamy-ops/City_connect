from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, issues, stats

app = FastAPI(title="CityConnect API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router)
app.include_router(issues.router)
app.include_router(stats.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to CityConnect API"}
