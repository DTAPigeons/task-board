import axios from 'axios';
//import { deleteNotesForAuthor } from './notes.api';
import { getHash } from  '../../helpers/cryptoHelper';

const apiUrl = "http://localhost:3005/users";

export function getLoggedUser() {
    return JSON.parse(localStorage.getItem('loggedUser'));
}


export async function getAllUsers(params) {
    const allUsers = (await axios.get(`${apiUrl}`)).data;
    
    if (!params)
        return allUsers;
    const lowerParam = params.toLowerCase();
    return allUsers.filter(user => user.name.toLowerCase().includes(lowerParam) || user.email.toLowerCase().includes(lowerParam));
}

export async function getUserByid(id){
    var user = (await axios.get(`${apiUrl}/?id=${id}`)).data[0];
    return user;
}

export async function getUserByEmail(email){
    var user = (await axios.get(`${apiUrl}/?email=${email}`)).data[0];
    return user;
}

export async function register(userData){
    const existingUser = await getUserByEmail(userData.email);

    if(existingUser){
        throw new Error('Email already exists!');
    }

    var saveData = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        isActive: true,
        isAdmin: false,
        picture: "https://picsum.photos/200/300?random=1",
    }

    saveData.password = getHash(saveData.password);

    return axios.post(`${apiUrl}`, saveData);
}

export async function login(userData){
    const loggedUser = await getUserByEmail(userData.email); 
    const attemptedPassword = getHash(userData.password);

    if(!loggedUser || loggedUser.password!=attemptedPassword){
        throw new Error('Incorrect username/password');
    }

    if(!loggedUser.isActive){
        throw new Error('The current user has been blocked!');
    }

    const loggedUserData = {
        ...loggedUser
    };

    loggedUserData.password = '*****';

    localStorage.setItem('loggedUser', JSON.stringify(loggedUserData));

}

export function logout() {
    localStorage.removeItem('loggedUser');
}

export function saveUser(userData) {
    if (userData.id) {
        if(userData.password!=''){
            userData.password = getHash(userData.password);
        }
        else {
            delete userData.password;
        }
    
        return axios.patch(`${apiUrl}/${userData.id}`, userData);
    }
    
    return register(userData);
    
}

export function deleteUser(id) {
    //deleteNotesForAuthor(id);
    return axios.delete(`${apiUrl}/${id}`);
}