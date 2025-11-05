'use client';

import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chatbotName: string;
}

export function SuccessDialog({ open, onOpenChange, chatbotName }: SuccessDialogProps) {
  const router = useRouter();

  const handleViewDashboard = () => {
    onOpenChange(false);
    router.push('/dashboard');
  };

  const handleOpenAnalytics = () => {
    onOpenChange(false);
    router.push('/analytics');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="items-center text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-green-500/10 p-3">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </div>
          </div>
          <DialogTitle className="text-2xl">Chatbot Created Successfully!</DialogTitle>
          <DialogDescription className="text-base text-center">
            <span className="font-semibold">&quot;{chatbotName}&quot;</span> is ready. You can now monitor its
            performance in your analytics.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 mt-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleViewDashboard}
          >
            View Dashboard
          </Button>
          <Button
            className="flex-1"
            onClick={handleOpenAnalytics}
          >
            Open Analytics
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
