const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const CLIENT_ID='955500837827-ne046hmqjtsr6hpms2jd8e8t456mkcnm.apps.googleusercontent.com'
const CLIENT_SECRET='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'
const REDIRECT_URI='https://developers.google.com/oauthplayground'
const REFRESH_TOKEN='1//04LqCMokLFDiOCgYIARAAGAQSNwF-L9IrKypodP_E-ES8_LHOvMDaTuZC91dCyX3eNwdVafAWbVN8KPSr9dZfqZPSy1Zyrmbm9QQ'


const oAuth2client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)
oAuth2client.setCredentials({refresh_token:REFRESH_TOKEN})

async function sendmail(){
    try {
        const accessToken=await oAuth2client.getAccessToken()
        const transport= nodemailer.createTransport({
            service:'gmail',
            auth:{
                type:'OAuth2',
                user:'anjay2013@gmail.com',
                clientId:CLIENT_ID,
                clientSecret:CLIENT_SECRET,
                refreshToken:REFRESH_TOKEN,
                accessToken:accessToken
            }
        })
        const mailOptions={
            from:'ANJAY2013 <anjay2013@gmail.com>',
            to:'anjaypratap2020@gmail.com',
            subject:"hello from gmail using API",
            text:"HELLO FROM GMAIL EMAIL USING API",
            html:'<h1>HELLO-FROM-GMAIL-EMAIL-USING-API</h1>'
        }
        const result =await transport.sendMail(mailOptions)
        return result
    } catch (error) {
        return error
    }
}
// sendmail()
// .then((result)=> console.log('email send...',result))
// .catch((error)=> console.log(error.message))