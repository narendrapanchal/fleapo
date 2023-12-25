//Aggregation
    let orders = await Order.find();
    console.log(orders[0].userId);
   {
    //  let data = await Order.aggregate([
    //     {
    //         $match:{
    //                 status:{

    //                     $not:{
    //                         $elemMatch: { $eq: "Rejected" }
    //                     }
    //                 }
    //         }
    //     }

    //     ]);
      }
{
    const data=await Inventory.aggregate([
        {
          $group:{
            _id:"$_id",
            weight:{$avg:'$weight'},
            price:{$avg:"$price"},
            total:{$sum:1}
          }
        },
        {
          $project:{
            _id:1,
            weight:1,
            price:1,
            total:1
          }
        },
        {
          $sort:{
            weight:-1,
            price:1
          }
        },{
          $group:{
            _id:null,
            total_weight:{$sum:'$weight'},
          total_price:{$sum:'$price'}
          }
        }
      ])
}
    {
         let data = await Order.aggregate([
        {
            $match:{
                    status:{

                        $not:{
                            $elemMatch: { $eq: "Rejected" }
                        }
                    }
            }
        },
        {
          $unwind:'$items'
        },{
          $group:{
            _id:{$sum:"$items.quantity"},
            quantity:{$sum:"$items.quantity"}
          }
        },
        {$group:{
          _id:null,
          total:{$sum:"$quantity"}
        }}

        ]);
      }
      let data=await Order.aggregate([
        {
            $unwind:"$items"
        },
        {
          $addFields:{
            productId:"$items.productId"
          }
        },{
          $lookup:{
            from:"inventories",
            localField:"productId",
            foreignField:"_id",
            as:"product"
          }
        },
        {
          $unwind:"$product"
        },
        {
          $match:{
            status:{
              $not:{
                $elemMatch:{$eq:"Rejected"}
              }
            }
          }
        },
        {
          $group:{
           _id:null,
           total:{
            $sum:{$multiply:["$items.quantity","$product.price"]}
           }
          }
        }
      ])