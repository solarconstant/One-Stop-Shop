const admin = require('../firebase');

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