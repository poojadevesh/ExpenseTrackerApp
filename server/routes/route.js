const express = require('express')
const router = express.Router()
const{authentication} =require("../middleware/auth")

const {createUser,userLogin} =require("../controller/usercontroller")
const { addExpense, getExpense, deleteExpense } = require('../controller/Expensecontroller');
const { addIncome, getIncomes, deleteIncome } = require('../controller/incomecontroller')

// income
router.post('/add-income',authentication, addIncome)
router .get('/get-incomes', authentication,getIncomes)
router.delete('/delete-income/:id',authentication, deleteIncome)
// ======expense==============

router.post('/add-expense',authentication, addExpense)
router.get('/get-expenses',authentication, getExpense)
router.delete('/delete-expense/:id',authentication, deleteExpense)

// user
router.post("/Registration",createUser)
router.post('/login', userLogin)


module.exports = router