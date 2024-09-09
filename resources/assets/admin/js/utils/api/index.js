import auth from "./auth";
import account from "./account";
import image from "./image";
import file from "./file";
import role from "./role";
import user from "./user";
import resource from "./resource";
import videoCase from "./case";
import service from "./service";
import about from "./about";
import contact from "./contact";
import footer from "./footer";

export default {
    auth,
    account,
    image,
    file,
    case: videoCase,
    about: {
        service,
        description: about.description,
        contacts: about.contacts,
        social: about.social
    },
    contact,
    footer,
    user: {
        user,
        role,
        resource,
    }
};
