import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return NextResponse.json({
    success: true,
    message: `Chatbot ${id} deleted successfully`,
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return NextResponse.json({
    success: true,
    chatbot: {
      id,
      ...body,
      updatedAt: 'Just now',
    },
  });
}
