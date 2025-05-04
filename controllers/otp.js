import speakeasy from 'speakeasy';
import Users from '../models/users.js';

// Generate OTP secret for a user
export const generateOtpSecret = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const secret = speakeasy.generateSecret({
            length: 20,
            name: `TodoApp:${req.user.email}`
        });
        
        await Users.findByIdAndUpdate(userId, {
            otp_secret: secret.base32,
            otp_enabled: false
        });
        
        res.status(200).json({
            secret: secret.base32,
            otpauth_url: secret.otpauth_url
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Verify OTP and enable for user
export const verifyAndEnableOtp = async (req, res) => {
    try {
        const { token } = req.body;
        const userId = req.user.id;
        
        const user = await Users.findById(userId);
        
        const verified = speakeasy.totp.verify({
            secret: user.otp_secret,
            encoding: 'base32',
            token: token
        });
        
        if (!verified) {
            return res.status(400).json({ message: "Invalid OTP" });
        }
        
        await Users.findByIdAndUpdate(userId, { otp_enabled: true });
        
        res.status(200).json({ message: "OTP enabled successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Verify OTP during login
export const verifyOtp = async (req, res) => {
    try {
        const { email, token } = req.body;
        
        const user = await Users.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        
        const verified = speakeasy.totp.verify({
            secret: user.otp_secret,
            encoding: 'base32',
            token: token
        });
        
        if (!verified) {
            return res.status(400).json({ message: "Invalid OTP" });
        }
        
        // Create refresh token
        const refresh_token = createRefreshToken({ id: user._id });
        
        const expiry = 24 * 60 * 60 * 1000; // 1 day
        
        res.cookie('refreshtoken', refresh_token, {
            httpOnly: true,
            path: '/api/user/refresh_token',
            maxAge: expiry,
            expires: new Date(Date.now() + expiry)
        });
        
        res.json({
            message: "Sign In successfully!",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};