// app/api/books/remove/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const bookId = searchParams.get('bookId');
        const modifiedBy = searchParams.get('ModifiedBy');
        const id = searchParams.get('id');

        if (!bookId || !modifiedBy || !id) {
            return NextResponse.json(
                { message: 'Missing required parameters' },
                { status: 400 }
            );
        }

        const response = await axios.post(
            `http://147.93.102.224:5000/api/Urooj/Books/Remove?bookId=${bookId}&ModifiedBy=${modifiedBy}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${id}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        console.error('Error removing book:', error);
        return NextResponse.json(
            { message: 'Error removing book' },
            { status: 500 }
        );
    }
}
