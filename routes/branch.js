const express = require('express');
const branchRouter = express.Router();

const branchesController = require('../controllers/branch')

branchRouter.route('/')
    .get(branchesController.getBranches)
    .post(branchesController.createBranch)

branchRouter.route('/name/:name')
    .get(branchesController.getBranchesByName)

branchRouter.route('/:id')
    .get(branchesController.getBranch)
    .put(branchesController.updateBranch)
    .delete(branchesController.deleteBranch)

module.exports = branchRouter;
