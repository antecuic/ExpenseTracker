const User = require('../models/user')
const IncomeExpense = require('../models/income-expense');
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const getUser = async (req, res, next) => {


    jwt.verify(req.token, 'secretkey', async(err) => {
        if(err) {
            const error = new HttpError('Unauthorized!', 403)
            return next(error);
        }
    })

    const uid = req.params.uid
    let user;

    try {
        user = await User.findById(uid);
    } catch (err) {
        const error = new HttpError('Something went wrong...', 500)
        return next(error);
    }
    if(!user) {
        const error = new HttpError('Could not find user with provided id.', 404)
        return next(error);
    }

    res.status(201).json(user)

}

const signUp = async (req, res, next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs!', 422))
    }

    const { name, email, password, currency } = req.body;

   let existingUser; 

   
    try {
        existingUser = await User.findOne({ email: email })
    } catch(err) {
        const error = new HttpError('Signing up failed!', 500);
        return next(error);
    }

    if(existingUser) {
        const error = new HttpError('User already existing, please log in!', 422)
        return next(error);
    }

    const createdUser = new User({
        name, 
        email,
        password,
        balance: 0,
        currency
    })

    try {
        await createdUser.save();
        
    } catch (error) {
        error = new HttpError('Signing up failed, please try again', 500)
        return next(error);
    }


    res.status(201).json({user: createdUser.toObject({ getters: true })})

}

const login = async (req, res, next) => {
    

    const { email, password } = req.body;

    let existingUser; 

    try {
        existingUser = await User.findOne({ email: email })
    } catch(err) {
        const error = new HttpError('Logging in failed!', 500);
        return next(error);
    }
    if (!existingUser || existingUser.password !== password) {
        const error = new HttpError('Invalid credentials, could not log you in', 401)
        return next(error);
    }


    jwt.sign({user:existingUser}, 'secretkey', (err, token) => {
        
        if(err) {
            const error = new HttpError('Could not log you in', 401)
            return next(error)
        }
        res.json({user: existingUser, accessToken: token})
    })
}

const add = async (req, res, next) => {

    const errors = validationResult(req);
    const { value, description, creator, type } = req.body

    if(!errors.isEmpty() || value === 0) {
        return next(new HttpError('Invalid inputs!', 422))
    }

    jwt.verify(req.token, 'secretkey', async(err) => {
        if(err) {
            const error = new HttpError('Unauthorized', 403)
            return next(error);
        }
    })

    if(type === 'income') {

        const income = new IncomeExpense({
            description,
            value,
            date: new Date(),
            creator,
            type
        })
     
        let user;

        try {
            await income.save()
        } catch(err) {
            const error = new HttpError('Creating income failed, please try again', 500)
            return next(error);
        }

        try {
            user = await User.findById(creator)
        } catch (error) {
            error = new HttpError('Updating balance failed, please try again', 500)
            return next(error);
        }

        if(!user) {
            const error = new HttpError('Could not find user for provided id.', 404);
            return next(error);
        }

        user.balance += value


        try {
            await user.save()
        } catch (error) {
            error = new HttpError('Updating balance failed, please try again', 500)
            return next(error);
        }           
        

        res.status(201).json({ income: income}) //successfully added
     
    } else if (type === 'expense') {
        const expense = new IncomeExpense({
            description,
            value,
            date: new Date(),
            creator,
            type
        })
     
        let user;

        try {
            user = await User.findById(creator)
        } catch(err) {
            const error = new HttpError('Updating user\'s balance failed, please try again', 500)
            return next(error);
        }
     
        if(!user) {
            const error = new HttpError('Could not find user for provided id.', 404);
            return next(error);
        }
        
        user.balance -= value
     
        try {
            await user.save()
        } catch (error) {
            error = new HttpError('Updating user\'s balance failed, please try again', 500)
            return next(error);
        }
     
        try {
            await expense.save()
        } catch(err) {
            const error = new HttpError('Creating expense failed, please try again', 500)
            return next(error);
        }
        
        res.status(201).json({ expense: expense})
      
    } else {
        const error = new HttpError('Type failure!', 500)
        return next(error)
    }
}

