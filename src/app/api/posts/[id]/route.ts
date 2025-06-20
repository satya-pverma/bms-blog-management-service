
import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';

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


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {

    // const { searchParams } = new URL(req.url);
    // const item = searchParams.get('id');
   

    // Replace with your actual external API endpoint
    const externalApi = 'https://us-east-1.aws.data.mongodb-api.com/app/application-0-zigdt/endpoint/blog/details/id';

    const response = await axios.post(externalApi, {data:{ item: params.id}});

    // Assuming the external API returns a JSON array of posts
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error fetching posts:', error.message);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
