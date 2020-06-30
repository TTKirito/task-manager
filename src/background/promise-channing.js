require('../db/mongoose')
const User = require('../models/user')


const findAndDelete = async (id) => {
    const user = await User.findByIdAndDelete(id)
    const count = await User.countDocuments({age: 1})
    return count
}

findAndDelete("5ef4d4672738111ad40fdcaa").then(result => {
    console.log(result)
}).catch(e => {
    console.log(e)
})