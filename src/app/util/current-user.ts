import { User } from "./../models/User";

const user = <User>JSON.parse(localStorage.getItem("currentUser"));
const CurrentUser = { ...user["message"] };

export { CurrentUser };
