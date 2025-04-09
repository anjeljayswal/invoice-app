import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');
  console.log('Received userId:', userId);

  if (!userId) {
    return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId! },
      include: {
        customers: {
          include: {
            invoices: true,
          },
        },
      },
    });

    if (user) {
      console.log('User found:', user);
      return NextResponse.json(user, { status: 200 });
    } else {
      console.log('User not found for userId:', userId);
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    return NextResponse.json({ error: 'Error fetching user details' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}