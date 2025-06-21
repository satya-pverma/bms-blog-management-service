import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { text, sender, item } = body;

  if (!text || !sender ) {
    return NextResponse.json(
      { success: false, message: 'All fields are required' },
      { status: 400 }
    );
  }

  try {
    var url = "https://us-east-1.aws.data.mongodb-api.com/app/application-0-zigdt/endpoint/comment/add"
    var payload = {
        data:{
            item,
            text,
            sender,
        },
        srvc:"8e991290ee8e490bb6adb9811f9b8f93"
    }
    const externalResponse = await axios.post(url,payload );

   // console.log("External API response:", externalResponse.data);

    return NextResponse.json({
      success: true,
      message: 'comment added registered successfully',
      data: externalResponse.data, // Optional: return external response
    });
  } catch (error: any) {
    //console.error("Error calling external API:", error.response);
    return NextResponse.json(
      { success: false, message: error.response?.data?.memo },
      { status: 500 }
    );
  }
}
