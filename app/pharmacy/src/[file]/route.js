import { readFileSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function GET(_req, { params }) {
  const { file } = await params;
  if (!/^[A-Za-z0-9_-]+\.jsx$/.test(file)) {
    return new NextResponse('Not found', { status: 404 });
  }
  try {
    const code = readFileSync(join(process.cwd(), 'pharmacy-pos', 'src', file), 'utf-8');
    return new NextResponse(code, {
      headers: { 'Content-Type': 'application/javascript; charset=utf-8' },
    });
  } catch {
    return new NextResponse('Not found', { status: 404 });
  }
}
