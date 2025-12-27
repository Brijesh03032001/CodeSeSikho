'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const categories = [
  { id: 'html', name: 'HTML', logo: '/resources/html-logo.png' },
  { id: 'css', name: 'CSS', logo: '/resources/css-logo.png' },
  { id: 'javascript', name: 'JavaScript', logo: '/resources/js-logo.png' },
  { id: 'react', name: 'React', logo: '/resources/react-logo.png' },
  { id: 'nodejs', name: 'Node.js', logo: '/resources/node-logo.png' },
];

const tutorials = [
  {
    id: 1,
    category: 'html',
    title: 'HTML Fundamentals',
    description: 'Learn the building blocks of web pages with semantic HTML elements.',
    image: '/resources/tutorial-responsive.jpg',
    status: 'completed',
    duration: '15 min',
  },
  {
    id: 2,
    category: 'css',
    title: 'CSS Flexbox Mastery',
    description: 'Master flexible layouts with CSS Flexbox for responsive designs.',
    image: '/resources/tutorial-flexbox.jpg',
    status: 'in-progress',
    progress: 75,
    duration: '25 min',
  },
  {
    id: 3,
    category: 'javascript',
    title: 'JavaScript ES6+',
    description: 'Modern JavaScript features including arrow functions and destructuring.',
    image: '/resources/tutorial-javascript.jpg',
    status: 'not-started',
    duration: '45 min',
  },
  {
    id: 4,
    category: 'react',
    title: 'React Hooks',
    description: 'Build modern React applications with functional components and hooks.',
    image: '/resources/tutorial-react.jpg',
    status: 'not-started',
    duration: '60 min',
  },
  {
    id: 5,
    category: 'nodejs',
    title: 'Node.js Backend',
    description: 'Build server-side applications with Node.js and Express.',
    image: '/resources/tutorial-backend.jpg',
    status: 'not-started',
    duration: '90 min',
  },
];

export default function TutorialBrowser() {
  const [activeCategory, setActiveCategory] = useState('html');

  const filteredTutorials = tutorials.filter(t => t.category === activeCategory);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Interactive Learning Paths</h2>
          <p className="text-xl text-gray-400">Choose your learning journey and start coding immediately</p>
        </div>
        
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Tutorial Categories */}
          <div className="space-y-4">
            <div className="glass-panel rounded-lg p-4">
              <h3 className="font-semibold mb-4">Technologies</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className={`tutorial-category flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                      activeCategory === category.id
                        ? 'bg-blue-500/20 border border-blue-400'
                        : 'hover:bg-gray-700/50'
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <Image src={category.logo} alt={category.name} width={32} height={32} />
                    <span>{category.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Tutorial Grid */}
          <div className="lg:col-span-2">
            <div className="grid gap-6">
              {filteredTutorials.map((tutorial, index) => (
                <motion.div
                  key={tutorial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="tutorial-card hover-lift bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Image 
                          src={tutorial.image} 
                          alt={tutorial.title} 
                          width={64} 
                          height={64}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold mb-2">{tutorial.title}</h4>
                          <p className="text-gray-400 text-sm mb-3">{tutorial.description}</p>
                          <div className="flex items-center space-x-4 text-sm">
                            {tutorial.status === 'completed' && (
                              <Badge className="bg-green-500/20 text-green-400 border-green-500">
                                ✓ Completed
                              </Badge>
                            )}
                            {tutorial.status === 'in-progress' && (
                              <>
                                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500">
                                  In Progress
                                </Badge>
                                <div className="w-20 h-1 bg-gray-700 rounded">
                                  <div 
                                    className="h-full bg-blue-400 rounded" 
                                    style={{ width: `${tutorial.progress}%` }}
                                  />
                                </div>
                              </>
                            )}
                            {tutorial.status === 'not-started' && (
                              <span className="text-gray-400">Not Started</span>
                            )}
                            <span className="text-gray-500">{tutorial.duration}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Code Preview */}
          <div className="space-y-4">
            <div className="glass-panel rounded-lg p-4">
              <h3 className="font-semibold mb-4">Live Preview</h3>
              <div className="code-editor h-64 overflow-y-auto">
                <pre className="text-sm">
<span className="syntax-keyword">const</span> <span className="syntax-function">greeting</span> = () ={'>'} {'{'}
  <span className="syntax-keyword">const</span> messages = [
    <span className="syntax-string">'Welcome to CodeLearn!'</span>,
    <span className="syntax-string">'Start your coding journey'</span>,
    <span className="syntax-string">'Build amazing projects'</span>
  ];
  
  <span className="syntax-keyword">return</span> messages[<span className="syntax-function">Math</span>.<span className="syntax-function">floor</span>(<span className="syntax-function">Math</span>.<span className="syntax-function">random</span>() * messages.<span className="syntax-property">length</span>)];
{'}'};

<span className="syntax-function">console</span>.<span className="syntax-function">log</span>(<span className="syntax-function">greeting</span>());
                </pre>
              </div>
              <Button className="w-full mt-4 bg-green-500 hover:bg-green-600">
                Run Code
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
