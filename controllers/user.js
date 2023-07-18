const Userservice = require('../services/user')

const createUser = async (req,res) => {
  const {username, password, deliveryAdress}  = req.body
  const newUser = await Userservice.createUser(username, password, deliveryAdress);
  res.json(newUser)
}


const getUsers = async (req,res) => {
  const Users = await Userservice.getUsers();
  res.json(Users);
}

const getUser = async (req,res) => {
  const user = await Userservice.getUserById(req.params.id);
  if (!user){
    return res.status(404).json({errors:['User not found']});
  }
  res.json(user);
}


const getUserByName = async (req,res) => {
  const user = await Userservice.getUserByName(req.params.username);
  if (!user){
    return res.status(404).json({errors:[user]});
  }
  res.json(user);
}

const updateUser = async (req,res) => {
  // console.log("in controller 1")
  const {username, password, shoppingCart, deliveryAdress, userType}  = req.body
  // console.log("in controller 2")
  // console.log("in controller req params", req.params.id)
  const user = await Userservice.updateUser(req.params.id, username, password, shoppingCart, deliveryAdress, userType);
  if (user !== true){
    return res.status(404).json({errors:[user]});
  }
  res.json(user);
};


const deleteUser = async (req,res) => {
  const user = await Userservice.deleteUser(req.params.id);
  if (!user){
    return res.status(404).json({errors:["User not found"]});
  }
  res.send();
}

module.exports = {
    createUser,
    getUsers,
    getUser,
    getUserByName,
    updateUser,
    deleteUser
}