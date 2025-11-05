'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Download, TrendingUp, TrendingDown, ArrowLeft } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

// Mock chatbot data
const mockChatbots: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Customer Support',
    avatar: '/avatars/avatar-1.svg',
    status: 'active',
  },
  '2': {
    id: '2',
    name: 'Sales Lead Gen',
    avatar: '/avatars/avatar-2.svg',
    status: 'inactive',
  },
  '3': {
    id: '3',
    name: 'Onboarding Assistant',
    avatar: '/avatars/avatar-3.svg',
    status: 'draft',
  },
};

// Generate mock time series data
const generateTimeSeriesData = (days: number) => {
  const data = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      conversations: Math.floor(Math.random() * 200) + 300,
      activeUsers: Math.floor(Math.random() * 50) + 50,
      resolution: Math.floor(Math.random() * 20) + 75,
    });
  }
  
  return data;
};

export default function ChatbotAnalyticsPage() {
  const params = useParams();
  const chatbotId = params.id as string;
  const [dateRange, setDateRange] = useState('30');
  
  // Get chatbot data
  const chatbot = mockChatbots[chatbotId] || mockChatbots['1'];
  
  // Generate chart data based on date range
  const chartData = useMemo(() => {
    return generateTimeSeriesData(parseInt(dateRange));
  }, [dateRange]);
  
  // Calculate metrics from chart data
  const metrics = useMemo(() => {
    const totalConversations = chartData.reduce((sum, d) => sum + d.conversations, 0);
    const avgActiveUsers = Math.round(chartData.reduce((sum, d) => sum + d.activeUsers, 0) / chartData.length);
    const avgResolution = Math.round(chartData.reduce((sum, d) => sum + d.resolution, 0) / chartData.length);
    
    return [
      {
        title: 'Total Conversations',
        value: totalConversations.toLocaleString(),
        change: '+3.2%',
        trend: 'up',
      },
      {
        title: 'Avg. Active Users',
        value: avgActiveUsers.toString(),
        change: '+5.1%',
        trend: 'up',
      },
      {
        title: 'User Satisfaction (CSAT)',
        value: '92%',
        change: '+2.1%',
        trend: 'up',
      },
      {
        title: 'Avg. Resolution Rate',
        value: `${avgResolution}%`,
        change: '+3.0%',
        trend: 'up',
      },
    ];
  }, [chartData]);
  
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
    link.setAttribute('download', `${chatbot.name.replace(/\s+/g, '_')}_analytics_${dateRange}days.csv`);
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

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={chatbot.avatar} alt={chatbot.name} />
                <AvatarFallback className="bg-primary text-white text-xl">
                  {chatbot.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{chatbot.name}</h1>
                  <Badge variant="outline" className={`capitalize ${getStatusColor(chatbot.status)}`}>
                    {chatbot.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Detailed analytics and performance metrics for this chatbot.
                </p>
              </div>
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

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {metric.value}
                </div>
                <div className="flex items-center gap-1 text-sm">
                  {metric.trend === 'up' ? (
                    <>
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-green-500">{metric.change}</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="w-4 h-4 text-red-500" />
                      <span className="text-red-500">{metric.change}</span>
                    </>
                  )}
                  <span className="text-muted-foreground ml-1">vs last period</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Chart */}
        <Card className="bg-card border-border">
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

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Top User Queries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { query: 'How do I reset my password?', count: 234 },
                  { query: 'What are your business hours?', count: 189 },
                  { query: 'How can I contact support?', count: 156 },
                  { query: 'Where is my order?', count: 142 },
                  { query: 'How do I cancel my subscription?', count: 128 },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{item.query}</span>
                    <span className="text-sm font-semibold text-muted-foreground">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Response Time Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { range: '< 1 second', percentage: 45 },
                  { range: '1-3 seconds', percentage: 35 },
                  { range: '3-5 seconds', percentage: 15 },
                  { range: '> 5 seconds', percentage: 5 },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{item.range}</span>
                      <span className="font-semibold text-muted-foreground">
                        {item.percentage}%
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
