// app/api/books/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
    try {
        const response = await axios.get(
            'http://147.93.102.224:5000/api/Urooj/Books/GetAll'
        );

        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error('Error fetching books:', error);
        return NextResponse.json(
            { message: 'Error fetching books' },
            { status: 500 }
        );
    }
}
