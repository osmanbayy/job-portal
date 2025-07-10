import jwt from "jsonwebtoken";
import Company from "../models/Company.js";

export const protect_company = async (request, response, next) => {
  const token = request.headers.token;
  if (!token) {
    return response.json({ success: false, message: "Not Authorized, Login Again." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.company = await Company.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    console.log("error in protect_company function");
    response.json({ success: false, message: error.message });
  }
}