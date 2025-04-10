// invoice/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(
    req: NextRequest,
    context: any
  ) {
    try {
      const { status, dueDate, amount } = await req.json();
      const params = await context.params; // Await context.params
      const { id } = params; // Access `id` after awaiting `params`
  
      if (!status || !dueDate || !amount) {
        return NextResponse.json(
          { error: 'Missing required fields: status, dueDate, or amount' },
          { status: 400 }
        );
      }
  
      const updatedInvoice = await prisma.invoice.update({
        where: { id },
        data: {
          amount: parseFloat(amount),
          status,
          dueDate: new Date(dueDate),
        },
      });
  
      return NextResponse.json(updatedInvoice, { status: 200 });
    } catch (error) {
      console.error('Error updating invoice:', error);
      return NextResponse.json({ error: 'Failed to update invoice' }, { status: 500 });
    }
  }



export async function DELETE(
    req: NextRequest,
    context: any
  ) {
    try {
      const params = await context.params; // Await context.params
      const { id } = params; // Access `id` after awaiting `params`
  
      const deletedInvoice = await prisma.invoice.delete({
        where: { id },
      });
  
      return NextResponse.json(deletedInvoice, { status: 200 });
    } catch (error) {
      console.error('Error deleting invoice:', error);
      return NextResponse.json({ error: 'Failed to delete invoice' }, { status: 500 });
    }
  }