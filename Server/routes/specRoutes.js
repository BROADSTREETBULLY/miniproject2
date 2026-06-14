
const express = require("express");
const router = express.Router();
const specController = require("../controllers/specController");
 
router.get("/library", specController.getLibrary);   
router.get("/search", specController.searchLibrary); 
router.get("/", specController.getAll);              
router.get("/:id", specController.getOne);        
router.post("/", specController.createOne);      
router.put("/:id", specController.updateOne);      
router.delete("/:id", specController.deleteOne);   
 
module.exports = router;
 