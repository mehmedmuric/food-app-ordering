import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";
import {User} from "../../models/user";

export async function PUT(req){
    mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    const session = await getServerSession(authOptions);
    const email = session.user.data.email;
    const user = await User.findOne({email});

     await User.updateOne({email}, data);


    return Response.json(true);
}

export async function GET(){
    mongoose.connect(process.env.MONGO_URL);
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    return Response.json(
        await User.findOne({email})
    );
}