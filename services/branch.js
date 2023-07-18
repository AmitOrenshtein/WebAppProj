const Branch = require('../models/branch')

const createBranch = async (name, lng,lat) => {
    const branch = new Branch(
            {
                name:name,
                lng:lng,
                lat:lat
            });
    //return await branch.save()
    customeResponse = await branch.save()
    .then(()=> true)
    .catch((err)=> {console.log("invalid input, please note your required fields, types & spaces", err);
    return false})
    return customeResponse
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

const updateBranch = async (id,name, lng,lat) => {
    const branch = await getBranchById(id).catch(error =>false)
    if (!branch)
        return "branch not found";
    if(!name)
        branch.name = branch.name;
    else  
        branch.name = name;
    if(lng)
        branch.lng = lng;
    if(lat)
        branch.lat = lat;
    let res = await branch.save()
    .catch(error=>"Input invalid")
    return res;
}

const deleteBranch = async (id) => {
    const branch = await getBranchById(id);
    if (!branch)
        return null;
    await branch.deleteOne();
    console.log("Branch deleted")
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