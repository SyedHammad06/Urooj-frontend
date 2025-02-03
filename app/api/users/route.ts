// app/api/user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const BASE_URL = 'http://147.93.102.224:5000/api/Urooj';

interface UserDetails {
    fName: string;
    mName: string;
    lName: string;
    personalEmail: string;
    adhaar: string;
    userAddress: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    [key: string]: string;
}

interface ChangePasswordRequest {
    userName: string;
    newPassword: string;
    oldPassword: string;
}

// GET user details by username
export async function POST(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const username = searchParams.get('userName');

        console.log(username);

        if (!username) {
            return NextResponse.json(
                { message: 'Username is required' },
                { status: 400 }
            );
        }

        const response = await axios.get(`${BASE_URL}/UserDetails/${username}`);

        const renamedColumns: UserDetails = {
            fName: 'Full_Name',
            mName: 'Middle_Name',
            lName: 'Last_Name',
            personalEmail: 'Email',
            adhaar: 'Adhaar',
            userAddress: 'Address',
            city: 'City',
            state: 'State',
            zip: 'Zip',
            country: 'Country',
        };

        const finalData = Object.keys(response.data).reduce(
            (acc: { [key: string]: unknown }, key) => {
                const newKey = renamedColumns[key] || key;
                acc[newKey] = response.data[key];
                return acc;
            },
            {}
        );

        return NextResponse.json(finalData, { status: 200 });
    } catch (error) {
        console.error('Error fetching user details:', error);
        return NextResponse.json(
            { message: 'Error fetching user details' },
            { status: 500 }
        );
    }
}

// app/api/user/password/route.ts
export async function PUT(request: NextRequest) {
    try {
        const body: ChangePasswordRequest = await request.json();

        const response = await axios.post(`${BASE_URL}/ChangePassword`, body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        console.error('Error changing password:', error);
        return NextResponse.json(
            { message: 'Error changing password' },
            { status: 500 }
        );
    }
}
