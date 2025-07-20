import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  BookOpen, 
  PenTool, 
  CheckCircle, 
  Lightbulb,
  Target,
  Save
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const StepContent = ({ 
  stepData, 
  userNote, 
  quizResult, 
  onSaveNote, 
  onSaveQuizResult, 
  onMarkComplete,
  isCompleted 
}) => {
  const [note, setNote] = useState(userNote || '');
  const [selectedAnswer, setSelectedAnswer] = useState(quizResult?.answer || '');
  const [showQuizResult, setShowQuizResult] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setNote(userNote || '');
    setSelectedAnswer(quizResult?.answer || '');
  }, [stepData.id, userNote, quizResult]);

  const handleSaveNote = () => {
    onSaveNote(note);
    toast({
      title: "Note sauvegardée",
      description: "Votre note personnelle a été enregistrée.",
    });
  };

  const handleQuizSubmit = () => {
    if (!selectedAnswer) {
      toast({
        title: "Sélection requise",
        description: "Veuillez sélectionner une réponse.",
        variant: "destructive"
      });
      return;
    }

    const isCorrect = parseInt(selectedAnswer) === stepData.exercise.correctAnswer;
    const result = {
      answer: selectedAnswer,
      isCorrect,
      timestamp: new Date().toISOString()
    };

    onSaveQuizResult(result);
    setShowQuizResult(true);
    
    toast({
      title: isCorrect ? "Bonne réponse !" : "Réponse incorrecte",
      description: isCorrect 
        ? "Félicitations, vous avez bien compris !" 
        : "Pas de souci, continuez votre lecture pour mieux comprendre.",
      variant: isCorrect ? "default" : "destructive"
    });
  };

  const handleTextExerciseSubmit = () => {
    if (!selectedAnswer.trim()) {
      toast({
        title: "Réponse requise",
        description: "Veuillez saisir votre réponse.",
        variant: "destructive"
      });
      return;
    }

    const result = {
      answer: selectedAnswer,
      timestamp: new Date().toISOString()
    };

    onSaveQuizResult(result);
    toast({
      title: "Réponse enregistrée",
      description: "Votre réflexion a été sauvegardée.",
    });
  };

  const handleCompleteStep = () => {
    onMarkComplete();
    toast({
      title: "Étape terminée !",
      description: "Félicitations, vous pouvez passer à l'étape suivante.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <Badge variant="outline" className="mb-2">
          Étape {stepData.id} sur 10
        </Badge>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">
          {stepData.title}
        </h1>
        <p className="text-lg text-gray-600">
          {stepData.description}
        </p>
      </div>

      {/* Main Content */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <span>Contenu de l'étape</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-gray max-w-none">
          <div 
            dangerouslySetInnerHTML={{ __html: stepData.content }}
            className="space-y-4 text-gray-700 leading-relaxed"
          />
        </CardContent>
      </Card>

      {/* Key Points */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-800">
            <Lightbulb className="h-5 w-5" />
            <span>Points clés à retenir</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {stepData.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start space-x-3">
                <Target className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                <span className="text-blue-800 text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Exercise */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-800">
            <PenTool className="h-5 w-5" />
            <span>Exercice pratique</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-green-800 font-medium">
            {stepData.exercise.question}
          </p>

          {stepData.exercise.type === 'multiple' ? (
            <div className="space-y-3">
              {stepData.exercise.options.map((option, index) => (
                <label key={index} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="quiz"
                    value={index}
                    checked={selectedAnswer === index.toString()}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    className="w-4 h-4 text-green-600"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
              
              <Button 
                onClick={handleQuizSubmit}
                className="mt-4 bg-green-600 hover:bg-green-700"
                disabled={!selectedAnswer}
              >
                Valider ma réponse
              </Button>

              {showQuizResult && quizResult && (
                <div className={`p-4 rounded-lg ${
                  quizResult.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  <p className="font-medium">
                    {quizResult.isCorrect ? '✓ Correct !' : '✗ Incorrect'}
                  </p>
                  {!quizResult.isCorrect && (
                    <p className="text-sm mt-1">
                      La bonne réponse était : {stepData.exercise.options[stepData.exercise.correctAnswer]}
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <Textarea
                placeholder={stepData.exercise.placeholder}
                value={selectedAnswer}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                rows={6}
                className="bg-white"
              />
              <Button 
                onClick={handleTextExerciseSubmit}
                className="bg-green-600 hover:bg-green-700"
                disabled={!selectedAnswer.trim()}
              >
                Enregistrer ma réflexion
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Personal Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PenTool className="h-5 w-5 text-purple-600" />
            <span>Mes notes personnelles</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Ajoutez vos réflexions, idées ou questions sur cette étape..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
          />
          <Button 
            variant="outline" 
            onClick={handleSaveNote}
            className="flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Sauvegarder mes notes</span>
          </Button>
        </CardContent>
      </Card>

      <Separator className="my-6" />

      {/* Complete Step */}
      <div className="text-center">
        {!isCompleted ? (
          <Button 
            onClick={handleCompleteStep}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 px-8"
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            Marquer cette étape comme terminée
          </Button>
        ) : (
          <div className="flex items-center justify-center space-x-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Étape terminée !</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepContent;