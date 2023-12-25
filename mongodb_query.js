{
    let users=await User.find({$and:[{name:"Ajay"},{lastname:"Gupta"}]}).skip(4).limit(3);
    let updateUsers=await USer.updateMany({firstname:"Narendra"},{$set:{firstname:"Panchal"}})
    let deleteUser=await User.deleteOne({ name: "John" });
    let deleteManyUser=await User.deleteMany({firstname: "kl"})

}