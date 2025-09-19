import Cookies from "js-cookie";
// import jwtDecode from "jwt-decode";
// import jwtDecode from "jsonwebtoken";
import { jwtVerify } from "jose";

export async function verifyToken() {
    const token = Cookies.get("user"); // Get the JWT from the cookie
    const encoder = new TextEncoder();

    const { payload } = await jwtVerify(token, encoder.encode("publicKey"));
    console.log({ payload });
    if (!token) {
        console.log("No token found");
        return false;
    }

    // try {
    const decoded = await jwtVerify(token); // Decode the JWT
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds

    if (decoded.exp && decoded.exp < currentTime) {
        console.log("Token expired");
        return false; // Token is expired
    }

    //     console.log("Token is valid");
    //     return decoded; // Return the decoded token payload
    // } catch (error) {
    //     console.error("Invalid token:", error);
    //     return false;
    // }
}
