import axios from 'axios';
import { getLoggedUser, getUserByid } from '../users/users.api';
import { TaskStatus } from './task-statuses';

const apiUrl = 'http://localhost:3005/tasks';


export async function getAllTasks() {
    const allTasks = (await axios.get(`${apiUrl}`)).data;

    const setTasks = [];

    for(let i=0; i<allTasks.length; i++){
        const setTask =  await setAutherNameForTask(allTasks[i]);
        setTasks.push(setTask);
    }

    return setTasks;
}

export async function getTaskById(id) {
    const task = (await axios.get(`${apiUrl}/?id=${id}`)).data[0];
    return setAutherNameForTask(task);

}

export async function getTasksByAuthorId(authorId) {
    const tasks = (await axios.get(`${apiUrl}/?authorId=${authorId}`)).data;
    const setTasks = [];

    for(let i=0; i<tasks.length; i++){
        const setTask =  await setAutherNameForTask(tasks[i]);
        setTasks.push(setTask);
    }



    return setTasks;
}


export function saveTask(taskData) {
    const loggedUser = getLoggedUser();

    if (taskData.id) {
        return axios.put(`${apiUrl}/${taskData.id}`, taskData);
    }

    taskData.authorId = loggedUser.id;
    taskData.date = (new Date()).toDateString();
    if (!taskData.status)
        taskData.status = TaskStatus.Active;

    return axios.post(`${apiUrl}`, taskData);
}

export function deleteTask(id) {
    return axios.delete(`${apiUrl}/${id}`);
}

export async function deleteTasksForAuthor(authorId) {
    const notes = await getTasksByAuthorId(authorId);

    notes.forEach(note => {
        deleteTask(note.id);
    });
} 

async function setAutherNameForTask(task){    
    const user = await getUserByid(task.authorId);
    if(!user) {return task;}
    const setTask = { ...task, authorName: user.name };
    return setTask;
}