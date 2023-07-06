const Branchservice = require('../services/branch')

const createBranch = async (req,res) => {
  const {name, address}  = req.body
  const newBranch = await Branchservice.createBranch(name, address);
  res.json(newBranch)
}


const getBranches = async (req,res) => {
  const Branchs = await Branchservice.getBranchs();
  res.json(Branchs);
}

const getBranch = async (req,res) => {
  const branch = await Branchservice.getBranchById(req.params.id);
  if (!branch){
    return res.status(404).json({errors:['Branch not found']});
  }
  res.json(branch);
}



const updateBranch = async (req,res) => {
  const {name, address}  = req.body
  const branch = await Branchservice.updateBranch(req.params.id,name, address);
  if (!branch){
    return res.status(404).json({errors:['Branch not found']});
  }
  res.json(branch);
};


const deleteBranch = async (req,res) => {
  const branch = await Branchservice.deleteBranch(req.params.id);
  if (!branch){
    return res.status(404).json({errors:['Branch not found']});
  }
  res.send();
}

module.exports = {
    createBranch,
    getBranches,
    getBranch,
    updateBranch,
    deleteBranch
}