import axios from 'axios';
import { type NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id');

    try {
        const response = await axios.get(
            'http://147.93.102.224/api/Urooj/Verify',
            {
                headers: {
                    Authorization: `Bearer ${id}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return new Response(JSON.stringify(response.data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return new Response('Error fetching data', { status: 500 });
    }
}
