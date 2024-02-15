const express = require("express");
const app = express();
const port = 3000

//storing data global currently as dbms
const users = [{
    name: 'John',
    kidneys:[{
        healthy:false     
    }]
}]
app.use(express.json());

app.get("/", function(req, res) {
    const johnkidneys = users[0].kidneys
    const noofkidneys = johnkidneys.length
    //filter
    let numberofhealthykidneys = 0;
    for (let i = 0; i<johnkidneys.length; i++) {
        if(johnkidneys[i].healthy){
            numberofhealthykidneys = numberofhealthykidneys + 1;
        }
    }
    const numberofunhealthykidneys = noofkidneys - numberofhealthykidneys
    res.json ({
        noofkidneys,
        numberofhealthykidneys,
        numberofunhealthykidneys
    })
    console.log(johnkidneys)
})


app.post("/", function(req, res){
    const ishealthy = req.body.ishealthy; // Access request body using req.body
    users[0].kidneys.push({
        healthy: ishealthy
    });
    res.json({
        msg: "Done"
    });
});

app.put("/", function(req,res){
    for(let i=0; i<users[0].kidneys.length; i++){
        users[0].kidneys[i].healthy = true;
    }
    res.json({});
})
//removinf all the unhealthy kidneys
app.delete("/",function(req,res){
    //no- data then you should return a 411 you can use if()
 if(isThereAtleastOneKideny()){
    const newKidenys = [];
    for(let i=0; i<users[0].kidneys.length; i++){
        if (users[0].kidneys[i].healthy){
            newKidenys.push({
                healthy: true,
            })
        }
    }
    users[0].kidneys = newKidenys
    res.json({
        msg:"done"
    })

 }else{
    res.sendStatus(411).json({
        msg: "no bad kidneys"
    })
 }

   
})
 
function isThereAtleastOneKideny(){
    let atleastoneunhealthykidney=false
 for(let i=0; i<users[0].kidneys.length; i++){
    if (!users[0].kidneys[i].healthy){
        atleastoneunhealthykidney=true
    }
}
return atleastoneunhealthykidney
}
app.listen(port,function(){
    console.log(`App is listening on ${port}`)
})