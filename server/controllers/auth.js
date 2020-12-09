const User = require('../models/user');


exports.createOrUpdateUser = async (req, res) =>
{
    const { name, picture, email } = req.user;

    const user = await User.findOneAndUpdate({email: email}, {name: name, picture: picture}, {new: true})      //find user based on email first arg; Update the things in 2nd arg; third arg sends the updated info
    
    if(user)
    {
        res.json(user);
        console.log("User updated-> ", user);
    }
    else
    {
        const newUser = await new User(
            {
                email: email,
                name: name,
                picture: picture
            }
        ).save();
        console.log("New user created-> ", newUser);
        res.json(newUser);
    }
}

exports.currentUser = async (req, res) =>
{
    User.findOne({email: req.user.email}).exec((err, user) =>
    {
        if(err)
        {
            throw new Error(err);
        }
        res.json(user);
    });
}