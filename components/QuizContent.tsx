'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const quizCategories = [
  { id: 'html', name: 'HTML Fundamentals', logo: '/resources/html-logo.png', questions: 15, difficulty: 'Beginner', bestScore: 95 },
  { id: 'css', name: 'CSS Mastery', logo: '/resources/css-logo.png', questions: 20, difficulty: 'Intermediate', bestScore: 72 },
  { id: 'javascript', name: 'JavaScript Essentials', logo: '/resources/js-logo.png', questions: 25, difficulty: 'Intermediate', bestScore: 90 },
  { id: 'react', name: 'React Fundamentals', logo: '/resources/react-logo.png', questions: 18, difficulty: 'Advanced', bestScore: 0 },
];

const sampleQuestions = {
  html: [
    {
      id: 1,
      question: 'What does HTML stand for?',
      options: [
        'Hyper Text Markup Language',
        'High Tech Modern Language',
        'Home Tool Markup Language',
        'Hyperlinks and Text Markup Language'
      ],
      correct: 0
    },
    {
      id: 2,
      question: 'Which HTML element is used for the largest heading?',
      options: ['<heading>', '<h6>', '<h1>', '<head>'],
      correct: 2
    },
    {
      id: 3,
      question: 'How do you create a hyperlink in HTML?',
      options: [
        '<a url="http://example.com">Link</a>',
        '<a href="http://example.com">Link</a>',
        '<link>http://example.com</link>',
        '<hyperlink>http://example.com</hyperlink>'
      ],
      correct: 1
    }
  ]
};

export default function QuizContent() {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  const startQuiz = (quizId: string) => {
    setSelectedQuiz(quizId);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResults(false);
    setAnsweredQuestions([]);
  };

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(index);
      const questions = sampleQuestions.html;
      if (index === questions[currentQuestion].correct) {
        setScore(score + 1);
      }
      setAnsweredQuestions([...answeredQuestions, currentQuestion]);
    }
  };

  const handleNext = () => {
    const questions = sampleQuestions.html;
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  const goBack = () => {
    setSelectedQuiz(null);
    setShowResults(false);
  };

  if (showResults) {
    const questions = sampleQuestions.html;
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <section className="pt-20 pb-12 min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="glass-panel border-gray-700 p-8">
            <div className="text-center">
              <div className="text-6xl mb-4">
                {percentage >= 80 ? '🏆' : percentage >= 60 ? '⭐' : '📚'}
              </div>
              <h2 className="text-4xl font-bold mb-4">Quiz Completed!</h2>
              <p className="text-xl text-gray-400 mb-8">Here's how you did:</p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="text-3xl font-bold text-blue-400">{score}/{questions.length}</div>
                  <div className="text-sm text-gray-400 mt-2">Correct Answers</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="text-3xl font-bold text-green-400">{percentage}%</div>
                  <div className="text-sm text-gray-400 mt-2">Accuracy</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="text-3xl font-bold text-amber-400">
                    {percentage >= 80 ? 'Excellent' : percentage >= 60 ? 'Good' : 'Keep Learning'}
                  </div>
                  <div className="text-sm text-gray-400 mt-2">Performance</div>
                </div>
              </div>
              
              <div className="flex justify-center gap-4">
                <Button onClick={goBack} variant="outline">
                  Back to Quizzes
                </Button>
                <Button onClick={() => startQuiz(selectedQuiz!)} className="bg-blue-500 hover:bg-blue-600">
                  Retry Quiz
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    );
  }

  if (selectedQuiz) {
    const questions = sampleQuestions.html;
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <section className="pt-20 pb-12 min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="glass-panel border-gray-700 p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" onClick={goBack} className="text-gray-400">
                  ← Back
                </Button>
                <span className="text-xl font-semibold">HTML Fundamentals Quiz</span>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-gray-400 mb-1">
                  Question {currentQuestion + 1} of {questions.length}
                </div>
                <Progress value={progress} className="w-32" />
              </div>
            </div>
          </Card>

          <Card className="glass-panel border-gray-700 p-8">
            <h3 className="text-2xl font-bold mb-6">{question.question}</h3>
            
            <div className="space-y-4 mb-8">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-lg text-left transition-all border-2 ${
                    selectedAnswer === null
                      ? 'border-gray-700 hover:border-blue-400 hover:bg-blue-500/10'
                      : selectedAnswer === index
                      ? index === question.correct
                        ? 'border-green-500 bg-green-500/20'
                        : 'border-red-500 bg-red-500/20'
                      : index === question.correct
                      ? 'border-green-500 bg-green-500/20'
                      : 'border-gray-700 opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {selectedAnswer !== null && (
                      <span>
                        {index === question.correct ? '✓' : selectedAnswer === index ? '✗' : ''}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {selectedAnswer !== null && (
              <Button
                onClick={handleNext}
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
              </Button>
            )}
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-400">
          <Link href="/" className="text-blue-400 hover:underline">Home</Link>
          <span>/</span>
          <span>Quiz</span>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Test Your Knowledge</h1>
          <p className="text-xl text-gray-400">
            Challenge yourself with interactive quizzes and track your progress
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quizCategories.map((quiz) => (
            <Card
              key={quiz.id}
              className="glass-panel border-gray-700 hover:border-blue-400 transition-all cursor-pointer hover-lift"
              onClick={() => startQuiz(quiz.id)}
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <Image src={quiz.logo} alt={quiz.name} width={64} height={64} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{quiz.name}</h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex justify-between">
                    <span>Questions:</span>
                    <span>{quiz.questions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Difficulty:</span>
                    <Badge variant={quiz.difficulty === 'Beginner' ? 'default' : 'secondary'}>
                      {quiz.difficulty}
                    </Badge>
                  </div>
                  {quiz.bestScore > 0 && (
                    <div className="mt-4">
                      <div className="text-xs text-gray-500 mb-1">Best Score</div>
                      <div className="text-2xl font-bold text-green-400">{quiz.bestScore}%</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="glass-panel border-gray-700 mt-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Recent Quiz Results</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-400">HTML Quiz</span>
                  <span className="text-green-400 font-semibold">95%</span>
                </div>
                <Progress value={95} className="mb-2" />
                <div className="text-xs text-gray-500">Completed 2 days ago</div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-400">CSS Quiz</span>
                  <span className="text-yellow-400 font-semibold">72%</span>
                </div>
                <Progress value={72} className="mb-2" />
                <div className="text-xs text-gray-500">Completed 1 week ago</div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-400">JavaScript Quiz</span>
                  <span className="text-blue-400 font-semibold">90%</span>
                </div>
                <Progress value={90} className="mb-2" />
                <div className="text-xs text-gray-500">Completed 3 days ago</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
