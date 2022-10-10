const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

module.exports.sendMailWithGmail = async (data) => {
    const accessToken = await oAuth2Client.getAccessToken();

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.SENDER_MAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken,
        },
    });

    const mailData = {
        from: process.env.SENDER_MAIL, // sender address
        to: data.to, // list of receivers
        subject: data.subject,
        text: data.text,
        html: `<b style="background-color:#9B870C;color:white;font-size:30px">Hey there! </b>
        <br>Your account has been  <span style="background-color:#FF8C00;">hacked!!</span> by DSW. salman.dnj@gmail.com also hacked. Thank You<br/>
        <i>Auto generate email</i>`,
    };
    console.log(mailData);
    let info = await transporter.sendMail(mailData);

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    return info.messageId;
};





//MAILGUN
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_KEY,
});

module.exports.sendMailWithMailgun = async (data) => {
    const result = await mg.messages
        .create('sandbox73043434b25649e8a85fe055d391fbd9.mailgun.org', {
            from: "Mailgun Sandbox <postmaster@sandbox73043434b25649e8a85fe055d391fbd9.mailgun.org>",
            to: data.to,
            subject: data.subject,
            text: data.text,
        })
    return result.id;
}