const remove = async (req, res, next) => {

    const id = req.params.id
    const { type, creator, value } = req.body  

    jwt.verify(req.token, 'secretkey', async (err, authData) => {

        if(err) {
            const error = new HttpError('Something went wrong with authorization', 403)
            return next(error);
        } 
    })

    try {
        await IncomeExpense.findByIdAndDelete(id)
    } catch (err) {
        const error = new HttpError('Couldn\'t delete item!', 500 )
        return next(error)
    }

    if(type === 'income') {

        user = await User.findById(creator)

        
        user.balance -= value
        
        try {
            await user.save()
        } catch(err) {
            error = new HttpError('Deleting income failed, please try again', 500)
            return next(error);
        }
        
        res.status(200).json({ message: "Deleted successfully" });

    } else if(type === 'expense') {

        user = await User.findById(creator)

        
        user.balance += value
       
    
        try {
            await user.save()
        } catch(err) {
            error = new HttpError('Deleting expense failed, please try again', 500)
            return next(error);
        }
        
        res.status(200).json({ message: "Deleted successfully" });
    } else {
        res.status(500).json({ message: "Type failure!"})
    }

}

const getBudget = async (req, res, next) => {

    const userId = req.params.uid;

    let user;

    jwt.verify(req.token, 'secretkey', async(err, authData) => {
        if(err) {
            const error = new HttpError('Something went wrong with authorization', 403)
            return next(error);
        } 
    })

    try {
        user = await User.findById(userId)
    } catch(err) {
        const error = new HttpError('Could not get user information.', 500);
        return next(error);
    }

    res.status(200).json(user.budget)
}

const changeDescription = async (req, res, next) => {

    const errors = validationResult(req);
    const { description, id } = req.body
    let item

    if(!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs!', 422))
    }

    jwt.verify(req.token, 'secretkey', async(err) => {
        if(err) {
            const error = new HttpError('Unauthorized', 403)
            return next(error);
        }
    })

    try {
        item = await IncomeExpense.findByIdAndUpdate(id, {description: description})
    } catch(err) {
        const error = new HttpError('Updating item failed, please try again', 500)
        return next(error);
    }

    if(!item) {
        const error = new HttpError('Could not find item with provided id.', 404)
        return next(error)
    }
     

    try {
        await item.save()
    } catch(err) {
        const error = new HttpError('Could not update item!', 500)
        return next(error);
    }
    res.json({message: 'Updated successfully!'})

}

function sortedItems(items) {

    let temp
    for(let i = 0; i < items.length; i++) {
        for(let j = 0; j < items.length; j++) {
            if(items[j].date < items[i].date) {
                temp = items[i]
                items[i] = items[j]
                items[j] = temp
            }
        }
    }
    return items
}

const getItems = async (req, res, next) => {

    jwt.verify(req.token, 'secretkey', (err) => {
        if(err) {
            const error = new HttpError('Unauthorized', 403)
            return next(error);
        }
    })

    const creator = req.params.uid
    let items
    
    try {
        items = await IncomeExpense.find({"creator": creator})
    } catch(err) {
        const error = new HttpError('Fetching data failed', 500)
        return next(error)
    }

    if(items.length === 0) {
        res.status(200).json({message: 'No items found'})
    } else {
        res.status(200).json(sortedItems(items))
    }
}

const getSingleItem = async (req, res, next) => {

    jwt.verify(req.token, 'secretkey', (err) => {
        if(err) {
            const error = new HttpError('Unauthorized', 403)
            return next(error);
        }
    }) 

    const id = req.params.id
    let item

    try {
        item = await IncomeExpense.findById(id)
    } catch (err) {
        const error = new HttpError('Something went wrong...', 500)
        return next(error)
    }

    if(!item) {
        const error = new HttpError('Nothing found...', 404)
        return next(error)
    }
    res.json(item)
}


exports.signUp = signUp
exports.login = login
exports.add = add
exports.delete = remove
exports.getBudget = getBudget
exports.getUser = getUser
exports.changeDescription = changeDescription
exports.getItems = getItems
exports.getSingleItem = getSingleItem