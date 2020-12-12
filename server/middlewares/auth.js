const admin = require('../firebase');
const User = require('../models/user');
exports.authCheck = async (req, res, next) =>
{
    try
    {   
        const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken);
        console.log("Firebase user in AuthCheck-> ", firebaseUser);
        req.user = firebaseUser;     //to access info in controllers
        next();
    }
    catch(err)
    {
        res.status(401).json(
            {
                err: "Invalid or Expired Token",
            }
        );
    }
};

exports.adminCheck = async (req, res, next) =>
{
    const { email } = req.user;

    const adminUser = await User.findOne({email: email}).exec();

    if(adminUser.role !== 'admin')
    {
        res.status(403).json(
            {
                err: "Admin resource. Access denied!"
            }
        )
    }
    else
    {
        next();
    }
}