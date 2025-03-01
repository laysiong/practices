//this to store backend api routes
import { v4 as uuidv4 } from 'uuid';
import {userData} from '../backend/data';

//For now we will use a fake backend api
export const dataService = {
    getData() {
        return userData;
    },

    checkUser(email) {
        return userData.find(user => user.email === email);
    },

    createData(data) {
        //if data is empty or &nbsp then return error

        if(this.checkUser(data.email)) {
            return {results:false, error: "User already exists"};
        }

        data.id = uuidv4();
        userData.push(data);
        return { data: data };
    }

}
