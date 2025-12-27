'use client';

import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

const achievements = [
  {
    emoji: '🏆',
    title: 'HTML Master',
    description: 'Completed all HTML tutorials',
    gradient: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
  },
  {
    emoji: '⚡',
    title: 'CSS Wizard',
    description: 'Mastered responsive design',
    gradient: 'linear-gradient(135deg, #4ade80, #22c55e)',
  },
  {
    emoji: '🚀',
    title: 'JavaScript Ninja',
    description: 'ES6+ features unlocked',
    gradient: 'linear-gradient(135deg, #f87171, #ef4444)',
  },
];

export default function LearningProgress() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !chartRef.current) return;

    // Dynamically import echarts to avoid SSR issues
    import('echarts').then((echarts) => {
      const chart = echarts.init(chartRef.current!);

      const option = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(45, 45, 45, 0.9)',
          borderColor: '#00d4ff',
          textStyle: { color: '#fff' },
        },
        legend: {
          top: '5%',
          left: 'center',
          textStyle: { color: '#d1d5db' },
        },
        series: [
          {
            name: 'Learning Progress',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#1a1a1a',
              borderWidth: 2,
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold',
                color: '#fff',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: 'HTML', itemStyle: { color: '#e34c26' } },
              { value: 735, name: 'CSS', itemStyle: { color: '#264de4' } },
              { value: 580, name: 'JavaScript', itemStyle: { color: '#f0db4f' } },
              { value: 484, name: 'React', itemStyle: { color: '#61dafb' } },
              { value: 300, name: 'Node.js', itemStyle: { color: '#68a063' } },
            ],
          },
        ],
      };

      chart.setOption(option);

      const handleResize = () => chart.resize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.dispose();
      };
    });
  }, []);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <Card className="glass-panel border-gray-700 p-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">Your Learning Journey</h3>
              <div className="space-y-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div
                      className="achievement-badge w-[60px] h-[60px] rounded-full flex items-center justify-center text-2xl"
                      style={{ background: achievement.gradient }}
                    >
                      {achievement.emoji}
                    </div>
                    <div>
                      <div className="font-semibold">{achievement.title}</div>
                      <div className="text-sm text-gray-400">{achievement.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div ref={chartRef} className="h-80" />
          </div>
        </Card>
      </div>
    </section>
  );
}
