// app/api/books/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface AddBookRequest {
    bookName: string;
    bookDescription: string;
    bookContent: string;
    subject: string;
    class: string;
    hProgram: string;
    bookUrl: string;
    modifiedBy: string;
    id: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: AddBookRequest = await request.json();

        const {
            bookName,
            bookDescription,
            bookContent,
            subject,
            class: bookClass,
            hProgram,
            bookUrl,
            modifiedBy,
            id,
        } = body;

        const response = await axios.post(
            'http://147.93.102.224:5000/api/Urooj/Books/AddBook',
            {
                bookName,
                bookDescription,
                bookContent,
                subject,
                class: bookClass,
                hProgram,
                bookUrl,
                modifiedBy,
            },
            {
                headers: {
                    Authorization: `Bearer ${id}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        console.error('Error adding book:', error);
        return NextResponse.json(
            { message: 'Error adding book' },
            { status: 500 }
        );
    }
}
