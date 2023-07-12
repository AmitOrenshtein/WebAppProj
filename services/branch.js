const Branch = require('../models/branch')

const createBranch = async (name, address) => {
    const branch = new Branch(
            {
                name:name,
                address:address
            });
    return await branch.save()
}


const getBranchById = async(id) =>{
    return await Branch.findById(id)
}
const getBranches = async() =>{
    return await Branch.find({})
}

const getBranchesByName = async(searchName) =>{
    let result = await Branch.find({name : {$regex : searchName , $options : "i"}});
    console.log(result);
    return (result);
    //TODO make this work including the multiple GET commands 
}

const updateBranch = async (id,name, address) => {
    const branch = await getBranchById(id);
    if (!branch)
        return null;
    if(!name)
        branch.name = branch.name;
    else  
        branch.name = name;
    if(!address)
        branch.address = branch.address;
    else
        branch.address = address;
    await branch.save();
    return branch;
}

const deleteBranch = async (id) => {
    const branch = await getBranchById(id);
    if (!branch)
        return null;
    await branch.deleteOne();
    return branch;
}

module.exports = {
    createBranch,
    getBranchById,
    getBranchesByName,
    getBranches,
    updateBranch,
    deleteBranch
}