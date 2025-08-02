import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function createUser(req, res) {

    // Check if the user is authorized to create a user
    if (req.user == null){
        res.json(
            {
                message: "You are not authorized to create a user. Please login first."
            }
        )
        return;
    }

    // Check if the user is an admin
    if(req.user.role !== "admin") {
        res.status(403).json(
            {
                message: "You are not authorized to create a user"
            }
        )
        return;
    }

    const hashPassword = bcrypt.hashSync(req.body.password, 10);

    const user = new User(
        {
            email : req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashPassword
        }
    );
    user.save()
        .then(() => {
            console.log('User created successfully');
            res.json({
                message: 'User created successfully',
                user: user
            });
        })
        .catch((error) => {
            console.error('Error creating user:', error);
            res.status(500).json({
                message: 'Error creating user',
                error: error.message
            });
        });
}

export function loginUser(req, res) {
    User.findOne(
        {
            email: req.body.email
        }
    ).then(
        (user) => {
            if (user == null) {
                res.status(401).json(
                    {
                        message: 'User not found'
                    }
                );
            }
            else{
                const isPasswordMatching = bcrypt.compareSync(req.body.password, user.password);
                if (isPasswordMatching) {

                    const token = jwt.sign(
                        {
                            userId: user._id,
                            email: user.email,
                            role: user.role,
                            isEmailVerified: user.isEmailVerified,
                        },
                        "jwt_secret",
                    ); 

                    console.log('User logged in successfully');
                    res.json({
                        message: 'User logged in successfully',

                        token: token,

                        user: {
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            role: user.role,
                            image: user.image
                        }
                    });
                }
                else {
                    console.log('Invalid password');
                    res.status(401).json({
                        message: 'Invalid password'
                    });
                }
            }
        }
    ).catch(
        (error) => {
            console.error('Error logging in:', error);
            res.status(500).json({
                message: 'Error logging in',
                error: error.message
            });
        }
    )   
}

export function isAdmin(req) {
    // Check if the user is authorized to access this route
    if (req.user == null) {
        return false;
    }

    // Check if the user is an admin
    if (req.user.role !== 'admin') {
        return false;
    }

    // If the user is authenticated and is an admin, return true
    return true;
}