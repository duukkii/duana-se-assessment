import { NextResponse } from 'next/server';

const mockChatbots = [
  {
    id: '1',
    name: 'Customer Support',
    avatar: `/avatars/avatar-1.svg`,
    status: 'active',
    conversations: 1420,
    activeUsers: 85,
    resolution: '92%',
    updatedAt: '2d ago',
  },
  {
    id: '2',
    name: 'Sales Lead Gen',
    avatar: `/avatars/avatar-2.svg`,
    status: 'inactive',
    conversations: 5600,
    activeUsers: 12,
    resolution: '78%',
    updatedAt: '1w ago',
  },
  {
    id: '3',
    name: 'Onboarding Assistant',
    avatar: `/avatars/avatar-3.svg`,
    status: 'draft',
    conversations: 0,
    activeUsers: 0,
    resolution: '-',
    updatedAt: '3h ago',
  },
];

// In-memory storage for demo purposes (would be a database in production)
let userChatbots: { [key: string]: any[] } = {};

export async function GET(request: Request) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Check if this is a demo request with existing chatbots
  const url = new URL(request.url);
  const hasExisting = url.searchParams.get('existing') === 'true';

  // For demo: if user has existing chatbots flag, return mock data
  // Otherwise return empty array (new user)
  const chatbots = hasExisting ? mockChatbots : [];

  return NextResponse.json({
    success: true,
    chatbots: chatbots,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const newChatbot = {
    id: String(Date.now()), // Use timestamp for unique ID
    name: body.name,
    avatar: body.avatar || body.name.charAt(0).toUpperCase(),
    status: 'draft',
    conversations: 0,
    activeUsers: 0,
    resolution: '-',
    updatedAt: 'Just now',
    welcomeMessage: body.welcomeMessage,
    tone: body.tone,
    basePrompt: body.basePrompt,
  };

  // In a real app, this would save to database
  // For demo, we'll rely on client-side state management

  return NextResponse.json({
    success: true,
    chatbot: newChatbot,
  });
}
