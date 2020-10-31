const express = require('express');
const cors = require('cors');
const monk = require('monk');
const Filter = require('bad-words');
const rateLimit = require('express-rate-limit');


const db = monk('localhost/BuckyAlita');
const mews = db.get('mews');
const app = express();
const filter = new Filter();

app.use(cors());
app.use(express.json())


app.get('/',(req,res)=>{
    res.json({
        message:"Hello Alita😜😜"
    });
});

app.get('/mews',(req,res) =>{
    mews  
        .find()
        .then(mews => {
            res.json(mews)
        });
});





function isValidAlita(mew)
{
    return mew.name && mew.name.toString().trim() != '' && mew.content && mew.content.toString().trim() != '';
}

app.use(rateLimit({
    windowMs: 30 * 1000,
    max: 1
}));

app.post('/mews',(req,res)=>{
    // mews.drop()

    // console.log(req.body);
    if(isValidAlita(req.body)){
        // insert into database
        const mew = {
            name: filter.clean(req.body.name.toString()),
            content: filter.clean(req.body.content.toString()),
            created:new Date()
        }
        

        mews
            .insert(mew)
            .then(createdMew => {
                res.json(createdMew);
               
            })
    }
    else{
        res.status(422);
        res.json({
            message:"Hey Buddy Name and Content is require for tweet. tenu inna bhii nii pta.😒😒"
        });
    }
})





app.listen(5000,()=>{
    console.log("We're Listning BuckyAlita on port http://localhost:5000")
});