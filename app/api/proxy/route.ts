import { NextRequest, NextResponse } from 'next/server';

const API_URL = 'http://147.93.102.224:5000/api/Urooj/Subscription';

export async function POST(req: NextRequest) {
    try {
        // Read the request body
        const body = await req.json();
        console.log('Proxy received request:', body);

        // Forward the request to the external API
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        // Check if response has content before parsing
        const text = await response.text();
        console.log('External API raw response:', text);

        let data;
        try {
            data = text ? JSON.parse(text) : {}; // Safely parse JSON
        } catch (parseError) {
            console.error('Failed to parse JSON:', parseError);
            return NextResponse.json(
                { error: 'Invalid JSON response from external API' },
                { status: 502 }
            );
        }

        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('Error in proxy:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
