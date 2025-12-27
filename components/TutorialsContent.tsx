'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const tutorials = [
  { 
    id: 'html-basics', 
    category: 'HTML', 
    title: 'HTML Basics', 
    status: 'completed',
    duration: '15 min',
    difficulty: 'Beginner'
  },
  { 
    id: 'html-forms', 
    category: 'HTML', 
    title: 'Forms & Input', 
    status: 'in-progress',
    duration: '20 min',
    difficulty: 'Beginner'
  },
  { 
    id: 'html-semantic', 
    category: 'HTML', 
    title: 'Semantic HTML', 
    status: 'not-started',
    duration: '18 min',
    difficulty: 'Beginner'
  },
  { 
    id: 'css-basics', 
    category: 'CSS', 
    title: 'CSS Fundamentals', 
    status: 'completed',
    duration: '25 min',
    difficulty: 'Beginner'
  },
  { 
    id: 'css-flexbox', 
    category: 'CSS', 
    title: 'Flexbox Layout', 
    status: 'in-progress',
    duration: '30 min',
    difficulty: 'Intermediate'
  },
  { 
    id: 'css-grid', 
    category: 'CSS', 
    title: 'CSS Grid', 
    status: 'not-started',
    duration: '30 min',
    difficulty: 'Intermediate'
  },
  { 
    id: 'js-basics', 
    category: 'JavaScript', 
    title: 'JavaScript Fundamentals', 
    status: 'not-started',
    duration: '45 min',
    difficulty: 'Beginner'
  },
  { 
    id: 'js-es6', 
    category: 'JavaScript', 
    title: 'ES6+ Features', 
    status: 'not-started',
    duration: '40 min',
    difficulty: 'Intermediate'
  },
  { 
    id: 'react-basics', 
    category: 'React', 
    title: 'React Fundamentals', 
    status: 'not-started',
    duration: '60 min',
    difficulty: 'Intermediate'
  },
];

const categories = [
  { name: 'HTML', logo: '/resources/html-logo.png', color: 'text-orange-400' },
  { name: 'CSS', logo: '/resources/css-logo.png', color: 'text-blue-400' },
  { name: 'JavaScript', logo: '/resources/js-logo.png', color: 'text-yellow-400' },
  { name: 'React', logo: '/resources/react-logo.png', color: 'text-cyan-400' },
];

