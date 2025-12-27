'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HeroSection() {
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const strings = [
    'Build Websites',
    'Create Apps',
    'Master JavaScript',
    'Design Interfaces',
    'Deploy Projects'
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < strings[currentIndex].length) {
        setTypedText(strings[currentIndex].substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setTypedText(strings[currentIndex].substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === strings[currentIndex].length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setCurrentIndex((currentIndex + 1) % strings.length);
      }
    }, isDeleting ? 60 : 80);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentIndex]);

  return (
    <section className="pt-20 min-h-screen flex items-center relative">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Master <span className="text-blue-400">Coding</span><br />
              {typedText}<span className="typing-cursor">|</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Learn web development through interactive tutorials, live code editing, 
              and hands-on projects. From HTML basics to advanced React applications.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/tutorials">
              <Button className="bg-blue-500 hover:bg-blue-600 px-8 py-6 text-lg font-semibold hover-lift">
                Start Learning
              </Button>
            </Link>
            <Link href="/tutorials">
              <Button variant="outline" className="border-gray-600 hover:border-blue-400 px-8 py-6 text-lg font-semibold">
                View Tutorials
              </Button>
            </Link>
          </div>
          
          <StatsCounter />
        </motion.div>
        
        <CodePreview />
      </div>
    </section>
  );
}

function StatsCounter() {
  const [stats, setStats] = useState({ students: 0, tutorials: 0, examples: 0 });

  useEffect(() => {
    const targets = { students: 50000, tutorials: 150, examples: 1000 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let current = { students: 0, tutorials: 0, examples: 0 };
    const increments = {
      students: targets.students / steps,
      tutorials: targets.tutorials / steps,
      examples: targets.examples / steps,
    };

    const interval = setInterval(() => {
      current.students = Math.min(current.students + increments.students, targets.students);
      current.tutorials = Math.min(current.tutorials + increments.tutorials, targets.tutorials);
      current.examples = Math.min(current.examples + increments.examples, targets.examples);

      setStats({
        students: Math.floor(current.students),
        tutorials: Math.floor(current.tutorials),
        examples: Math.floor(current.examples),
      });

      if (current.students >= targets.students) {
        clearInterval(interval);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-8 pt-8">
      <div className="text-center">
        <div className="stats-counter">{stats.students.toLocaleString()}</div>
        <div className="text-gray-400">Students</div>
      </div>
      <div className="text-center">
        <div className="stats-counter">{stats.tutorials}</div>
        <div className="text-gray-400">Tutorials</div>
      </div>
      <div className="text-center">
        <div className="stats-counter">{stats.examples.toLocaleString()}</div>
        <div className="text-gray-400">Code Examples</div>
      </div>
    </div>
  );
}

function CodePreview() {
  return (
    <motion.div 
      className="floating-element"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="glass-panel rounded-xl p-6 glow-effect">
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-sm text-gray-400">Live Preview</div>
        </div>
        <div className="code-editor">
          <pre className="text-sm">
<span className="syntax-keyword">function</span> <span className="syntax-function">createWebsite</span>() {'{'}
  <span className="syntax-keyword">const</span> element = <span className="syntax-function">document</span>.<span className="syntax-function">createElement</span>(<span className="syntax-string">'div'</span>);
  element.<span className="syntax-function">innerHTML</span> = <span className="syntax-string">'Hello, World!'</span>;
  <span className="syntax-keyword">return</span> element;
{'}'}

<span className="syntax-comment">// Initialize the app</span>
<span className="syntax-function">document</span>.<span className="syntax-function">body</span>.<span className="syntax-function">appendChild</span>(<span className="syntax-function">createWebsite</span>());
          </pre>
        </div>
      </div>
    </motion.div>
  );
}
