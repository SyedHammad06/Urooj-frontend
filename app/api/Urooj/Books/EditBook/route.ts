// app/api/books/edit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface EditBookRequest {
    bookId: string;
    bookName: string;
    bookDescription: string;
    bookContent: string;
    subject: string;
    class: string;
    hProgram: string;
    bookUrl: string;
    modifiedBy: string;
    id: string; // for authorization
}

export async function POST(request: NextRequest) {
    try {
        const body: EditBookRequest = await request.json();

        const {
            bookId,
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
            'http://147.93.102.224:5000/api/Urooj/Books/EditBook',
            {
                bookId,
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
        console.error('Error editing book:', error);
        return NextResponse.json(
            { message: 'Error editing book' },
            { status: 500 }
        );
    }
}

// Also support PATCH method if needed
export const PATCH = POST;
