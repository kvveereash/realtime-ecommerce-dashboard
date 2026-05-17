import express from 'express';
import Product from '../models/Product.js';

console.log("Server file started...");


const router= express.Router();


router.get('/',async (req,res)=>{
    const product= await Product.find();
    console.log(product);
    res.json(product);
})

router.get('/:id',async(req,res)=>{
    const product = await Product.findById(req.params.id);
    console.log(product);
    res.json(product)
})

router.post('/',async (req,res)=>{
    try{
            const newproduct=new Product(req.body);
            const saveproduct= await newproduct.save();
            res.json(saveproduct);
        }
        catch(err)
        {
            res.status(500).json({error:err.message})
        }
})


router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put("/:id",async(req,res)=>{
    try{
        const updateproduct=await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.json(updateproduct)
    }
    catch(err)
    {
        res.status(500).json({ error: err.message });
    }
})

export default router;