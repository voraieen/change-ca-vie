import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookData } from '../data/mock';
import { apiService, getUserId } from '../services/api';
import Header from './Header';
import Sidebar from './Sidebar';
import StepContent from './StepContent';
import ProgressBar from './ProgressBar';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const IBookApp = () => {
  const { stepId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(parseInt(stepId) || 1);
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const userId = getUserId();

  // Load user progress on mount
  useEffect(() => {
    loadUserProgress();
  }, []);

  useEffect(() => {
    if (stepId && parseInt(stepId) !== currentStep) {
      setCurrentStep(parseInt(stepId));
    }
  }, [stepId, currentStep]);

  const loadUserProgress = async () => {
    try {
      setLoading(true);
      setError(null);
      const progress = await apiService.getUserProgress(userId);
      setUserProgress(progress);
    } catch (err) {
      console.error('Error loading user progress:', err);
      setError('Erreur lors du chargement de votre progression');
      toast({
        title: "Erreur de chargement",
        description: "Impossible de charger votre progression. Utilisation des données locales.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (stepNumber, data) => {
    if (!userProgress) return;

    try {
      // Update local state immediately for better UX
      const updatedProgress = {
        ...userProgress,
        ...data,
        current_step: stepNumber
      };
      setUserProgress(updatedProgress);

      // Update backend
      if (data.completed_steps !== undefined) {
        await apiService.updateUserProgress(userId, stepNumber, data.completed_steps);
      }
      
    } catch (error) {
      console.error('Error updating progress:', error);
      toast({
        title: "Erreur de sauvegarde",
        description: "Impossible de sauvegarder votre progression.",
        variant: "destructive"
      });
    }
  };

  const saveNote = async (stepId, note) => {
    if (!userProgress) return;

    try {
      // Update local state
      const updatedNotes = {
        ...userProgress.notes,
        [stepId]: note
      };
      setUserProgress(prev => ({
        ...prev,
        notes: updatedNotes
      }));

      // Save to backend
      await apiService.saveUserNote(userId, stepId, note);
      
      toast({
        title: "Note sauvegardée",
        description: "Votre note personnelle a été enregistrée.",
      });
    } catch (error) {
      console.error('Error saving note:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder votre note.",
        variant: "destructive"
      });
    }
  };

  const saveQuizResult = async (stepId, result) => {
    if (!userProgress) return;

    try {
      // Update local state
      const updatedQuizResults = {
        ...userProgress.quiz_results,
        [stepId]: result
      };
      setUserProgress(prev => ({
        ...prev,
        quiz_results: updatedQuizResults
      }));

      // Save to backend
      await apiService.saveQuizResult(userId, stepId, result);
      
    } catch (error) {
      console.error('Error saving quiz result:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder votre réponse.",
        variant: "destructive"
      });
    }
  };

  const markStepComplete = async (stepId) => {
    if (!userProgress) return;

    try {
      if (!userProgress.completed_steps.includes(stepId)) {
        // Update backend first
        const updatedProgress = await apiService.completeStep(userId, stepId);
        setUserProgress(updatedProgress);
        
        toast({
          title: "Étape terminée !",
          description: "Félicitations, vous pouvez passer à l'étape suivante.",
        });
      }
    } catch (error) {
      console.error('Error completing step:', error);
      toast({
        title: "Erreur",
        description: "Impossible de marquer l'étape comme terminée.",
        variant: "destructive"
      });
    }
  };

  const navigateToStep = (stepNumber) => {
    setCurrentStep(stepNumber);
    navigate(`/step/${stepNumber}`);
    setIsSidebarOpen(false);
  };

  const nextStep = () => {
    if (currentStep < bookData.totalSteps) {
      navigateToStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      navigateToStep(currentStep - 1);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
          <p className="text-gray-600">Chargement de votre iBook...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !userProgress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <div className="text-red-600 text-xl">⚠️ Erreur</div>
          <p className="text-gray-600">{error}</p>
          <Button onClick={loadUserProgress} className="bg-blue-600 hover:bg-blue-700">
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  if (!userProgress) {
    return null;
  }

  const currentStepData = bookData.steps.find(step => step.id === currentStep);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header 
        bookData={bookData}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      <div className="flex relative">
        {/* Overlay mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed lg:sticky top-[64px] left-0 h-[calc(100vh-64px)] z-30
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <Sidebar
            steps={bookData.steps}
            currentStep={currentStep}
            userProgress={userProgress}
            onStepSelect={navigateToStep}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <ProgressBar 
            currentStep={currentStep}
            totalSteps={bookData.totalSteps}
            completedSteps={userProgress.completed_steps || []}
          />
          
          <div className="max-w-4xl mx-auto p-6">
            {currentStepData && (
              <StepContent
                stepData={currentStepData}
                userNote={userProgress.notes?.[currentStep] || ''}
                quizResult={userProgress.quiz_results?.[currentStep]}
                onSaveNote={(note) => saveNote(currentStep, note)}
                onSaveQuizResult={(result) => saveQuizResult(currentStep, result)}
                onMarkComplete={() => markStepComplete(currentStep)}
                isCompleted={userProgress.completed_steps?.includes(currentStep) || false}
              />
            )}
            
            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <Button 
                variant="outline" 
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ChevronLeft size={16} />
                Précédent
              </Button>
              
              <span className="text-sm text-gray-500">
                Étape {currentStep} sur {bookData.totalSteps}
              </span>
              
              <Button 
                onClick={nextStep}
                disabled={currentStep === bookData.totalSteps}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                Suivant
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default IBookApp;