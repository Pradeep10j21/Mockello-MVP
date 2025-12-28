import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, CheckCircle, Lightbulb, Brain, Sparkles, RefreshCw, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { questions, getCategoryLabel, getDifficultyColor } from '@/data/questions';
import { AssessmentPhase, FeedbackState, UserAnswer } from '@/types/assessment';
import LearningMode from '@/components/assessment/LearningMode';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const MockPlacementAssessment = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<AssessmentPhase>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedbackState, setFeedbackState] = useState<FeedbackState>('none');
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [seconds, setSeconds] = useState(0);
  const [showTabWarning, setShowTabWarning] = useState(false);

  // Tab switch warning
  useEffect(() => {
    if (phase !== 'assessment') return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setShowTabWarning(true);
      }
    };

    const handleBlur = () => {
      setShowTabWarning(true);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, [phase]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleStartAssessment = () => {
    setPhase('assessment');
    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  };

  const handleSelectAnswer = (index: number) => {
    if (feedbackState !== 'none') return;
    setSelectedAnswer(index);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    setUserAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect,
      timeSpent: 0,
      attempts: 1,
      learningRecovery: false,
    }]);
    
    setFeedbackState(isCorrect ? 'correct' : 'incorrect');
  };

  const handleContinue = () => {
    if (currentQuestionIndex + 1 >= questions.length) {
      // Navigate to results page with assessment data
      const result = {
        accuracy,
        totalQuestions: questions.length,
        correctAnswers,
        timeSpent: seconds,
        categoryBreakdown: questions.reduce((acc, q, idx) => {
          const category = q.category;
          const isCorrect = userAnswers.find(a => a.questionId === q.id)?.isCorrect || false;
          if (!acc[category]) acc[category] = { correct: 0, total: 0 };
          acc[category].total++;
          if (isCorrect) acc[category].correct++;
          return acc;
        }, {} as { [key: string]: { correct: number; total: number } }),
        difficultyBreakdown: questions.reduce((acc, q, idx) => {
          const difficulty = q.difficulty;
          const isCorrect = userAnswers.find(a => a.questionId === q.id)?.isCorrect || false;
          if (!acc[difficulty]) acc[difficulty] = { correct: 0, total: 0 };
          acc[difficulty].total++;
          if (isCorrect) acc[difficulty].correct++;
          return acc;
        }, {} as { [key: string]: { correct: number; total: number } })
      };
      navigate('/mock-placement/results', { state: { result } });
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setFeedbackState('none');
    }
  };

  const handleRetake = () => {
    setPhase('welcome');
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setFeedbackState('none');
    setUserAnswers([]);
    setSeconds(0);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const correctAnswers = userAnswers.filter(a => a.isCorrect).length;
  const accuracy = questions.length > 0 ? Math.round((correctAnswers / questions.length) * 100) : 0;

  if (phase === 'welcome') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <div className="max-w-2xl w-full text-center">
          <div className="w-20 h-20 rounded-2xl bg-primary mx-auto mb-6 flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4 text-gradient-forest">
            Aptitude Assessment
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            A learning-first assessment experience. Make mistakes, understand concepts, and showcase your potential.
          </p>
          <Button size="lg" className="btn-forest" onClick={handleStartAssessment}>
            Start Assessment <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <p className="mt-4 text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" /> {questions.length} questions • ~10 minutes
          </p>
          <Link to="/mock-placement" className="mt-6 inline-block text-sm text-primary hover:underline">
            ← Back to Overview
          </Link>
        </div>
      </div>
    );
  }

  if (phase === 'summary') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <div className="max-w-lg w-full text-center">
          <div className="w-24 h-24 rounded-2xl bg-accent mx-auto mb-6 flex items-center justify-center">
            <Trophy className="w-12 h-12 text-accent-foreground" />
          </div>
          <h1 className="text-4xl font-bold font-serif mb-2">Assessment Complete!</h1>
          <p className="text-xl text-muted-foreground mb-8">
            {accuracy >= 75 ? '🎉 Great Job!' : accuracy >= 50 ? '👍 Good Progress!' : '📚 Keep Practicing!'}
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="card-forest p-6">
              <p className="text-sm text-muted-foreground">Accuracy</p>
              <p className="text-4xl font-bold text-primary">{accuracy}%</p>
              <p className="text-sm text-muted-foreground">{correctAnswers}/{questions.length} correct</p>
            </div>
            <div className="card-forest p-6">
              <p className="text-sm text-muted-foreground">Time Spent</p>
              <p className="text-4xl font-bold text-secondary">{formatTime(seconds)}</p>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <Button onClick={handleRetake} className="btn-forest">
              <RefreshCw className="mr-2 w-4 h-4" /> Retake
            </Button>
            <Button variant="outline" asChild>
              <Link to="/student/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <AlertDialog open={showTabWarning} onOpenChange={setShowTabWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Warning: Tab Switch Detected</AlertDialogTitle>
            <AlertDialogDescription>
              You have switched tabs or minimized the window. Please stay on this page during the assessment. 
              Multiple tab switches may result in disqualification.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowTabWarning(false)}>
              I Understand
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold">Aptitude Assessment</h1>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/50">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="font-mono text-sm">{formatTime(seconds)}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="card-forest p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Question {currentQuestionIndex + 1} / {questions.length}</span>
            <span className="text-sm font-medium">{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }} />
          </div>
        </div>

        {/* Question */}
        <div className="card-forest p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {getCategoryLabel(currentQuestion.category)}
            </span>
            <span className={`px-3 py-1 rounded-full bg-muted text-sm font-medium capitalize ${getDifficultyColor(currentQuestion.difficulty)}`}>
              {currentQuestion.difficulty}
            </span>
          </div>
          <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => {
              const isCorrect = index === currentQuestion.correctAnswer;
              const showCorrect = feedbackState !== 'none' && isCorrect;
              const showIncorrect = feedbackState === 'incorrect' && selectedAnswer === index;
              
              return (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={feedbackState !== 'none'}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    showCorrect ? 'border-secondary bg-secondary/10' :
                    showIncorrect ? 'border-destructive bg-destructive/10' :
                    selectedAnswer === index ? 'border-primary bg-primary/10' :
                    'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-semibold ${
                      showCorrect ? 'bg-secondary text-secondary-foreground' :
                      showIncorrect ? 'bg-destructive text-destructive-foreground' :
                      selectedAnswer === index ? 'bg-primary text-primary-foreground' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {showCorrect ? <CheckCircle className="w-5 h-5" /> : ['A', 'B', 'C', 'D'][index]}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Actions */}
          {feedbackState === 'none' ? (
            <Button onClick={handleCheckAnswer} disabled={selectedAnswer === null} className="w-full btn-forest">
              Check Answer
            </Button>
          ) : feedbackState === 'correct' ? (
            <div className="p-4 rounded-xl bg-secondary/10 border border-secondary">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-secondary" />
                <span className="font-semibold text-secondary">Excellent!</span>
              </div>
              <p className="text-sm text-foreground mb-4">{currentQuestion.explanation}</p>
              <Button onClick={handleContinue} className="w-full btn-forest">
                Continue <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          ) : (
            <LearningMode 
              question={currentQuestion} 
              selectedAnswer={selectedAnswer!} 
              onContinue={handleContinue} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MockPlacementAssessment;
