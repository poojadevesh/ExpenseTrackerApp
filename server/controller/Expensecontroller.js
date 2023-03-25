
const expensemodel = require("../models/expensemodel")

// ===========================Add Expense=====================================
const addExpense = async (req, res) => {
    try {
        let data = req.body
        const {title, amount, category, description, date,userId}  =data

    const income = expensemodel({
        title,
        amount,
        category,
        description,
        date,
        userId
    })
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

   
}



// =====================================Get Expense==============================

const getExpense = async (req, res) =>{
    try {
        const incomes = await expensemodel.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

// ===============================Delete Expense===================================

const deleteExpense = async (req, res) =>{
    const {id} = req.params;
    expensemodel.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}

module.exports={
    addExpense,getExpense,deleteExpense
}
