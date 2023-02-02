const express=require('express');
const bodyParser=require('body-parser')
const nodemailer=require('nodemailer') //ye send to krdega lekin koi transporter bhi to chaye jisse email send ki jaske
                                        //that's why we are using sendGrid
const sendgridTransport=require('nodemailer-sendgrid-transport')

//Here I have to specify the email i have verified in sendGrid, for that we haev to use Auth
const transporter=nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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"
    },
}))

const app=express();

app.set("view engine","ejs");
app.set("views","views")

//Rendering login page
app.get('/',(req,res)=>{
    res.render('login',{
        pageTitle:"Login",
    })
})

app.use(bodyParser.urlencoded({extended:false}))


app.post('/login',(req,res)=>{
    console.log(req.body.email)

    let str=req.body.email;
    // console.log(typeof(str))
    var user=str.split('@','.')[0]
    console.log(user)
    // res.redirect('/')
    
    //here we have to specify (to [kisko bhej rhe ho] and from)
     transporter.sendMail({
        to:req.body.email,
        from:"saadurrehman345@gmail.com",
        subject:"Sign Up Successfull",
        html:`<p>Congratulations ${user}, You have successfully signed up</p>`
    })

    console.log("Transporter---->",transporter)
})


app.listen(3001,()=>{
    console.log("Server started at port no 3001")
})