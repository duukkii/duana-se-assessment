'use client';

import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, Users, Rocket } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();

  const steps = [
    {
      icon: Lightbulb,
      title: 'Choose Its Purpose',
      description: "Define your chatbot's main goal, such as lead generation or customer support.",
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: Users,
      title: 'Personalize Tone & Greeting',
      description: "Customize the chatbot's personality and how it first interacts with users.",
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: Rocket,
      title: 'Review & Go Live',
      description: 'Check your settings, activate your bot, and start tracking analytics.',
      color: 'text-teal-500',
      bgColor: 'bg-teal-500/10',
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="max-w-4xl w-full text-center">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Welcome to ChatFlow! 👋
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            Let&apos;s set up your first chatbot in a few easy steps.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="bg-card border-border">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-2xl ${step.bgColor} flex items-center justify-center mx-auto mb-6`}>
                      <Icon className={`w-8 h-8 ${step.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Button
            size="lg"
            className="px-8 py-6 text-lg"
            onClick={() => router.push('/chatbots/new')}
          >
            Create My First Chatbot
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
