# API Contracts - iBook Application

## Overview
This document defines the API contracts between the frontend React application and the FastAPI backend for the interactive book "Comment Réussir sa Vie en 10 Étapes".

## Data Models

### User Progress Model
```json
{
  "id": "string (ObjectId)",
  "user_id": "string", 
  "current_step": "number",
  "completed_steps": "array[number]",
  "notes": "object { step_id: note_text }",
  "quiz_results": "object { step_id: { answer, isCorrect?, timestamp } }",
  "last_accessed": "datetime",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### Step Content Model (Static - from mock.js)
```json
{
  "id": "number",
  "title": "string",
  "description": "string", 
  "content": "string (HTML)",
  "exercise": {
    "type": "multiple | text",
    "question": "string",
    "options": "array[string]", // for multiple choice
    "correctAnswer": "number", // for multiple choice
    "placeholder": "string" // for text
  },
  "keyPoints": "array[string]"
}
```

## API Endpoints

### 1. Get User Progress
- **GET** `/api/user/progress/{user_id}`
- **Response**: UserProgress model or 404 if not found

### 2. Initialize/Update User Progress  
- **POST** `/api/user/progress`
- **Body**: 
```json
{
  "user_id": "string",
  "current_step": "number",
  "completed_steps": "array[number]"
}
```
- **Response**: UserProgress model

### 3. Save User Note
- **PUT** `/api/user/notes`
- **Body**:
```json
{
  "user_id": "string", 
  "step_id": "number",
  "note": "string"
}
```
- **Response**: Success message

### 4. Save Quiz Result
- **PUT** `/api/user/quiz-results`
- **Body**:
```json
{
  "user_id": "string",
  "step_id": "number", 
  "result": {
    "answer": "string",
    "isCorrect": "boolean", // optional for text exercises
    "timestamp": "datetime"
  }
}
```
- **Response**: Success message

### 5. Mark Step Complete
- **PUT** `/api/user/complete-step`
- **Body**:
```json
{
  "user_id": "string",
  "step_id": "number"
}
```
- **Response**: Updated progress

### 6. Get Book Content (Static)
- **GET** `/api/book/content`
- **Response**: Complete book data from mock.js

## Frontend Integration Changes

### Current Mock Usage (to be replaced):
- `mockUserData` in components
- `localStorage` for persistence
- Static `bookData` import

### New Integration:
1. **User Management**: Generate simple user_id on first visit
2. **API Service**: Create `api.js` service layer for all backend calls
3. **State Management**: Update React state with real API responses
4. **Error Handling**: Add proper error states and retry logic
5. **Loading States**: Add loading indicators for API calls

## Implementation Priority:
1. Backend models and endpoints
2. Frontend API integration
3. Remove mock data dependencies
4. Add error handling and loading states
5. Test complete user flow

## Database Collections:
- `user_progress` - Store all user progression data
- `book_content` - Optional: could store dynamic book content (future feature)

## Error Handling:
- 404: User not found (create new user)
- 400: Invalid request data
- 500: Server errors with proper logging