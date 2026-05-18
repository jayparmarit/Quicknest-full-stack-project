import RazorPay from "razorPay";

const razorPay = new RazorPay({
    key_id: process.env.RAZORPAY_TEST_API_KEY,
    key_secret: process.env.RAZORPAY_TEST_API_SECRET
})


export default razorPay;