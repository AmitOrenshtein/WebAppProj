//const { describe } = require('node:test');
const User = require('../models/user')

const createUser = async (username, password, shoppingCart, deliveryAdress, userType) => {
    const user = new User(
            {
                username:username,
                password:password,
                deliveryAdress:deliveryAdress,
                userType:userType,
                shoppingCart:shoppingCart
                //TODO: create refernce to shopping cart
            });
            customeResponse = await user.save()
            .catch((err)=> {console.log("invalid input, please note your required fields, types & spaces")
            return false})
            return customeResponse
}


const getUserById = async(id) =>{
    // console.log("in get user sevice:", id)
    let res = await User.findById(id)
    console.log(res)
    return res
}
const getUsers = async() =>{
    return await User.find({})
}

const getUserByUsernameAndPass = async (username, password) => {
    return User.findOne({username: username, password: password});
}


const getUserByName = async(searchName) =>{
    let result = await User.find({username : {$regex : searchName , $options : "i"}});
    console.log(result);
    return (result);
    //TODO make this work including the multiple GET commands 
}

//TODO get user product list

/*
const getUsersByCategory = async(searchedCategory) =>{
    //return await User.find({"category": { "$regex": searchedCategory} });
    return (await User.find({category : "football"})).forEach(printjson);

    //that's a Mongoose function
}
*/

const updateUser = async (id,username, password, shoppingCart, deliveryAdress, userType) => {
    // console.log("in service: ", id)
    const user = await getUserById(id).catch(error =>false)
    if (user === false)
        return "User not found";
    if(!username)
        user.username = user.username;
    else  
        user.username = username;
    if(!password)
        user.password = user.password;
    else
        user.password = password;
    if(!shoppingCart)
        user.shoppingCart = user.shoppingCart;
    else
        user.shoppingCart = shoppingCart;
    if(!deliveryAdress)
        user.deliveryAdress = user.deliveryAdress;
    else
        user.deliveryAdress = deliveryAdress;
    if(!userType)
        user.userType = user.userType;
    else
        user.userType = userType;
    let res = await user.save()
    .catch(error=>"Input invalid")
    return res;
}

const deleteUser = async (id) => {
    const user = await getUserById(id);
    if (!user)
        return null;
    await user.deleteOne();
    console.log("User deleted")
    return user;
}

module.exports = {
    createUser,
    getUserById,
    getUsers,
    updateUser,
    getUserByName,
    deleteUser,
    getUserByUsernameAndPass
}