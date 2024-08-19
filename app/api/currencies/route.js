import { NextResponse } from 'next/server';
import axios from 'axios';

export const GET = async (request) => {
  const direction  = request.nextUrl.searchParams.get('direction');
  try {
    let response;
    if (direction === 'send') {
      response = await axios.get('https://elb.currencybird.cl/apigateway-cb/api/public/sendCountries');
    } else if (direction === 'receive') {
      response = await axios.get('https://elb.currencybird.cl/apigateway-cb/api/public/incomingCountries');
    } else {
      return new Response("Invalid direction", { status: 400 });
    }
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
      return new Response("Failed to get currencies from CurrencyBird API", { status: 500 });
  }
}