import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Eye, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  Stethoscope,
  Target
} from 'lucide-react';

interface ColorVisionQuizProps {
  onBackToLanding: () => void;
  onGoToTool: () => void;
}

interface QuizQuestion {
  id: number;
  instruction: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'protanopia' | 'deuteranopia' | 'tritanopia' | 'normal';
  plateStyle: React.CSSProperties;
  numberStyle: React.CSSProperties;
}

type QuizState = 'intro' | 'testing' | 'results';

export function ColorVisionQuiz({ onBackToLanding, onGoToTool }: ColorVisionQuizProps) {
  const [quizState, setQuizState] = useState<QuizState>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState('');

  const questions: QuizQuestion[] = [
    {
      id: 1,
      instruction: "What number do you see in the circle?",
      answer: "12",
      difficulty: 'easy',
      type: 'normal',
      plateStyle: { 
        background: `radial-gradient(circle, 
          #90EE90 0%, #90EE90 20%, 
          #228B22 20%, #228B22 40%, 
          #90EE90 40%, #90EE90 60%, 
          #228B22 60%, #228B22 80%, 
          #90EE90 80%, #90EE90 100%)`
      },
      numberStyle: { color: '#FF6B6B', fontSize: '4rem', fontWeight: 'bold' }
    },
    {
      id: 2,
      instruction: "What number do you see in the circle?",
      answer: "8",
      difficulty: 'medium',
      type: 'protanopia',
      plateStyle: { 
        background: `radial-gradient(circle, 
          #FFB6C1 0%, #FFB6C1 15%, 
          #90EE90 15%, #90EE90 30%, 
          #FFB6C1 30%, #FFB6C1 45%, 
          #90EE90 45%, #90EE90 60%, 
          #FFB6C1 60%, #FFB6C1 75%, 
          #90EE90 75%, #90EE90 100%)`
      },
      numberStyle: { color: '#FF0000', fontSize: '4rem', fontWeight: 'bold' }
    },
    {
      id: 3,
      instruction: "What number do you see in the circle?",
      answer: "29",
      difficulty: 'medium',
      type: 'deuteranopia',
      plateStyle: { 
        background: `radial-gradient(circle, 
          #98FB98 0%, #98FB98 25%, 
          #FF6B6B 25%, #FF6B6B 50%, 
          #98FB98 50%, #98FB98 75%, 
          #FF6B6B 75%, #FF6B6B 100%)`
      },
      numberStyle: { color: '#006400', fontSize: '4rem', fontWeight: 'bold' }
    },
    {
      id: 4,
      instruction: "What number do you see in the circle?",
      answer: "5",
      difficulty: 'hard',
      type: 'tritanopia',
      plateStyle: { 
        background: `radial-gradient(circle, 
          #87CEEB 0%, #87CEEB 20%, 
          #FFD700 20%, #FFD700 40%, 
          #87CEEB 40%, #87CEEB 60%, 
          #FFD700 60%, #FFD700 80%, 
          #87CEEB 80%, #87CEEB 100%)`
      },
      numberStyle: { color: '#0000FF', fontSize: '4rem', fontWeight: 'bold' }
    },
    {
      id: 5,
      instruction: "What shape do you see in the circle?",
      answer: "triangle",
      difficulty: 'hard',
      type: 'protanopia',
      plateStyle: { 
        background: `conic-gradient(from 0deg, 
          #FF9999 0deg, #FF9999 60deg, 
          #99FF99 60deg, #99FF99 120deg, 
          #FF9999 120deg, #FF9999 180deg, 
          #99FF99 180deg, #99FF99 240deg, 
          #FF9999 240deg, #FF9999 300deg, 
          #99FF99 300deg, #99FF99 360deg)`
      },
      numberStyle: { color: '#8B0000', fontSize: '3rem', fontWeight: 'bold' }
    }
  ];

  const handleAnswer = (answer: string) => {
    setUserAnswer(answer);
  };

  const handleNext = () => {
    const newAnswers = [...answers, userAnswer];
    setAnswers(newAnswers);
    setUserAnswer('');

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizState('results');
    }
  };

  const calculateResults = () => {
    let correctAnswers = 0;
    let protanopiaErrors = 0;
    let deuteranopiaErrors = 0;
    let tritanopiaErrors = 0;

    answers.forEach((answer, index) => {
      const question = questions[index];
      const isCorrect = answer.toLowerCase() === question.answer.toLowerCase();
      
      if (isCorrect) {
        correctAnswers++;
      } else {
        if (question.type === 'protanopia') protanopiaErrors++;
        if (question.type === 'deuteranopia') deuteranopiaErrors++;
        if (question.type === 'tritanopia') tritanopiaErrors++;
      }
    });

    const accuracy = (correctAnswers / questions.length) * 100;
    
    let result = {
      type: 'normal' as const,
      title: 'Normal Color Vision',
      description: 'You appear to have normal color vision with no significant deficiencies detected.',
      severity: 'none' as const,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    };

    if (accuracy < 80) {
      if (protanopiaErrors > deuteranopiaErrors && protanopiaErrors > tritanopiaErrors) {
        result = {
          type: 'protanopia',
          title: 'Possible Protanopia (Red-Green Color Blindness)',
          description: 'You may have difficulty distinguishing between red and green colors. This affects approximately 1% of men.',
          severity: 'moderate',
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        };
      } else if (deuteranopiaErrors > protanopiaErrors && deuteranopiaErrors > tritanopiaErrors) {
        result = {
          type: 'deuteranopia',
          title: 'Possible Deuteranopia (Red-Green Color Blindness)',
          description: 'You may have difficulty distinguishing between red and green colors. This is the most common form of color blindness.',
          severity: 'moderate',
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200'
        };
      } else if (tritanopiaErrors > 0) {
        result = {
          type: 'tritanopia',
          title: 'Possible Tritanopia (Blue-Yellow Color Blindness)',
          description: 'You may have difficulty distinguishing between blue and yellow colors. This is a rare form of color blindness.',
          severity: 'moderate',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200'
        };
      }
    }

    return { ...result, accuracy, correctAnswers };
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const results = quizState === 'results' ? calculateResults() : null;

  if (quizState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Color Vision Self-Test
            </h1>
            <p className="text-gray-600 text-lg">
              Take this quick 5-minute quiz to check your color vision. 
              Similar to tests used by eye care professionals.
            </p>
          </div>

          <div className="space-y-6">
            <Alert className="border-blue-200 bg-blue-50">
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> This is a screening tool, not a medical diagnosis. 
                For accurate results, consult an eye care professional.
              </AlertDescription>
            </Alert>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="font-semibold text-gray-900 mb-2">What to expect:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 5 color vision test plates</li>
                  <li>• Numbers and shapes to identify</li>
                  <li>• Takes about 3-5 minutes</li>
                  <li>• Immediate results</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="font-semibold text-gray-900 mb-2">Tips for accuracy:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Use good lighting</li>
                  <li>• Sit at normal distance</li>
                  <li>• Don't strain your eyes</li>
                  <li>• Answer instinctively</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => setQuizState('testing')}
                className="flex items-center space-x-2"
              >
                <Target className="h-5 w-5" />
                <span>Start Color Vision Test</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={onBackToLanding}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (quizState === 'testing') {
    const question = questions[currentQuestion];
    
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Color Vision Test</h1>
              <Badge variant="secondary">
                Question {currentQuestion + 1} of {questions.length}
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Test Plate */}
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {question.instruction}
                </h2>
                <p className="text-gray-600">
                  Look at the colored circles and enter what you see
                </p>
              </div>

              {/* Test Plate */}
              <div className="flex justify-center mb-6">
                <div 
                  className="w-64 h-64 rounded-full border-4 border-gray-300 flex items-center justify-center relative overflow-hidden"
                  style={question.plateStyle}
                >
                  {/* Dot Pattern Overlay */}
                  <div className="absolute inset-0">
                    {[...Array(150)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                          width: `${Math.random() * 12 + 8}px`,
                          height: `${Math.random() * 12 + 8}px`,
                          left: `${Math.random() * 90 + 5}%`,
                          top: `${Math.random() * 90 + 5}%`,
                          backgroundColor: i % 3 === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Hidden Number/Shape */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center z-10"
                    style={question.numberStyle}
                  >
                    {question.answer === 'triangle' ? '▲' : question.answer}
                  </div>
                </div>
              </div>

              {/* Answer Input */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => handleAnswer(e.target.value)}
                    placeholder="Enter what you see..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <Button 
                    onClick={handleNext}
                    disabled={!userAnswer.trim()}
                    className="sm:w-auto w-full"
                  >
                    {currentQuestion === questions.length - 1 ? 'Finish Test' : 'Next'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                {question.answer === 'triangle' && (
                  <p className="text-sm text-gray-500 text-center">
                    If you see a shape, try typing "triangle", "circle", "square", etc.
                  </p>
                )}
              </div>
            </Card>

            {/* Instructions */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Instructions</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">
                    Look at the colored circle and identify any numbers or shapes you can see
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">
                    Enter your answer in the text box - it's okay if you can't see anything
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">
                    Don't spend too long on each question - your first instinct is usually correct
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Info className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-900">Test Progress</span>
                </div>
                <p className="text-sm text-blue-800">
                  Difficulty: <Badge variant="outline">{question.difficulty}</Badge>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (quizState === 'results' && results) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Results Header */}
          <Card className="p-8 mb-6">
            <div className="text-center">
              <div className={`w-16 h-16 ${results.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Eye className={`h-8 w-8 ${results.color}`} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Your Color Vision Results
              </h1>
              <p className="text-gray-600 text-lg">
                You answered {results.correctAnswers} out of {questions.length} questions correctly
              </p>
            </div>
          </Card>

          {/* Main Results */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <Card className={`p-6 border-2 ${results.borderColor} ${results.bgColor}`}>
              <h2 className={`text-xl font-bold ${results.color} mb-3`}>
                {results.title}
              </h2>
              <p className="text-gray-700 mb-4">
                {results.description}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Accuracy Score</span>
                  <span className={`text-lg font-bold ${results.color}`}>
                    {results.accuracy.toFixed(0)}%
                  </span>
                </div>
                <Progress value={results.accuracy} className="h-2" />
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">What This Means</h3>
              <div className="space-y-3">
                {results.type === 'normal' ? (
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">
                        You have normal color vision and can distinguish between colors effectively.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">
                        You may have some difficulty distinguishing certain colors. This could affect how you perceive color-coded information.
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start space-x-3">
                  <Stethoscope className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700">
                      For a professional diagnosis, consult an eye care specialist who can perform comprehensive color vision testing.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Recommendations */}
          <Card className="p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Recommendations</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">For Designers:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Use our design testing tool to check your work</li>
                  <li>• Don't rely solely on color to convey information</li>
                  <li>• Test with high contrast ratios</li>
                  <li>• Use patterns and textures alongside color</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">General Tips:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Be aware of color-dependent interfaces</li>
                  <li>• Use accessibility tools when available</li>
                  <li>• Consider colorblind-friendly palettes</li>
                  <li>• Ask for help when color is important</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Next Steps */}
          <Card className="p-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Ready to Test Your Designs?
              </h3>
              <p className="text-gray-600 mb-6">
                Use our free design testing tool to see how your work appears to users 
                with different types of color vision deficiency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={onGoToTool}>
                  Test My Designs
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" onClick={onBackToLanding}>
                  Back to Home
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}