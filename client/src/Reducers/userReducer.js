export default function userReducer(state = null, action)
{
    switch(action.type)
    {
        case "LOGGED_IN_USER":
            return action.payload;      //once user is logged in the payload contains user info
        case "LOGOUT":
            return action.payload;      //null user object
        default:
            return state;
    }
}