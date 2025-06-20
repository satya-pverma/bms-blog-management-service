import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { data } = body;


  try {
    var url = "https://us-east-1.aws.data.mongodb-api.com/app/application-0-zigdt/endpoint/blog/create"
    
    const externalResponse = await axios.post(url,{data: data, srvc: "8e991290ee8e490bb6adb9811f9b8f93"} );

   // console.log("External API response:", externalResponse.data);

    return NextResponse.json({
      success: true,
      message: 'Blog Published successfully',
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

    const { searchParams } = new URL(req.url);
    const index = searchParams.get('index');
    const items = searchParams.get('items');
    const category  =  searchParams.get('category');

    // Replace with your actual external API endpoint
    const externalApi = 'https://us-east-1.aws.data.mongodb-api.com/app/application-0-zigdt/endpoint/blog/lists';

    const response = await axios.post(externalApi, {data:{index, items, filters:{category}}});

    // Assuming the external API returns a JSON array of posts
    return NextResponse.json(response.data);
  } catch (error: any) {
    // console.error('Error fetching posts:', error.message);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
