import bcrypt from 'bcrypt';
import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {
        type: String, 
        required: true, 
        validate: pass => {
            if(!pass?.length || pass.length < 5){
                new Error('password must be at least 5 characters!');
            }
        }, 
    },
    image: {type: String},
    phone: {type: String},
    streetAddress: {type: String},
    postalCode: {type: String},
    city: {type: String},
    country: {type: String},
    admin: {type: Boolean, default: false},
}, {timestamps: true});

UserSchema.post('validate', function (user) {
    const notHashedPass = user.password;
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(notHashedPass, salt);
});

export const User = models?.User || model('User', UserSchema);