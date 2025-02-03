// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const BASE_URL = 'http://147.93.102.224:5000/api/Urooj';

interface AddUserRequest {
    fName: string;
    mName: string;
    lName: string;
    userAddress: string;
    phote: string;
    adhaar: string;
    city: string;
    state: string;
    country: string;
    personalEmail: string;
}

// GET all users
export async function GET() {
    try {
        const response = await axios.get(`${BASE_URL}/GetUsers`);
        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { message: 'Error fetching users' },
            { status: 500 }
        );
    }
}

// PUT add new admin
export async function PUT(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const isAdmin = searchParams.get('isAdmin');
        const body: AddUserRequest = await request.json();

        const response = await axios.put(
            `${BASE_URL}/addAdmin?isAdmin=${isAdmin}`,
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        console.error('Error adding user:', error);
        return NextResponse.json(
            { message: 'Error adding user' },
            { status: 500 }
        );
    }
}

// DELETE user
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userName = searchParams.get('userName');

        if (!userName) {
            return NextResponse.json(
                { message: 'Username is required' },
                { status: 400 }
            );
        }

        const response = await axios.post(`${BASE_URL}/RemoveUser/${userName}`);

        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json(
            { message: 'Error deleting user' },
            { status: 500 }
        );
    }
}
