import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Trophy,
  Target,
  Clock,
  TrendingUp,
  Award,
  BookOpen,
  RefreshCw,
  ArrowRight,
  Star,
  CheckCircle,
  BarChart3,
  Zap,
  Brain,
  Lightbulb,
  Sparkles,
  Leaf,
  TreePine,
  Mountain,
  Sun
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface AssessmentResult {
  accuracy: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  categoryBreakdown: { [key: string]: { correct: number; total: number } };
  difficultyBreakdown: { [key: string]: { correct: number; total: number } };
}

const MockPlacementResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    accuracy: 0,
    correctAnswers: 0,
    timeSpent: 0
  });

  // Get results from location state or use default
  const result: AssessmentResult = location.state?.result || {
    accuracy: 85,
    totalQuestions: 20,
    correctAnswers: 17,
    timeSpent: 720, // 12 minutes
    categoryBreakdown: {
      'Logical Reasoning': { correct: 5, total: 6 },
      'Quantitative Aptitude': { correct: 4, total: 5 },
      'Verbal Ability': { correct: 4, total: 5 },
      'Data Interpretation': { correct: 4, total: 4 }
    },
    difficultyBreakdown: {
      'Easy': { correct: 8, total: 8 },
      'Medium': { correct: 6, total: 8 },
      'Hard': { correct: 3, total: 4 }
    }
  };

  useEffect(() => {
    setIsVisible(true);

    // Animate stats
    const animateValue = (start: number, end: number, duration: number, setValue: (value: number) => void) => {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = Math.floor(start + (end - start) * progress);
        setValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    };

    setTimeout(() => {
      animateValue(0, result.accuracy, 1500, (value) => setAnimatedStats(prev => ({ ...prev, accuracy: value })));
      animateValue(0, result.correctAnswers, 1200, (value) => setAnimatedStats(prev => ({ ...prev, correctAnswers: value })));
      animateValue(0, result.timeSpent, 1000, (value) => setAnimatedStats(prev => ({ ...prev, timeSpent: value })));
    }, 500);
  }, [result]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getPerformanceLevel = (accuracy: number) => {
    if (accuracy >= 90) return { level: 'Exceptional', color: 'text-accent', icon: Trophy, description: 'Outstanding performance! You\'re ready for top-tier opportunities.' };
    if (accuracy >= 80) return { level: 'Excellent', color: 'text-secondary', icon: Award, description: 'Great job! You demonstrate strong analytical skills.' };
    if (accuracy >= 70) return { level: 'Good', color: 'text-primary', icon: Target, description: 'Solid performance with room for improvement.' };
    if (accuracy >= 60) return { level: 'Fair', color: 'text-muted-foreground', icon: TrendingUp, description: 'Good foundation, focus on weak areas.' };
    return { level: 'Needs Improvement', color: 'text-destructive', icon: BookOpen, description: 'Practice more to strengthen your skills.' };
  };

  const performance = getPerformanceLevel(result.accuracy);
  const PerformanceIcon = performance.icon;

  const getRecommendations = (accuracy: number) => {
    if (accuracy >= 90) {
      return [
        'Apply for leadership roles and technical positions',
        'Consider advanced certifications',
        'Mentor others in your areas of strength'
      ];
    } else if (accuracy >= 80) {
      return [
        'Focus on interview preparation for your target companies',
        'Strengthen weak areas identified in the breakdown',
        'Practice time management for longer assessments'
      ];
    } else if (accuracy >= 70) {
      return [
        'Review fundamental concepts in weak categories',
        'Take more practice tests to build confidence',
        'Focus on accuracy over speed initially'
      ];
    } else {
      return [
        'Dedicate time to daily practice sessions',
        'Focus on understanding concepts rather than memorization',
        'Seek guidance from mentors or online resources'
      ];
    }
  };

  const recommendations = getRecommendations(result.accuracy);

  return (
    <div className="min-h-screen bg-gradient-canopy relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 animate-float">
          <Leaf className="w-8 h-8 text-primary" />
        </div>
        <div className="absolute top-40 right-20 animate-float-delayed">
          <TreePine className="w-12 h-12 text-secondary" />
        </div>
        <div className="absolute bottom-20 left-1/4 animate-sway">
          <Mountain className="w-16 h-16 text-muted-foreground" />
        </div>
        <div className="absolute bottom-40 right-10 animate-pulse-soft">
          <Sun className="w-10 h-10 text-accent" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className={`text-center mb-8 transition-all duration-1000 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="w-24 h-24 rounded-2xl bg-accent mx-auto mb-6 flex items-center justify-center animate-scale-in">
            <PerformanceIcon className="w-12 h-12 text-accent-foreground" />
          </div>
          <h1 className="text-5xl font-bold font-serif mb-4 text-gradient-forest">
            Assessment Complete!
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Here's your personalized performance analysis
          </p>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            {performance.level}
          </Badge>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className={`card-forest hover-lift transition-all duration-1000 delay-300 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <CardHeader className="text-center pb-2">
              <div className="w-12 h-12 rounded-xl bg-primary/10 mx-auto mb-2 flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-sm text-muted-foreground">Accuracy</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-primary mb-1">
                {animatedStats.accuracy}%
              </div>
              <Progress value={result.accuracy} className="h-2 mb-2" />
              <p className="text-sm text-muted-foreground">
                {result.correctAnswers} of {result.totalQuestions} correct
              </p>
            </CardContent>
          </Card>

          <Card className={`card-forest hover-lift transition-all duration-1000 delay-500 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <CardHeader className="text-center pb-2">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 mx-auto mb-2 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-secondary" />
              </div>
              <CardTitle className="text-sm text-muted-foreground">Score</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-secondary mb-1">
                {animatedStats.correctAnswers}
              </div>
              <p className="text-sm text-muted-foreground">
                out of {result.totalQuestions}
              </p>
              <div className="flex justify-center mt-2">
                {Array.from({ length: Math.floor(result.correctAnswers / 2) }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent fill-current" />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className={`card-forest hover-lift transition-all duration-1000 delay-700 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <CardHeader className="text-center pb-2">
              <div className="w-12 h-12 rounded-xl bg-accent/10 mx-auto mb-2 flex items-center justify-center">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <CardTitle className="text-sm text-muted-foreground">Time Spent</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-accent mb-1">
                {formatTime(animatedStats.timeSpent)}
              </div>
              <p className="text-sm text-muted-foreground">
                Average: {Math.round(result.timeSpent / result.totalQuestions)}s per question
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Description */}
        <Card className={`card-forest mb-8 transition-all duration-1000 delay-900 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Performance Analysis</h3>
                <p className="text-muted-foreground">{performance.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card className={`card-forest mb-8 transition-all duration-1000 delay-1100 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Category Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(result.categoryBreakdown).map(([category, stats], index) => (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{category}</span>
                    <span className="text-sm text-muted-foreground">
                      {stats.correct}/{stats.total}
                    </span>
                  </div>
                  <Progress
                    value={(stats.correct / stats.total) * 100}
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    {Math.round((stats.correct / stats.total) * 100)}% accuracy
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Difficulty Breakdown */}
        <Card className={`card-forest mb-8 transition-all duration-1000 delay-1300 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Difficulty Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(result.difficultyBreakdown).map(([difficulty, stats]) => (
                <div key={difficulty} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant={
                      difficulty === 'Easy' ? 'secondary' :
                      difficulty === 'Medium' ? 'default' : 'destructive'
                    }>
                      {difficulty}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {stats.correct}/{stats.total} correct
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium">
                      {Math.round((stats.correct / stats.total) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className={`card-forest mb-8 transition-all duration-1000 delay-1500 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Personalized Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-1700 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <Button
            onClick={() => navigate('/gd-portal')}
            className="btn-forest"
          >
            <ArrowRight className="mr-2 w-4 h-4" />
            Proceed to the Next Round
          </Button>
          <Button
            onClick={() => navigate('/mock-placement/assessment')}
            variant="outline"
            className="btn-outline-forest"
          >
            <RefreshCw className="mr-2 w-4 h-4" />
            Retake Assessment
          </Button>
          <Button
            variant="outline"
            asChild
            className="btn-outline-forest"
          >
            <Link to="/student/dashboard">
              Back to Dashboard
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MockPlacementResults;