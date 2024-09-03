import {Notification} from "./Notification";
import {clearAuthentication} from "../components/auth/redux/actions";

export default function (exception) {

    let title = 'Ошибка';
    let message = 'Неизвестная ошибка';

    if(exception.response){

        switch (exception.response.status){
            case 401:{
                message = 'Время сессии истекло';
                break;
            }
            case 403:{
                message = 'Нету доступа';
                break;
            }
            case 404:{
                message = 'Не найдено';
                break;
            }
            case 416:{
                message = 'Слишком много запросов. Попробуйте через пару минут.';
                break;
            }
            case 422:{
                if(exception.response.data && exception.response.data.errors){
                    for(let i of Object.keys(exception.response.data.errors)){
                        Notification.error('Ошибка валидации',exception.response.data.errors[i][0]);
                    }
                    return {type: null};
                }
                message = 'Неверное заполнение поля';
                break;
            }
            case 500:{
                message = 'Внутренняя ошибка сервера';
                break;
            }


        }

    }

    Notification.error(title, message);

    if(exception.response && exception.response.status === 401){
        return clearAuthentication();
    }

    return {type: null};
}
