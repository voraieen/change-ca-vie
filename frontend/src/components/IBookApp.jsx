import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookData, mockUserData } from '../data/mock';
import Header from './Header';
import Sidebar from './Sidebar';
import StepContent from './StepContent';
import ProgressBar from './ProgressBar';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const IBookApp = () => {
  const { stepId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // État local avec données mock
  const [currentStep, setCurrentStep] = useState(parseInt(stepId) || 1);
  const [userProgress, setUserProgress] = useState(mockUserData);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (stepId && parseInt(stepId) !== currentStep) {
      setCurrentStep(parseInt(stepId));
    }
  }, [stepId, currentStep]);

  const updateProgress = (stepNumber, data) => {
    setUserProgress(prev => ({
      ...prev,
      ...data,
      currentStep: stepNumber
    }));
    
    // Mock d'une sauvegarde
    localStorage.setItem('ibook_progress', JSON.stringify({
      ...userProgress,
      ...data,
      currentStep: stepNumber
    }));
    
    toast({
      title: "Progrès sauvegardé",
      description: "Vos modifications ont été enregistrées.",
    });
  };

  const saveNote = (stepId, note) => {
    const updatedNotes = {
      ...userProgress.notes,
      [stepId]: note
    };
    updateProgress(currentStep, { notes: updatedNotes });
  };

  const saveQuizResult = (stepId, result) => {
    const updatedQuizResults = {
      ...userProgress.quizResults,
      [stepId]: result
    };
    updateProgress(currentStep, { quizResults: updatedQuizResults });
  };

  const markStepComplete = (stepId) => {
    if (!userProgress.completedSteps.includes(stepId)) {
      const updatedCompletedSteps = [...userProgress.completedSteps, stepId];
      updateProgress(currentStep, { completedSteps: updatedCompletedSteps });
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
            completedSteps={userProgress.completedSteps}
          />
          
          <div className="max-w-4xl mx-auto p-6">
            {currentStepData && (
              <StepContent
                stepData={currentStepData}
                userNote={userProgress.notes[currentStep] || ''}
                quizResult={userProgress.quizResults[currentStep]}
                onSaveNote={(note) => saveNote(currentStep, note)}
                onSaveQuizResult={(result) => saveQuizResult(currentStep, result)}
                onMarkComplete={() => markStepComplete(currentStep)}
                isCompleted={userProgress.completedSteps.includes(currentStep)}
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