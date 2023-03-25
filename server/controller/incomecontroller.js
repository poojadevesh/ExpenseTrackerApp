
const incomemodel = require("../models/incomemodel");



// ================================Add Income===============================

 const addIncome = async (req, res) => {

    try {
       let data =req.body
       const { title, amount, category, description, date,userId } = data

       const Userincome = {
        userId: userId,
        title: title,
        category: category,
        amount:amount,
        date:date ,
        description:description 
    }


    if (!req.body) {
        return res.status(400).send({ status: false, msg: "Please fill data" });
    }
       if (!title || !category || !description || !date) {
              return res.status(400).json({ message: "All fields are required!" });
            }
        
    
            const newUser = await incomemodel.create(Userincome);
        return res.status(201).send({ status: true, data: newUser});

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  

// ======================================Get Income===================================

const getIncomes = async (req, res) =>{
    try {
        const incomes = await incomemodel.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}


// ===============================DeleteIncome==============================

const deleteIncome = async (req, res) =>{
    const {id} = req.params;
    incomemodel.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}





module.exports ={
    deleteIncome,getIncomes,addIncome
}