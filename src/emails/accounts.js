
const sgMail = require('@sendgrid/mail')
//const sendgridAPIKey = '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'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'thuanton98@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'thuanton98@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back sometime soon.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}