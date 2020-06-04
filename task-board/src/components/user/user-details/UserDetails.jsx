import React, { useEffect } from 'react';
import { UserCard } from '../user-card/UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTasksForUserFromAPI, deleteTaskFromAPI } from '../../../core/redux/actions/task-actions';
import { fetchLoggedUser } from '../../../core/redux/actions/auth-actions';
import { deleteUserFromAPI, fetchUserByIdFromAPI } from '../../../core/redux/actions/user-actions';
import { TaskCard } from '../../task/task-card/TaskCard';

const listStyles = {
    margin: '5px',
    flexWrap: 'wrap'
};

export function UserDetails(props){
    const dispatch = useDispatch();   

    const loggedUser = useSelector(state => state.authReducer.loggedUser);
    const tasks = useSelector(state=> state.taskReducer.tasks);
    const user = useSelector(state => state.usersReducer.selectedUser);

    useEffect(() => {
        dispatch(fetchLoggedUser());
        dispatch(fetchUserByIdFromAPI(props.computedMatch.params.id));
        dispatch(fetchAllTasksForUserFromAPI(props.computedMatch.params.id));
    }, [props.computedMatch, dispatch]);

    const onDeleteTask = (id) => {
        dispatch(deleteTaskFromAPI(id))
    };

    const onDeleteUser = (id) =>{
        dispatch(deleteUserFromAPI(id));
    }


    return (
        <div className="single-user">
        <div className="notes-list-wrapper d-flex" style={listStyles}>
                <UserCard user={user} loggedUser={loggedUser} key={user.id} onDelete={onDeleteUser} />
                
                { tasks.map(task => <TaskCard task={task} key={task.id} loggedUser = {loggedUser} onDeleteClick={onDeleteTask} /> )}
        </div>
            </div>
    )
}

/*
export class User extends Component {

    constructor(props) {
        super(props);

        this.state =  {
            user: {},
            notes: []
        };
    }

    componentDidMount() {
        console.log(this.props);
        getUserById(this.props.computedMatch.params.id).then((response) => {
            this.setState({
                user: response.data
            });
        });

        getNotesByAuthorId(this.props.computedMatch.params.id).then((userNotes) => {
            this.setState({
                notes: userNotes
            });
        })
    }

    onDelete = (id) => {
        deleteNote(id).then(() => {
            const allNotes = this.state.notes;
            const newNotes = allNotes.filter(note => note.id !== id);
            this.setState({
                notes: newNotes
            });
        })
    };

    render() {
        return (
            <div className="single-user">
                <UserCard user={this.state.user} />
                 { this.state.notes.map(note => < NoteCard note={note} key={note.id} onDeleteClick={this.onDelete} /> )}
            </div>
        )
    }
}*/