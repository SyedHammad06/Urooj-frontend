// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface LoginRequest {
    username: string;
    password: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: LoginRequest = await request.json();

        const response = await axios.post(
            'http://147.93.102.224:5000/api/Urooj/Login',
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        return NextResponse.json(response.data, { status: response.status });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Login error:', error);

        // Handle axios error responses
        if (error.response) {
            return NextResponse.json(
                { message: error.response.data.message || 'Login failed' },
                { status: error.response.status }
            );
        }

        // Handle network errors
        return NextResponse.json(
            { message: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}
