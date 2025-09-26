import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ message: 'Logged out' });
    response.cookies.set('token', '', {
        path: '/',
        maxAge: 0,
        httpOnly: true,
    });
    return response;
}

export async function GET() {
    return new NextResponse('Method GET not allowed', {
        status: 405,
        headers: { Allow: 'POST' },
    });
}
