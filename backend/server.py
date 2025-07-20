from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="iBook API", description="API for interactive book application")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Helper function to convert ObjectId to string
def str_object_id(v):
    return str(v) if isinstance(v, ObjectId) else v

# Define Models
class QuizResult(BaseModel):
    answer: str
    is_correct: Optional[bool] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class UserProgress(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    user_id: str
    current_step: int = 1
    completed_steps: List[int] = Field(default_factory=list)
    notes: Dict[str, str] = Field(default_factory=dict)
    quiz_results: Dict[str, QuizResult] = Field(default_factory=dict)
    last_accessed: datetime = Field(default_factory=datetime.utcnow)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}

class UserProgressCreate(BaseModel):
    user_id: str
    current_step: int = 1
    completed_steps: List[int] = Field(default_factory=list)

class SaveNoteRequest(BaseModel):
    user_id: str
    step_id: int
    note: str

class SaveQuizRequest(BaseModel):
    user_id: str
    step_id: int
    result: QuizResult

class CompleteStepRequest(BaseModel):
    user_id: str
    step_id: int

# Book content (static for now)
BOOK_DATA = {
    "title": "Comment Réussir sa Vie en 10 Étapes",
    "subtitle": "Un guide interactif pour transformer votre vie",
    "author": "Guide de Développement Personnel",
    "totalSteps": 10
}

# Routes
@api_router.get("/")
async def root():
    return {"message": "iBook API is running", "version": "1.0.0"}

@api_router.get("/book/content")
async def get_book_content():
    """Get static book content"""
    return BOOK_DATA

@api_router.get("/user/progress/{user_id}", response_model=UserProgress)
async def get_user_progress(user_id: str):
    """Get user progress by user_id"""
    try:
        progress = await db.user_progress.find_one({"user_id": user_id})
        if not progress:
            raise HTTPException(status_code=404, detail="User progress not found")
        
        # Convert ObjectId to string
        progress["_id"] = str(progress["_id"])
        return UserProgress(**progress)
    except Exception as e:
        logging.error(f"Error getting user progress: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.post("/user/progress", response_model=UserProgress)
async def create_or_update_progress(progress_data: UserProgressCreate):
    """Create or update user progress"""
    try:
        # Check if user already exists
        existing = await db.user_progress.find_one({"user_id": progress_data.user_id})
        
        now = datetime.utcnow()
        
        if existing:
            # Update existing progress
            update_data = {
                "current_step": progress_data.current_step,
                "completed_steps": progress_data.completed_steps,
                "last_accessed": now,
                "updated_at": now
            }
            
            await db.user_progress.update_one(
                {"user_id": progress_data.user_id},
                {"$set": update_data}
            )
            
            # Get updated document
            updated = await db.user_progress.find_one({"user_id": progress_data.user_id})
            updated["_id"] = str(updated["_id"])
            return UserProgress(**updated)
        else:
            # Create new progress
            new_progress = UserProgress(
                user_id=progress_data.user_id,
                current_step=progress_data.current_step,
                completed_steps=progress_data.completed_steps,
                created_at=now,
                updated_at=now,
                last_accessed=now
            )
            
            progress_dict = new_progress.dict(exclude={"id"})
            result = await db.user_progress.insert_one(progress_dict)
            
            new_progress.id = str(result.inserted_id)
            return new_progress
            
    except Exception as e:
        logging.error(f"Error creating/updating user progress: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.put("/user/notes")
async def save_user_note(note_request: SaveNoteRequest):
    """Save a user note for a specific step"""
    try:
        # Update the user's notes
        result = await db.user_progress.update_one(
            {"user_id": note_request.user_id},
            {
                "$set": {
                    f"notes.{note_request.step_id}": note_request.note,
                    "updated_at": datetime.utcnow(),
                    "last_accessed": datetime.utcnow()
                }
            }
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="User not found")
            
        return {"message": "Note saved successfully"}
        
    except Exception as e:
        logging.error(f"Error saving note: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.put("/user/quiz-results")
async def save_quiz_result(quiz_request: SaveQuizRequest):
    """Save a quiz result for a specific step"""
    try:
        # Convert quiz result to dict
        quiz_dict = quiz_request.result.dict()
        
        result = await db.user_progress.update_one(
            {"user_id": quiz_request.user_id},
            {
                "$set": {
                    f"quiz_results.{quiz_request.step_id}": quiz_dict,
                    "updated_at": datetime.utcnow(),
                    "last_accessed": datetime.utcnow()
                }
            }
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="User not found")
            
        return {"message": "Quiz result saved successfully"}
        
    except Exception as e:
        logging.error(f"Error saving quiz result: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.put("/user/complete-step")
async def complete_step(complete_request: CompleteStepRequest):
    """Mark a step as completed"""
    try:
        # Add step to completed_steps if not already there
        result = await db.user_progress.update_one(
            {"user_id": complete_request.user_id},
            {
                "$addToSet": {"completed_steps": complete_request.step_id},
                "$set": {
                    "updated_at": datetime.utcnow(),
                    "last_accessed": datetime.utcnow()
                }
            }
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="User not found")
            
        # Return updated progress
        updated = await db.user_progress.find_one({"user_id": complete_request.user_id})
        updated["_id"] = str(updated["_id"])
        return UserProgress(**updated)
        
    except Exception as e:
        logging.error(f"Error completing step: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
