// app/api/stationary/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const BASE_URL = 'http://147.93.102.224:5000/api/Stationary';

interface StationaryType {
    stationaryId: number;
    title: string;
    stationaryDescription: string;
    stationaryPrice: string;
    stationaryUrl: string;
    modified: string;
    modifiedBy: string;
}

interface AddStationaryRequest {
    title: string;
    stationaryDescription: string;
    stationaryPrice: string;
    stationaryUrl: string;
}

// GET all stationary
export async function GET() {
    try {
        const response = await axios.get(`${BASE_URL}/GetAll`);
        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error('Error fetching stationary:', error);
        return NextResponse.json(
            { message: 'Error fetching stationary items' },
            { status: 500 }
        );
    }
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

        console.log(authHeader);

        const response = await axios.post(`${BASE_URL}/add`, body, {
            headers: {
                Authorization: authHeader,
                'Content-Type': 'application/json',
            },
        });

        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        console.error('Error adding stationary:', error);
        return NextResponse.json(
            { message: 'Error adding stationary item' },
            { status: 500 }
        );
    }
}

// PUT update stationary
export async function PUT(request: NextRequest) {
    try {
        const body: StationaryType = await request.json();
        const authHeader = request.headers.get('authorization');

        if (!authHeader) {
            return NextResponse.json(
                { message: 'Authorization token required' },
                { status: 401 }
            );
        }

        const response = await axios.post(`${BASE_URL}/Update`, body, {
            headers: {
                Authorization: authHeader,
                'Content-Type': 'application/json',
            },
        });

        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        console.error('Error updating stationary:', error);
        return NextResponse.json(
            { message: 'Error updating stationary item' },
            { status: 500 }
        );
    }
}

// DELETE stationary
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const stationaryId = searchParams.get('stationaryId');
        const authHeader = request.headers.get('authorization');
        const ModifiedBy = searchParams.get('ModifiedBy');

        if (!stationaryId) {
            return NextResponse.json(
                { message: 'Stationary ID is required' },
                { status: 400 }
            );
        }

        if (!authHeader) {
            return NextResponse.json(
                { message: 'Authorization token required' },
                { status: 401 }
            );
        }

        const response = await axios.post(
            `${BASE_URL}/Remove/${stationaryId}?ModifiedBy=${ModifiedBy}`,
            {},
            {
                headers: {
                    Authorization: authHeader,
                    'Content-Type': 'application/json',
                },
            }
        );

        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        console.error('Error deleting stationary:', error);
        return NextResponse.json(
            { message: 'Error deleting stationary item' },
            { status: 500 }
        );
    }
}
