'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { DashboardLayout } from '@/components/dashboard-layout';
import { SuccessDialog } from '@/components/success-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCreateChatbot } from '@/lib/hooks/use-chatbots';
import { Upload, Lightbulb } from 'lucide-react';

// Cache buster for updated SVG avatars
const AVATAR_VERSION = '2';

export default function CreateChatbotPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [tone, setTone] = useState('professional');
  const [customTone, setCustomTone] = useState('');
  const [basePrompt, setBasePrompt] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(`/avatars/avatar-1.svg?v=${AVATAR_VERSION}`);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showHints, setShowHints] = useState(true);
  const createMutation = useCreateChatbot();

  const avatarOptions = [
    `/avatars/avatar-1.svg?v=${AVATAR_VERSION}`,
    `/avatars/avatar-2.svg?v=${AVATAR_VERSION}`,
    `/avatars/avatar-3.svg?v=${AVATAR_VERSION}`,
    `/avatars/avatar-4.svg?v=${AVATAR_VERSION}`,
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setUploadedImage(result);
        setSelectedAvatar(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Use custom tone if "others" is selected, otherwise use the selected tone
      const finalTone = tone === 'others' ? customTone : tone;
      
      await createMutation.mutateAsync({
        name,
        avatar: selectedAvatar,
        welcomeMessage,
        tone: finalTone,
        basePrompt,
      });
      setShowSuccessDialog(true);
    } catch (error) {
      console.error('Failed to create chatbot:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/dashboard" className="hover:text-foreground">
            Dashboard
          </Link>
          <span>/</span>
          <Link href="/dashboard" className="hover:text-foreground">
            Chatbots
          </Link>
          <span>/</span>
          <span className="text-foreground">Create New</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Create a New Chatbot</h1>
            <p className="text-muted-foreground mt-1">
              Fill in the details below to configure and launch your new chatbot.
            </p>
          </div>
          <Button variant="outline" onClick={() => setShowHints(!showHints)}>
            {showHints ? 'Skip Hints' : 'Show Hints'}
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Define the core identity of your chatbot.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Chatbot Avatar */}
              <div className="space-y-3">
                <Label>Chatbot Avatar</Label>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-card border-2 border-border flex items-center justify-center overflow-hidden">
                      {selectedAvatar && (
                        <img
                          src={uploadedImage || selectedAvatar}
                          alt="Chatbot avatar"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <input
                      type="file"
                      id="avatar-upload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="secondary"
                      className="absolute -bottom-1 -right-1 rounded-full h-8 w-8"
                      onClick={() => document.getElementById('avatar-upload')?.click()}
                    >
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Or select one of our default avatars below:</p>
                    <div className="flex gap-2">
                      {avatarOptions.map((avatar) => (
                        <button
                          key={avatar}
                          type="button"
                          onClick={() => {
                            setSelectedAvatar(avatar);
                            setUploadedImage(null);
                          }}
                          className={`w-12 h-12 rounded-full bg-card border-2 transition-all overflow-hidden ${
                            selectedAvatar === avatar && !uploadedImage
                              ? 'ring-4 ring-primary border-primary'
                              : 'border-border opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={avatar}
                            alt="Avatar option"
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {showHints && (
                  <div className="flex items-start gap-2 text-sm text-yellow-600 bg-yellow-500/10 p-3 rounded-lg">
                    <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>Give your chatbot a face! A logo or avatar helps users connect with it.</p>
                  </div>
                )}
              </div>

              {/* Chatbot Name */}
              <div className="space-y-3">
                <Label htmlFor="name">Chatbot Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Customer Support Bot"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-secondary border-border"
                />
                {showHints && (
                  <div className="flex items-start gap-2 text-sm text-yellow-600 bg-yellow-500/10 p-3 rounded-lg">
                    <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>This is how your team will recognize this chatbot in the dashboard.</p>
                  </div>
                )}
              </div>

              {/* Welcome Message */}
              <div className="space-y-3">
                <Label htmlFor="welcomeMessage">Welcome Message</Label>
                <Textarea
                  id="welcomeMessage"
                  placeholder="Hi there! How can I help you today?"
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  required
                  rows={3}
                  className="bg-secondary border-border resize-none"
                />
                {showHints && (
                  <div className="flex items-start gap-2 text-sm text-yellow-600 bg-yellow-500/10 p-3 rounded-lg">
                    <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>A great welcome message makes a strong first impression.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Personality & Behavior */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Personality & Behavior</CardTitle>
              <CardDescription>Customize how your chatbot interacts with users.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Tone */}
              <div className="space-y-3">
                <Label htmlFor="tone">Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger id="tone" className="bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
                
                {/* Custom Tone Input - Shows when "Others" is selected */}
                {tone === 'others' && (
                  <div className="space-y-2">
                    <Label htmlFor="customTone">Custom Tone</Label>
                    <Input
                      id="customTone"
                      placeholder="e.g., Humorous, Empathetic, Technical..."
                      value={customTone}
                      onChange={(e) => setCustomTone(e.target.value)}
                      className="bg-secondary border-border"
                      required
                    />
                  </div>
                )}
                
                {showHints && (
                  <div className="flex items-start gap-2 text-sm text-yellow-600 bg-yellow-500/10 p-3 rounded-lg">
                    <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>Pick a personality to match your brand&apos;s voice.</p>
                  </div>
                )}
              </div>

              {/* Base Prompt / Instructions */}
              <div className="space-y-3">
                <Label htmlFor="basePrompt">Base Prompt / Instructions</Label>
                <Textarea
                  id="basePrompt"
                  placeholder="e.g., You are a helpful assistant for Company Inc. Answer questions based on the provided data sources."
                  value={basePrompt}
                  onChange={(e) => setBasePrompt(e.target.value)}
                  required
                  rows={5}
                  className="bg-secondary border-border resize-none"
                />
                {showHints && (
                  <div className="flex items-start gap-2 text-sm text-yellow-600 bg-yellow-500/10 p-3 rounded-lg">
                    <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>Provide clear instructions for the AI to follow. Be specific about its role and constraints.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/dashboard')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? 'Creating...' : 'Create Chatbot'}
            </Button>
          </div>
        </form>
      </div>

      <SuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        chatbotName={name}
      />
    </DashboardLayout>
  );
}
