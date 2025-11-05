'use client';

import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

export function EmptyState() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/chatbots/new')}
      className="group relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-card p-12 transition-all hover:border-primary/50 hover:bg-card/80"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
        <Plus className="h-8 w-8 text-primary" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-foreground">
        Create a New Chatbot
      </h3>
      <p className="text-sm text-muted-foreground">
        Build and launch a new chatbot to engage your users.
      </p>
    </button>
  );
}