export default function TutorialsContent() {
  const [activeTutorial, setActiveTutorial] = useState('html-basics');
  const [practiceCode, setPracticeCode] = useState('');

  const currentTutorial = tutorials.find(t => t.id === activeTutorial);
  const progress = (tutorials.filter(t => t.status === 'completed').length / tutorials.length) * 100;

  return (
    <section className="pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-400">
          <Link href="/" className="text-blue-400 hover:underline">Home</Link>
          <span>/</span>
          <span>Tutorials</span>
        </div>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Interactive Tutorials</h1>
            <p className="text-xl text-gray-400">
              Learn web development through hands-on coding exercises and real-world projects
            </p>
          </div>
          
          <Card className="glass-panel border-gray-700 w-fit">
            <CardContent className="p-4">
              <div className="text-sm text-gray-400">Total Progress</div>
              <div className="flex items-center space-x-3 mt-1">
                <div className="relative w-12 h-12">
                  <svg className="w-12 h-12 transform -rotate-90">
                    <circle cx="24" cy="24" r="20" stroke="rgba(255,255,255,0.1)" strokeWidth="4" fill="none"/>
                    <circle 
                      cx="24" 
                      cy="24" 
                      r="20" 
                      stroke="#00d4ff" 
                      strokeWidth="4" 
                      fill="none" 
                      strokeDasharray="125.6" 
                      strokeDashoffset={125.6 - (125.6 * progress / 100)}
                      className="transition-all duration-500"
                    />
                  </svg>
                </div>
                <span className="text-2xl font-bold">{Math.round(progress)}%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="glass-panel border-gray-700 sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-6">Learning Paths</h3>
                
                <div className="space-y-6">
                  {categories.map((category) => {
                    const categoryTutorials = tutorials.filter(t => t.category === category.name);
                    
                    return (
                      <div key={category.name}>
                        <div className="flex items-center space-x-3 mb-3">
                          <Image src={category.logo} alt={category.name} width={24} height={24} />
                          <span className={`font-semibold ${category.color}`}>{category.name}</span>
                        </div>
                        <div className="ml-9 space-y-2">
                          {categoryTutorials.map((tutorial) => (
                            <div
                              key={tutorial.id}
                              onClick={() => setActiveTutorial(tutorial.id)}
                              className={`p-3 rounded-lg border cursor-pointer transition-all hover:translate-x-1 ${
                                activeTutorial === tutorial.id
                                  ? 'bg-blue-500/20 border-blue-400'
                                  : 'border-transparent hover:bg-blue-500/10 hover:border-blue-400'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm">{tutorial.title}</span>
                                {tutorial.status === 'completed' && (
                                  <span className="text-xs text-green-400">✓</span>
                                )}
                                {tutorial.status === 'in-progress' && (
                                  <span className="text-xs text-blue-400">○</span>
                                )}
                                {tutorial.status === 'not-started' && (
                                  <span className="text-xs text-gray-500">○</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tutorial Content */}
          <div className="lg:col-span-2">
            <Card className="glass-panel border-gray-700">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6">{currentTutorial?.title}</h2>
                
                <div className="prose prose-invert max-w-none">
                  <h3 className="text-2xl font-semibold mb-4">Introduction</h3>
                  <p className="mb-6">
                    Welcome to this interactive tutorial. You'll learn the fundamentals through hands-on examples and exercises.
                  </p>

                  <h3 className="text-2xl font-semibold mb-4">Code Example</h3>
                  <div className="code-editor mb-6">
                    <pre className="text-sm">
<span className="syntax-tag">&lt;!DOCTYPE html&gt;</span>
<span className="syntax-tag">&lt;html&gt;</span>
<span className="syntax-tag">&lt;head&gt;</span>
    <span className="syntax-tag">&lt;title&gt;</span>My First Page<span className="syntax-tag">&lt;/title&gt;</span>
<span className="syntax-tag">&lt;/head&gt;</span>
<span className="syntax-tag">&lt;body&gt;</span>
    <span className="syntax-tag">&lt;h1&gt;</span>Welcome to HTML!<span className="syntax-tag">&lt;/h1&gt;</span>
    <span className="syntax-tag">&lt;p&gt;</span>This is my first web page.<span className="syntax-tag">&lt;/p&gt;</span>
<span className="syntax-tag">&lt;/body&gt;</span>
<span className="syntax-tag">&lt;/html&gt;</span>
                    </pre>
                  </div>

                  <h3 className="text-2xl font-semibold mb-4">Interactive Exercise</h3>
                  <p className="mb-4">Try creating your first HTML page:</p>
                  
                  <Card className="bg-gray-800 border-gray-700 mb-6">
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-4">Challenge: Create a simple webpage</h4>
                      <p className="text-sm text-gray-400 mb-4">Write HTML code that creates:</p>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-gray-400 mb-4">
                        <li>A main heading with your name</li>
                        <li>A paragraph about yourself</li>
                        <li>A list of your hobbies</li>
                        <li>A link to your favorite website</li>
                      </ol>
                      
                      <Textarea
                        value={practiceCode}
                        onChange={(e) => setPracticeCode(e.target.value)}
                        placeholder="Write your HTML code here..."
                        className="code-font h-32 bg-black border-gray-600"
                      />
                      
                      <Button className="mt-4 bg-blue-500 hover:bg-blue-600">
                        Run Code
                      </Button>
                    </CardContent>
                  </Card>

                  <div className="flex justify-between items-center pt-6 border-t border-gray-700">
                    <Button variant="ghost" className="text-gray-400 hover:text-white">
                      <span>←</span>
                      <span className="ml-2">Previous</span>
                    </Button>
                    <Button variant="ghost" className="text-blue-400 hover:text-blue-300">
                      <span className="mr-2">Next</span>
                      <span>→</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="glass-panel border-gray-700">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Tutorial Info</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration</span>
                    <span>{currentTutorial?.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Difficulty</span>
                    <Badge variant={currentTutorial?.difficulty === 'Beginner' ? 'default' : 'secondary'}>
                      {currentTutorial?.difficulty}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    {currentTutorial?.status === 'completed' && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500">Completed</Badge>
                    )}
                    {currentTutorial?.status === 'in-progress' && (
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500">In Progress</Badge>
                    )}
                    {currentTutorial?.status === 'not-started' && (
                      <Badge variant="outline">Not Started</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
