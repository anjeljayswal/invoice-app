import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            invoiceNumber,
            externalInvoiceId,
            amount,
            dueDate,
            customerId,
            status
        } = body;

        const invoice = await prisma.invoice.create({
            data: {
                invoiceNumber,
                externalInvoiceId,
                amount: parseFloat(amount),
                dueDate: new Date(dueDate),
                customerId,
                status,
            },
        });

        return NextResponse.json(invoice, { status: 201 });
    } catch (error) {
        console.error('Error creating invoice:', error);
        return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const customerId = url.searchParams.get('customerId');

    if (!customerId) {
        return NextResponse.json({ error: 'Missing customerId' }, { status: 400 });
    }

    try {
        const invoices = await prisma.invoice.findMany({
            where: { customerId },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(invoices, { status: 200 });
    } catch (error) {
        console.error('Error fetching invoices:', error);
        return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
    }
}
