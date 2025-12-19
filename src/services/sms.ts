import axios from "axios";

// Adapted for Vite: process.env -> import.meta.env
// Also requires variable to be prefixed with VITE_ to be exposed to client
const FAST2SMS_API_KEY = import.meta.env.VITE_FAST2SMS_API_KEY || "YOUR_FAST2SMS_API_KEY_HERE";

// Toggle simulation mode automatically
const IS_SIMULATION = FAST2SMS_API_KEY === "YOUR_FAST2SMS_API_KEY_HERE";

interface SendOtpParams {
    phone: string;
    otp: string;
}

export async function sendOtp({ phone, otp }: SendOtpParams) {
    // Simulation mode (safe for dev & staging)
    if (IS_SIMULATION) {
        console.log(`[SIMULATION] OTP ${otp} sent to ${phone}`);
        return {
            success: true,
            simulated: true,
        };
    }

    try {
        const response = await axios.post(
            "https://www.fast2sms.com/dev/bulkV2",
            {
                route: "otp",
                variables_values: otp, // API documentation indicates variables_values for OTP route
                numbers: phone,
            },
            {
                headers: {
                    authorization: FAST2SMS_API_KEY,
                    "Content-Type": "application/json",
                },
            }
        );

        return {
            success: response.data.return === true,
            data: response.data,
        };
    } catch (error: any) {
        console.error("Fast2SMS error:", error?.response?.data || error.message);
        return {
            success: false,
            error: "Failed to send OTP",
        };
    }
}
