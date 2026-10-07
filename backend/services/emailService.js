const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendResetPasswordEmail = async (email, resetLink) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "NewsAI - Password Reset",
        html: `
            <div style="font-family: Arial, sans-serif;">
                <h2>Reset Your NewsAI Password</h2>

                <p>
                    We received a request to reset your password.
                </p>

                <p>
                    Click the button below to reset your password:
                </p>

                <a
                    href="${resetLink}"
                    style="
                        display:inline-block;
                        padding:12px 20px;
                        background:#2563eb;
                        color:white;
                        text-decoration:none;
                        border-radius:6px;
                    "
                >
                    Reset Password
                </a>

                <p style="margin-top:20px;">
                    This link will expire in 15 minutes.
                </p>
            </div>
        `,
    });
};

module.exports = {
    sendResetPasswordEmail,
};