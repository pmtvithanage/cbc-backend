import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email : {
            type: String,
            required: true,
            unique: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            default: "user"
        },
        isBlocked: {
            type: Boolean,
            default: false
        },
        isEmailVerified: {
            type: Boolean,
            default: false
        },
        image: {
            type: String,
            default: "https://res.cloudinary.com/dz4qj1x8h/image/upload/v1706261234/avatars/default-avatar.png"
        },

    }
)
const User = mongoose.model("User", userSchema);
export default User;
