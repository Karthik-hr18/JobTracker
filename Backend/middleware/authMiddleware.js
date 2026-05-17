import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
    // Step 1: Get the Authorization header from the request
    // When frontend sends: headers: { Authorization: "Bearer eyJhbGci..." }
    // Express stores it in req.headers.authorization (always lowercase)
    const authHeader = req.headers.authorization;

    // Step 2: Check if the header exists and starts with "Bearer"
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ message: "No token provided, access denied" });
    }

    try {
        // Step 3: Extract the token by splitting "Bearer eyJhbGci..." on the space
        // .split(" ") → ["Bearer", "eyJhbGci..."]  →  [1] gives us just the token
        const token = authHeader.split(" ")[1];

        // Step 4: Verify the token using the same secret used to sign it
        // If valid, decoded = { id: "...", username: "...", iat: ..., exp: ... }
        // If expired/tampered, jwt.verify throws an error → caught below
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Step 5: Attach user info to the request object
        // Now every controller after this can use req.user.id
        req.user = { id: decoded.id, username: decoded.username };
        // Step 6: Call next() to pass control to the next middleware/controller
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token is invalid or expired" });
    }
}