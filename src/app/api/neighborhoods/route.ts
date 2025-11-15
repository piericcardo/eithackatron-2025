import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { Neighborhood } from '../../mockData';

const dataFilePath = path.join(process.cwd(), 'src/app/varnaNeighborhoodsData.json');

export async function GET() {
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data.neighborhoods);
  } catch (error) {
    console.error('Error reading neighborhoods:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const neighborhoods: Neighborhood[] = await request.json();
    await fs.writeFile(
      dataFilePath,
      JSON.stringify({ neighborhoods }, null, 2),
      'utf8'
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving neighborhoods:', error);
    return NextResponse.json(
      { error: 'Failed to save neighborhoods' },
      { status: 500 }
    );
  }
}