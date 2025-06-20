import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {  mail, password } = body;

  if (!mail || !password) {
    return NextResponse.json(
      { success: false, message: 'Mail and Password are mandatory' },
      { status: 400 }
    );
  }

  try {
    var url = "https://us-east-1.aws.data.mongodb-api.com/app/application-0-zigdt/endpoint/user/login"
    var payload = {
        data:{
            mail,
            password,
        },
        srvc:"8e991290ee8e490bb6adb9811f9b8f93"
    }
    const externalResponse = await axios.post(url,payload );

    //console.log("External API response:", externalResponse.data);

    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      data: externalResponse.data.data, // Optional: return external response
    });
  } catch (error: any) {
    //console.error("Error calling external API:", error.response);
    return NextResponse.json(
      { success: false, message: error.response?.data?.memo },
      { status: 500 }
    );
  }
}
