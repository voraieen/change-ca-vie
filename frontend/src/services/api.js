import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Generate a simple user ID for the session (in a real app, this would come from auth)
export const getUserId = () => {
  let userId = localStorage.getItem('ibook_user_id');
  if (!userId) {
    userId = `user_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('ibook_user_id', userId);
  }
  return userId;
};

// API service class
class ApiService {
  
  async getUserProgress(userId) {
    try {
      const response = await axios.get(`${API}/user/progress/${userId}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        // User not found, create new progress
        return await this.createUserProgress(userId);
      }
      throw error;
    }
  }

  async createUserProgress(userId, currentStep = 1, completedSteps = []) {
    try {
      const response = await axios.post(`${API}/user/progress`, {
        user_id: userId,
        current_step: currentStep,
        completed_steps: completedSteps
      });
      return response.data;
    } catch (error) {
      console.error('Error creating user progress:', error);
      throw error;
    }
  }

  async updateUserProgress(userId, currentStep, completedSteps) {
    try {
      const response = await axios.post(`${API}/user/progress`, {
        user_id: userId,
        current_step: currentStep,
        completed_steps: completedSteps
      });
      return response.data;
    } catch (error) {
      console.error('Error updating user progress:', error);
      throw error;
    }
  }

  async saveUserNote(userId, stepId, note) {
    try {
      const response = await axios.put(`${API}/user/notes`, {
        user_id: userId,
        step_id: stepId,
        note: note
      });
      return response.data;
    } catch (error) {
      console.error('Error saving note:', error);
      throw error;
    }
  }

  async saveQuizResult(userId, stepId, result) {
    try {
      const response = await axios.put(`${API}/user/quiz-results`, {
        user_id: userId,
        step_id: stepId,
        result: result
      });
      return response.data;
    } catch (error) {
      console.error('Error saving quiz result:', error);
      throw error;
    }
  }

  async completeStep(userId, stepId) {
    try {
      const response = await axios.put(`${API}/user/complete-step`, {
        user_id: userId,
        step_id: stepId
      });
      return response.data;
    } catch (error) {
      console.error('Error completing step:', error);
      throw error;
    }
  }

  async getBookContent() {
    try {
      const response = await axios.get(`${API}/book/content`);
      return response.data;
    } catch (error) {
      console.error('Error getting book content:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();