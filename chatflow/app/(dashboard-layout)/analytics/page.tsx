'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BarChart3, TrendingUp, Users, MessageSquare, Plus, Download, ArrowRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Mock chatbot data
const mockChatbots = [
  {
    id: '1',
    name: 'Customer Support',
    avatar: '/avatars/avatar-1.svg',
    status: 'active',
    conversations: 1420,
    activeUsers: 85,
    resolution: '92%',
  },
  {
    id: '2',
    name: 'Sales Lead Gen',
    avatar: '/avatars/avatar-2.svg',
    status: 'inactive',
    conversations: 5600,
    activeUsers: 12,
    resolution: '78%',
  },
  {
    id: '3',
    name: 'Onboarding Assistant',
    avatar: '/avatars/avatar-3.svg',
    status: 'draft',
    conversations: 0,
    activeUsers: 0,
    resolution: '-',
  },
];

// Generate mock time series data
const generateTimeSeriesData = (days: number) => {
  const data = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      conversations: Math.floor(Math.random() * 300) + 500,
      activeUsers: Math.floor(Math.random() * 40) + 80,
      resolution: Math.floor(Math.random() * 15) + 80,
    });
  }
  
  return data;
};

export default function AnalyticsPage() {
  const router = useRouter();
  const [hasCreatedChatbots, setHasCreatedChatbots] = useState(false);
  const [dateRange, setDateRange] = useState('30');
  
  // Generate chart data based on date range
  const chartData = useMemo(() => {
    return generateTimeSeriesData(parseInt(dateRange));
  }, [dateRange]);
  
  // Generate chatbot comparison data
  const chatbotComparisonData = mockChatbots.map(bot => ({
    name: bot.name.split(' ')[0], // Short name for chart
    conversations: bot.conversations,
    activeUsers: bot.activeUsers,
  }));

  useEffect(() => {
    // Check if user has created chatbots
    const hasChatbots = localStorage.getItem('hasCreatedChatbots') === 'true';
    setHasCreatedChatbots(hasChatbots);
  }, []);

  const stats = [
    {
      title: 'Total Conversations',
      value: '7,020',
      change: '+12.5%',
      icon: MessageSquare,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Active Users',
      value: '97',
      change: '+8.2%',
      icon: Users,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Avg Resolution Rate',
      value: '85%',
      change: '+3.1%',
      icon: TrendingUp,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Total Chatbots',
      value: '3',
      change: '0%',
      icon: BarChart3,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
  ];

  // Empty state for new users
  if (!hasCreatedChatbots) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Monitor your chatbot performance and user engagement.
            </p>
          </div>

          {/* Empty State Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="bg-card border-border">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground">0</div>
                    <p className="text-xs text-muted-foreground mt-1">No data yet</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Empty State Message */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Detailed Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex flex-col items-center justify-center text-center">
                <BarChart3 className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No Analytics Data Yet
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Analytics charts and detailed metrics would be displayed here once you create your first chatbot.
                </p>
                <Button onClick={() => router.push('/chatbots/new')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Chatbot
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Date', 'Conversations', 'Active Users', 'Resolution Rate (%)'];
    const csvContent = [
      headers.join(','),
      ...chartData.map(row => 
        `${row.date},${row.conversations},${row.activeUsers},${row.resolution}`
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `overall_analytics_${dateRange}days.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  // Regular analytics view for users with chatbots
  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
              <p className="text-muted-foreground mt-1">
                Monitor your chatbot performance and user engagement.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-full sm:w-[180px] bg-secondary border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 Days</SelectItem>
                  <SelectItem value="30">Last 30 Days</SelectItem>
                  <SelectItem value="90">Last Quarter</SelectItem>
                  <SelectItem value="180">Last 6 Months</SelectItem>
                  <SelectItem value="365">Last Year</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleExportCSV} className="w-full sm:w-auto">
                <Download className="w-4 h-4 mr-2" />
                Export to CSV
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-green-500 mt-1">{stat.change} from last month</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Performance Over Time Chart */}
        <Card className="bg-card border-border mb-6">
          <CardHeader>
            <CardTitle>Performance Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF' }}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: '#F3F4F6' }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="conversations" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    name="Conversations"
                    dot={{ fill: '#3B82F6' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="activeUsers" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    name="Active Users"
                    dot={{ fill: '#10B981' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="resolution" 
                    stroke="#F59E0B" 
                    strokeWidth={2}
                    name="Resolution Rate (%)"
                    dot={{ fill: '#F59E0B' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Chatbot Comparison Chart */}
        <Card className="bg-card border-border mb-6">
          <CardHeader>
            <CardTitle>Chatbot Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chatbotComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF' }}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: '#F3F4F6' }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="conversations" 
                    fill="#3B82F6" 
                    name="Conversations"
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar 
                    dataKey="activeUsers" 
                    fill="#10B981" 
                    name="Active Users"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Chatbot Directory */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Your Chatbots</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockChatbots.map((bot) => (
                <Link 
                  key={bot.id}
                  href={`/chatbots/${bot.id}/analytics`}
                  className="block"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer bg-secondary/50 hover:bg-secondary">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12 flex-shrink-0">
                        <AvatarImage src={bot.avatar} alt={bot.name} />
                        <AvatarFallback className="bg-primary text-white">
                          {bot.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
                          <h3 className="font-semibold text-foreground">{bot.name}</h3>
                          <Badge variant="outline" className={`capitalize ${getStatusColor(bot.status)}`}>
                            {bot.status}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
                          <span className="whitespace-nowrap">{bot.conversations.toLocaleString()} conversations</span>
                          <span className="whitespace-nowrap">{bot.activeUsers} active users</span>
                          <span className="whitespace-nowrap">{bot.resolution} resolution</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0 self-end sm:self-center" />
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
