import { google } from "googleapis";
import { NextRequest } from "next/server";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_API_CLIENT_ID,
  process.env.GOOGLE_API_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL,
);

export async function GET(req: NextRequest) {
  const authorizationCode = req.nextUrl.searchParams.get("code");
  if (!authorizationCode) {
    return Response.json("Authorization code not found", {
      status: 400,
    });
  }
  try {
    // Exchange the authorization code for access and refresh token
    const { tokens } = await oauth2Client.getToken(authorizationCode);

    // Set the obtained tokens as credentials
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });

    const userInfo = await oauth2.userinfo.get();

    const userObj = {
      name: userInfo.data.name,
      first_name: userInfo.data.given_name,
      last_name: userInfo.data.family_name,
      email: userInfo.data.email,
      image: userInfo.data.picture,
    };

    return Response.json(userObj);
  } catch (error) {
    return Response.json("somethink went wrong", {
      status: 400,
    });
  }
}
