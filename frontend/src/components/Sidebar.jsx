import React from 'react';
import { Button } from './ui/button';
import { CheckCircle, Circle, Lock, X } from 'lucide-react';
import { cn } from '../lib/utils';

const Sidebar = ({ steps, currentStep, userProgress, onStepSelect, onClose }) => {
  const getStepStatus = (stepId) => {
    if (userProgress.completed_steps && userProgress.completed_steps.includes(stepId)) {
      return 'completed';
    }
    if (stepId <= userProgress.current_step) {
      return 'available';
    }
    return 'locked';
  };

  const getStepIcon = (stepId) => {
    const status = getStepStatus(stepId);
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'available':
        return <Circle className="h-5 w-5 text-blue-600" />;
      case 'locked':
        return <Lock className="h-5 w-5 text-gray-400" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="w-80 bg-white shadow-lg h-full overflow-y-auto">
      <div className="p-4 border-b flex justify-between items-center lg:hidden">
        <h2 className="font-semibold text-gray-900">Table des matières</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X size={16} />
        </Button>
      </div>

      <div className="p-4">
        <h2 className="font-semibold text-gray-900 mb-4 hidden lg:block">
          Table des matières
        </h2>
        
        <div className="space-y-2">
          {steps.map((step) => {
            const status = getStepStatus(step.id);
            const isActive = step.id === currentStep;
            const isClickable = status !== 'locked';
            
            return (
              <div
                key={step.id}
                className={cn(
                  "p-3 rounded-lg transition-all duration-200 border",
                  isActive 
                    ? "bg-blue-50 border-blue-200 shadow-sm" 
                    : "border-gray-100 hover:bg-gray-50",
                  !isClickable && "opacity-50 cursor-not-allowed"
                )}
              >
                <button
                  onClick={() => isClickable && onStepSelect(step.id)}
                  disabled={!isClickable}
                  className="w-full text-left"
                >
                  <div className="flex items-start space-x-3">
                    {getStepIcon(step.id)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-medium text-gray-500">
                          ÉTAPE {step.id}
                        </span>
                      </div>
                      <h3 className={cn(
                        "font-medium text-sm leading-snug",
                        isActive ? "text-blue-900" : "text-gray-900"
                      )}>
                        {step.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Progress summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            Votre progression
          </h3>
          <div className="text-2xl font-bold text-blue-600">
            {Math.round((userProgress.completedSteps.length / steps.length) * 100)}%
          </div>
          <p className="text-xs text-gray-600">
            {userProgress.completedSteps.length} sur {steps.length} étapes terminées
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;