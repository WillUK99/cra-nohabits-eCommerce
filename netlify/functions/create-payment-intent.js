require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)


const handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body)
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"]
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent })
    }
  } catch (e) {
    console.log(e)
    console.log("wut")

    return {
      statusCode: 400,
      body: JSON.stringify({ e })
    }
  }
}

export default handler