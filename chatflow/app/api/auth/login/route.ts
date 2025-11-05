import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Hardcoded validation
  if (email && password) {
    return NextResponse.json({
      success: true,
      user: {
        id: '1',
        email: email,
        companyName: 'BotPlatform Inc.',
        isNewUser: false,
      },
      token: 'mock-jwt-token-' + Date.now(),
    });
  }

  return NextResponse.json(
    { success: false, error: 'Invalid credentials' },
    { status: 401 }
  );
}
