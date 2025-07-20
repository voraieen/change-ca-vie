import React from 'react';
import { Progress } from './ui/progress';
import { CheckCircle } from 'lucide-react';

const ProgressBar = ({ currentStep, totalSteps, completedSteps }) => {
  const progressPercentage = (completedSteps.length / totalSteps) * 100;
  
  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <h2 className="text-sm font-medium text-gray-700">
              Progression générale
            </h2>
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">
                {completedSteps.length} étapes terminées
              </span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(progressPercentage)}%
            </div>
            <div className="text-xs text-gray-500">
              {completedSteps.length}/{totalSteps}
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Progress 
            value={progressPercentage} 
            className="h-3"
          />
          
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>Étape actuelle : {currentStep}</span>
            <span>
              {completedSteps.length === totalSteps 
                ? "🎉 Félicitations ! Livre terminé !" 
                : `Plus que ${totalSteps - completedSteps.length} étapes`
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;