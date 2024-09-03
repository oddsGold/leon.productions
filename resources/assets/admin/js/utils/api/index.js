import auth from "./auth";
import account from "./account";
import image from "./image";
import file from "./file";
import role from "./role";
import user from "./user";
import resource from "./resource";

export default {
    auth,
    account,
    image,
    file,
    user: {
        user,
        role,
        resource,
    }
};
