
import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';


type Context = {
  params: {
    id: string;
  };
};

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { data } = body;


  try {
    var url = "https://us-east-1.aws.data.mongodb-api.com/app/application-0-zigdt/endpoint/blog/edit"
    
    const externalResponse = await axios.post(url,{data: data, srvc: "8e991290ee8e490bb6adb9811f9b8f93"} );

   // console.log("External API response:", externalResponse.data);

    return NextResponse.json({
      success: true,
      message: 'Blog Edited successfully',
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


export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { data } = body;


  try {
    var url = "https://us-east-1.aws.data.mongodb-api.com/app/application-0-zigdt/endpoint/blog/edit"
    
    const externalResponse = await axios.post(url,{data: data, srvc: "8e991290ee8e490bb6adb9811f9b8f93"} );

   // console.log("External API response:", externalResponse.data);

    return NextResponse.json({
      success: true,
      message: 'Blog Deleted successfully',
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




export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Missing post ID in route params' },
        { status: 400 }
      );
    }

    const apiUrl = 'https://us-east-1.aws.data.mongodb-api.com/app/application-0-zigdt/endpoint/blog/details/id';

    const response = await axios.post(apiUrl, {
      data: { item: id },
      srvc: '8e991290ee8e490bb6adb9811f9b8f93',
    });

    return NextResponse.json({
      success: true,
      stat: true,
      data: response.data,
    });
  } catch (error: any) {
    // console.error('Error fetching post details:', error.message);
    return NextResponse.json(
      {
        success: false,
        message: error.response?.data?.memo || 'Failed to fetch post details',
      },
      { status: 500 }
    );
  }
}
