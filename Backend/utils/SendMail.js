import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,

    auth: {
        user:"veereashkv@gmail.com",
        pass:"jqcu itwx lnpj uwvw"
    }
});

const SendMail = async(to,subject,text)=>{
    try{
            console.log("EMAIL USER:", process.env.EMAIL_USER);
            console.log("PASS:", process.env.EMAIL_PASS);
            console.log("SENDING TO:", process.env.EMAIL_USER);
            const info=  await transport.sendMail({
                from:"veereashkv@gmail.com",
                to:"process.env.EMAIL_USER",
                subject,
                text
            })
        console.log("Email sent");
        console.log(info);
    }
    catch(error)
    {
        console.log(error.message)
    }
 
}

export default SendMail