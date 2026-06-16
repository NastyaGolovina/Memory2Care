const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendContactEmail = async ({
                                    name,
                                    email,
                                    subject,
                                    message,
                                }) => {

    await resend.emails.send({
        from: 'Memory2Care <onboarding@resend.dev>',
        to: 'n21koketka@gmail.com',
        replyTo: email,
        subject: `[Memory2Care] ${subject}`,
        html: `
            <h2>New message from Memory2Care website</h2>

            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Subject:</b> ${subject}</p>

            <hr/>

            <p>${message.replace(/\n/g, '<br>')}</p>
        `,
    });
    console.log(process.env.RESEND_API_KEY);
};

module.exports = { sendContactEmail };