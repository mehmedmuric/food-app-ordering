import mongoose from "mongoose";
import { User } from "../../models/user";

export async function POST(req) {
    const body = await req.json();
    mongoose.connect(process.env.MONGO_URL);
    const createUser = await User.create(body);
    
    return Response.json(createUser);
}