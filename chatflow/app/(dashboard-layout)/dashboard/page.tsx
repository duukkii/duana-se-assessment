'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard-layout';
import { EmptyState } from '@/components/empty-state';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useChatbots, useDeleteChatbot } from '@/lib/hooks/use-chatbots';
import { Plus, Search, SlidersHorizontal, Grid3x3, List, Pencil, Trash2, Check } from 'lucide-react';

type SortOption = 'name-asc' | 'name-desc' | 'date-newest' | 'date-oldest' | 'conversations-high' | 'conversations-low';

export default function DashboardPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('date-newest');
  const { data: chatbots, isLoading } = useChatbots();
  const deleteMutation = useDeleteChatbot();

  // Filter and sort chatbots
  const filteredChatbots = chatbots
    ?.filter((bot) => bot.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'date-newest':
          // Assuming newer chatbots have higher IDs
          return parseInt(b.id) - parseInt(a.id);
        case 'date-oldest':
          return parseInt(a.id) - parseInt(b.id);
        case 'conversations-high':
          return b.conversations - a.conversations;
        case 'conversations-low':
          return a.conversations - b.conversations;
        default:
          return 0;
      }
    });

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this chatbot?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'inactive':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'draft':
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getAvatarColor = (avatar: string) => {
    const colors = [
      'bg-purple-600',
      'bg-teal-600',
      'bg-orange-600',
      'bg-blue-600',
      'bg-pink-600',
    ];
    return colors[avatar.charCodeAt(0) % colors.length];
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">My Chatbots</h1>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                Create and manage all your chatbots from this dashboard.
              </p>
            </div>
            <Button onClick={() => router.push('/chatbots/new')} size="lg" className="w-full sm:w-auto">
              <Plus className="w-5 h-5 mr-2" />
              Create New Chatbot
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6">
          <div className="relative flex-1 max-w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by chatbot name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-border"
            />
          </div>
          <div className="flex gap-3 sm:gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="flex-shrink-0">
                  <SlidersHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Sort & Filter</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSortBy('name-asc')} className="cursor-pointer">
                  <div className="flex items-center justify-between w-full">
                    <span>Name (A-Z)</span>
                    {sortBy === 'name-asc' && <Check className="w-4 h-4" />}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('name-desc')} className="cursor-pointer">
                  <div className="flex items-center justify-between w-full">
                    <span>Name (Z-A)</span>
                    {sortBy === 'name-desc' && <Check className="w-4 h-4" />}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSortBy('date-newest')} className="cursor-pointer">
                  <div className="flex items-center justify-between w-full">
                    <span>Newest First</span>
                    {sortBy === 'date-newest' && <Check className="w-4 h-4" />}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('date-oldest')} className="cursor-pointer">
                  <div className="flex items-center justify-between w-full">
                    <span>Oldest First</span>
                    {sortBy === 'date-oldest' && <Check className="w-4 h-4" />}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSortBy('conversations-high')} className="cursor-pointer">
                  <div className="flex items-center justify-between w-full">
                    <span>Most Conversations</span>
                    {sortBy === 'conversations-high' && <Check className="w-4 h-4" />}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('conversations-low')} className="cursor-pointer">
                  <div className="flex items-center justify-between w-full">
                    <span>Least Conversations</span>
                    {sortBy === 'conversations-low' && <Check className="w-4 h-4" />}
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex gap-1 bg-secondary rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid3x3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading chatbots...</p>
          </div>
        )}

        {/* Grid View */}
        {!isLoading && viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChatbots?.map((bot) => (
              <Card 
                key={bot.id} 
                className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => router.push(`/chatbots/${bot.id}/analytics`)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={bot.avatar} alt={bot.name} />
                        <AvatarFallback className={`${getAvatarColor(bot.avatar)} text-white font-semibold`}>
                          {bot.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-foreground">{bot.name}</h3>
                        <Badge
                          variant="outline"
                          className={`mt-1 capitalize ${getStatusColor(bot.status)}`}
                        >
                          {bot.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Conversations</span>
                      <span className="font-semibold text-foreground">{bot.conversations.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Active Users</span>
                      <span className="font-semibold text-foreground">{bot.activeUsers}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Resolution</span>
                      <span className="font-semibold text-foreground">{bot.resolution}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground">Updated: {bot.updatedAt}</span>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/chatbots/${bot.id}/edit`);
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(bot.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* List View */}
        {!isLoading && viewMode === 'list' && (
          <div className="space-y-4">
            {filteredChatbots?.map((bot) => (
              <Card 
                key={bot.id} 
                className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => router.push(`/chatbots/${bot.id}/analytics`)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={bot.avatar} alt={bot.name} />
                        <AvatarFallback className={`${getAvatarColor(bot.avatar)} text-white font-semibold`}>
                          {bot.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-foreground">{bot.name}</h3>
                          <Badge
                            variant="outline"
                            className={`capitalize ${getStatusColor(bot.status)}`}
                          >
                            {bot.status}
                          </Badge>
                        </div>
                        <div className="flex gap-6 text-sm">
                          <div>
                            <span className="text-muted-foreground">Conversations: </span>
                            <span className="font-semibold text-foreground">{bot.conversations.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Active Users: </span>
                            <span className="font-semibold text-foreground">{bot.activeUsers}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Resolution: </span>
                            <span className="font-semibold text-foreground">{bot.resolution}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Updated: </span>
                            <span className="text-foreground">{bot.updatedAt}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/chatbots/${bot.id}/edit`);
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(bot.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredChatbots?.length === 0 && searchQuery === '' && (
          <div className="max-w-md mx-auto">
            <EmptyState />
          </div>
        )}

        {/* No Search Results */}
        {!isLoading && filteredChatbots?.length === 0 && searchQuery !== '' && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No chatbots found matching &quot;{searchQuery}&quot;</p>
            <Button variant="outline" onClick={() => setSearchQuery('')}>
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
