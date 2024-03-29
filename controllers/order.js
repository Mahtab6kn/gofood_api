const  Order = require('../models/orders')

const orderData = async (req, res) =>{

    let data = req.body.order_data
    await data.splice(0, 0, {order_date: req.body.order_date})

    let eId = await Order.findOne({'email':req.body.email})
    if(eId === null){
        try{
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(()=>{
                res.json({success:true})
            })
        }
        catch(e){
            res.send(e)
        }
    }
    else{
        try{
            await Order.findOneAndUpdate({email: req.body.email},
                {
                    $push: {order_data: data}
                }).then(()=>{
                    res.json({success:true})
                })
        }
        catch(e){
            res.send(e);
        }
    }
}
const myOrder = async(req , res) =>{
    try{
         let email = req.body.email;
         console.log(email)
          let data = await Order.findOne({'email':req.body.email});
          console.log({email:data})
          res.json({orderData:data})
    }
    catch(e){
        console.log(e)
    }
}




module.exports = {
    orderData,
    myOrder
}