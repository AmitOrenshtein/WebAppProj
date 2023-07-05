const Supplierservice = require('../services/supplier')

const createSupplier = async (req,res) => {
  const {name,productList, email}  = req.body
  const newSupplier = await Supplierservice.createSupplier(name,productList, email);
  res.json(newSupplier)
}


const getSuppliers = async (req,res) => {
  const Suppliers = await Supplierservice.getSuppliers();
  res.json(Suppliers);
}

const getSupplier = async (req,res) => {
  const supplier = await Supplierservice.getSupplierById(req.params.id);
  if (!supplier){
    return res.status(404).json({errors:['Supplier not found']});
  }
  res.json(supplier);
}

const getSupplierProductList = async(req,res) => {
  const productObjects = await Supplierservice.getSupplierProductList(req.params.id);
  if (!productObjects) {
    return res.status(404).json({errors:['Supplier not found']});
  }
  res.json(productObjects);
}
//TODO make sure the above funtion GET works

const updateSupplier = async (req,res) => {
  const {name,supplierList, email}  = req.body
  const supplier = await Supplierservice.updateSupplier(req.params.id,name,supplierList, email);
  if (!supplier){
    return res.status(404).json({errors:['Supplier not found']});
  }
  res.json(supplier);
};


const deleteSupplier = async (req,res) => {
  const supplier = await Supplierservice.deleteSupplier(req.params.id);
  if (!supplier){
    return res.status(404).json({errors:['Supplier not found']});
  }
  res.send();
}

module.exports = {
    createSupplier,
    getSuppliers,
    getSupplier,
    getSupplierProductList,
    updateSupplier,
    deleteSupplier
}