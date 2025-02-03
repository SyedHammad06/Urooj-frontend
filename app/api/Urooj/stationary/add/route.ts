import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface AddStationaryRequest {
    title: string;
    stationaryDescription: string;
    stationaryPrice: string;
    stationaryUrl: string;
}

// POST new stationary
export async function POST(request: NextRequest) {
    try {
        const body: AddStationaryRequest = await request.json();
        const authHeader = request.headers.get('authorization');

        if (!authHeader) {
            return NextResponse.json(
                { message: 'Authorization token required' },
                { status: 401 }
            );
        }

        console.log(body);

        const response = await axios.post(
            `http://147.93.102.224:5000/api/Stationary/add`,
            body,
            {
                headers: {
                    Authorization: authHeader,
                    'Content-Type': 'application/json',
                },
            }
        );

        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        console.error('Error adding stationary:', error);
        return NextResponse.json(
            { message: 'Error adding stationary item' },
            { status: 500 }
        );
    }
}
