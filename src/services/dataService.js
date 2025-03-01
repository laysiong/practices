//this to store backend api routes
import { v4 as uuidv4 } from 'uuid';
import {userData} from '../backend/data';

//For now we will use a fake backend api
export const dataService = {
    getData() {
        return userData;
    },

    checkUser(email) {
        if (!email) return false;
        const normalizedEmail = email.toLowerCase().trim();
        const existingUser = userData.find(user => 
            user.email && user.email.toLowerCase().trim() === normalizedEmail
        );
        return !!existingUser; // Convert to boolean
    },

    addUser(user) {
        userData.push(user);
        return userData;
    },

    createData(data) {
        //if data is empty or &nbsp then return error

        if(this.checkUser(data.email)) {
            return {results:false, error: "User already exists"};
        }

        const newUser = {
            ...data,
            id: uuidv4(),
        }

        return { results: true, data: newUser };
    }

}
