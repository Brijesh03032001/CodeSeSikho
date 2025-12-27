'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const defaultHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Project</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>Start coding here...</p>
</body>
</html>`;

const defaultCSS = `body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  background: #f0f0f0;
}

h1 {
  color: #00d4ff;
}`;

const defaultJS = `console.log('Welcome to CodeLearn Playground!');

// Your JavaScript code here`;

export default function PlaygroundContent() {
  const [html, setHtml] = useState(defaultHTML);
  const [css, setCSS] = useState(defaultCSS);
  const [js, setJS] = useState(defaultJS);
  const [output, setOutput] = useState('');

  const runCode = () => {
    const combinedHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html.replace(/<head>[\s\S]*<\/head>/, '').replace(/<!DOCTYPE html>/, '').replace(/<html[^>]*>/, '').replace(/<\/html>/, '').replace(/<body[^>]*>/, '').replace(/<\/body>/, '')}
          <script>
            ${js}
          </script>
        </body>
      </html>
    `;
    setOutput(combinedHTML);
  };

  return (
    <section className="pt-20 pb-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-400">
          <Link href="/" className="text-blue-400 hover:underline">Home</Link>
          <span>/</span>
          <span>Playground</span>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Code Playground</h1>
          <p className="text-xl text-gray-400">
            Write HTML, CSS, and JavaScript code and see live results
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Code Editors */}
          <div>
            <Card className="glass-panel border-gray-700 h-full">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Code Editor</h2>
                  <Button onClick={runCode} className="bg-green-500 hover:bg-green-600">
                    ▶ Run Code
                  </Button>
                </div>

                <Tabs defaultValue="html" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                    <TabsTrigger value="html">HTML</TabsTrigger>
                    <TabsTrigger value="css">CSS</TabsTrigger>
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  </TabsList>

                  <TabsContent value="html" className="mt-4">
                    <Textarea
                      value={html}
                      onChange={(e) => setHtml(e.target.value)}
                      className="code-font h-[500px] bg-black border-gray-600 font-mono text-sm"
                      placeholder="Write your HTML here..."
                    />
                  </TabsContent>

                  <TabsContent value="css" className="mt-4">
                    <Textarea
                      value={css}
                      onChange={(e) => setCSS(e.target.value)}
                      className="code-font h-[500px] bg-black border-gray-600 font-mono text-sm"
                      placeholder="Write your CSS here..."
                    />
                  </TabsContent>

                  <TabsContent value="javascript" className="mt-4">
                    <Textarea
                      value={js}
                      onChange={(e) => setJS(e.target.value)}
                      className="code-font h-[500px] bg-black border-gray-600 font-mono text-sm"
                      placeholder="Write your JavaScript here..."
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Live Preview */}
          <div>
            <Card className="glass-panel border-gray-700 h-full">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Live Preview</h2>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>

                <div className="bg-white rounded-lg overflow-hidden" style={{ height: '550px' }}>
                  {output ? (
                    <iframe
                      srcDoc={output}
                      title="output"
                      sandbox="allow-scripts"
                      className="w-full h-full border-0"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <div className="text-center">
                        <div className="text-6xl mb-4">💻</div>
                        <p>Click "Run Code" to see your output</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Examples */}
        <Card className="glass-panel border-gray-700 mt-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Quick Start Examples</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-start"
                onClick={() => {
                  setHtml('<div class="container">\n  <h1>Beautiful Card</h1>\n  <p>This is a styled card component</p>\n</div>');
                  setCSS('.container {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  padding: 40px;\n  border-radius: 20px;\n  color: white;\n  text-align: center;\n  box-shadow: 0 10px 40px rgba(0,0,0,0.3);\n}');
                  setJS('');
                }}
              >
                <span className="font-semibold mb-2">Beautiful Card</span>
                <span className="text-xs text-gray-400">Gradient card with shadow</span>
              </Button>

              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-start"
                onClick={() => {
                  setHtml('<button id="btn">Click Me!</button>\n<p id="text">Click count: 0</p>');
                  setCSS('button {\n  background: #00d4ff;\n  color: white;\n  border: none;\n  padding: 15px 30px;\n  font-size: 18px;\n  border-radius: 8px;\n  cursor: pointer;\n}\nbutton:hover {\n  background: #00a8cc;\n}');
                  setJS('let count = 0;\ndocument.getElementById("btn").addEventListener("click", () => {\n  count++;\n  document.getElementById("text").innerText = `Click count: ${count}`;\n});');
                }}
              >
                <span className="font-semibold mb-2">Interactive Button</span>
                <span className="text-xs text-gray-400">Button with click counter</span>
              </Button>

              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-start"
                onClick={() => {
                  setHtml('<div class="box"></div>');
                  setCSS('.box {\n  width: 100px;\n  height: 100px;\n  background: #4ade80;\n  animation: spin 2s linear infinite;\n}\n\n@keyframes spin {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}');
                  setJS('');
                }}
              >
                <span className="font-semibold mb-2">CSS Animation</span>
                <span className="text-xs text-gray-400">Rotating box animation</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
