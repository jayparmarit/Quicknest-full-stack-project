import transporter from "../config/email.js";

const sendEmail = async ({ to, subject, html}) => {

            try {
                
                const info = await transporter.sendMail({
                    from:`"QuickNest" <jayparmarj1@gmail.com>`,
                    to,
                    subject,
                    html
                })

                console.log("email sent id", info.messageId);

            } catch (error) {
                 console.error("EMAIL ERROR:", error);
            }
}

export default sendEmail