const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const CLIENT_ID='955500837827-ne046hmqjtsr6hpms2jd8e8t456mkcnm.apps.googleusercontent.com'
const CLIENT_SECRET='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'
const REDIRECT_URI='https://developers.google.com/oauthplayground'
const REFRESH_TOKEN='1//04LqCMokLFDiOCgYIARAAGAQSNwF-L9IrKypodP_E-ES8_LHOvMDaTuZC91dCyX3eNwdVafAWbVN8KPSr9dZfqZPSy1Zyrmbm9QQ'


const oAuth2client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)
oAuth2client.setCredentials({refresh_token:REFRESH_TOKEN})

export  async function forgetemail(to_email,token){
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
            to:to_email,
            subject:"Reset your password using this link",
            text:"text mess",
            html:`<h1> TO reset your pwd  <br> this token is valid for 10 minutes  " <u>${token}</u> " <br> To redirect <a href="http://localhost:5454/api/v1/users/resetpassword/${token}"> click here</a></h1>`
        
        }

        const result =await transport.sendMail(mailOptions)
        //return result
        return token
        
    } catch (error) {
        return error
    }
}


// sendmail()
// .then((result)=> console.log('email send...',result))
// .catch((error)=> console.log(error.message))