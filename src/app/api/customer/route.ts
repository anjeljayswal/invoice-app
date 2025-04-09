import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, email, externalCustomerId, address, phone, userId } = body

        if (!name || !email || !userId) {
            return NextResponse.json({ error: 'Name, Email, and User ID are required.' }, { status: 400 })
        }

        // Optional: Check if user exists
        const userExists = await prisma.user.findUnique({ where: { id: userId } })
        if (!userExists) {
            return NextResponse.json({ error: 'User does not exist.' }, { status: 404 })
        }

        const customer = await prisma.customer.create({
            data: {
                name,
                email,
                externalCustomerId,
                address,
                phone,
                userId
            },
        })

        return NextResponse.json(customer, { status: 201 })
    } catch (error) {
        console.error('Error creating customer:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET(req: Request) {
    try {
        const url = new URL(req.url)
        const userId = url.searchParams.get('userId')

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required.' }, { status: 400 })
        }

        const customers = await prisma.customer.findMany({
            where: { userId },
        })

        return NextResponse.json(customers, { status: 200 })
    } catch (error) {
        console.error('Error fetching customers:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}