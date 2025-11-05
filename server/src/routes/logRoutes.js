import express from "express";
import ImportLog from "../models/importLogModel.js";

const router = express.Router();

router.get('/',async(req,res)=>{
    try {
        const logs = await ImportLog.find().sort({createdAt:-1})
        res.json(logs)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})
export default router