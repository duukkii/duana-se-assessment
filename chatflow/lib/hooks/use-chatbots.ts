import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Chatbot {
  id: string;
  name: string;
  avatar: string;
  status: 'active' | 'inactive' | 'draft';
  conversations: number;
  activeUsers: number;
  resolution: string;
  updatedAt: string;
}

interface CreateChatbotData {
  name: string;
  avatar?: string;
  welcomeMessage: string;
  tone: string;
  basePrompt: string;
}

export function useChatbots() {
  return useQuery({
    queryKey: ['chatbots'],
    queryFn: async () => {
      // Check if user has created chatbots (stored in localStorage)
      const hasCreatedChatbots = localStorage.getItem('hasCreatedChatbots') === 'true';
      
      // Pass query parameter to API
      const url = hasCreatedChatbots ? '/api/chatbots?existing=true' : '/api/chatbots';
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch chatbots');
      }
      const data = await response.json();
      return data.chatbots as Chatbot[];
    },
  });
}

export function useCreateChatbot() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateChatbotData) => {
      const response = await fetch('/api/chatbots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create chatbot');
      }
      
      return response.json();
    },
    onSuccess: () => {
      // Mark that user has created at least one chatbot
      localStorage.setItem('hasCreatedChatbots', 'true');
      queryClient.invalidateQueries({ queryKey: ['chatbots'] });
    },
  });
}

export function useDeleteChatbot() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/chatbots/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete chatbot');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatbots'] });
    },
  });
}

export function useUpdateChatbot() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Chatbot> }) => {
      const response = await fetch(`/api/chatbots/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update chatbot');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatbots'] });
    },
  });
}
