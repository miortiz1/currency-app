import { NextResponse } from 'next/server';
import axios from 'axios';

export const GET = async (request) => {
  const from  = request.nextUrl.searchParams.get('from').toLowerCase();
  const to  = request.nextUrl.searchParams.get('to').toLowerCase();
  const ratePonderator = 0.95
  try {
    const rateData = await axios.get(`https://latest.currency-api.pages.dev/v1/currencies/${from}.json`);
    return NextResponse.json({rate: rateData.data[from][to] * ratePonderator}, { status: 200 });
  } catch (error) {
    console.error('Error fetching rate:', error);
      return new Response("Failed to get currencies from CurrencyBird API", { status: 500 });
  }
}