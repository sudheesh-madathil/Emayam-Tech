import { useState, useEffect } from 'react';
import axios from 'axios';
import "./AdminHome.css";
import { useNavigate } from 'react-router-dom';

const Adminhome = () => {
    const navigate = useNavigate()

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showUserList, setShowUserList] = useState(false); // State to control user list display
    const [tasks, setTasks] = useState([]); // Renamed to 'tasks' for clarity
    const [showTaskList, setShowTaskList] = useState(false); // State to control task list display

    console.log(tasks, "all tasks");

    // Fetch users from backend API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/userRegister');

                // Correctly access the 'users' property of the response object
                if (Array.isArray(response.data.users)) {
                    setUsers(response.data.users); // Set the fetched users data
                } else {
                    console.error('Unexpected data format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers(); // Call the function to fetch users
    }, []);

    // Function to handle user click
    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    // Function to toggle the user list display
    const toggleUserList = () => {
        setShowUserList(!showUserList);
        setShowTaskList(false); // Hide task list when showing user list
    };

    // Function to delete a user
    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:3000/userRegister/${userId}`);
            // Update the user list after deletion
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // Function to fetch tasks
    const toggleUsertask = async () => {
        alert('Fetching user tasks...');
        try {
            const response = await axios.get('http://localhost:3000/usertask');
            setTasks(response.data); // Set the fetched task data
            setShowTaskList(true); // Show task list when fetched
            setShowUserList(false); // Hide user list when showing task list
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    // Function to delete a task
    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`http://localhost:3000/usertask/${taskId}`);
            // Update the task list after deletion
            setTasks(tasks.filter(task => task._id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const adminlogout =()=>{
        navigate("/")
    }

    return (
        <>
            <div className="adminmain">
                <div className="admindashbord">
                    <div className="adminimg">
                        {/* Image or other content */}
                    </div>
                    <div className="admilist">
                        <ul>
                            <li onClick={toggleUserList}>User List</li>
                            <li onClick={toggleUsertask}>Task</li>
                        </ul>
                        <button onClick={adminlogout}>logout</button>
                    </div>
                </div>
                <div className="adminIteam">
                    {/* Render user list table if showUserList is true */}
                    {showUserList ? (
                        <div>
                            <h2>User List</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user._id}>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                {/* Delete button */}
                                                <button onClick={() => deleteUser(user._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : showTaskList ? (
                        /* Render task list table if showTaskList is true */
                        <div>
                            <h2>Task List</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.map(task => (
                                        <tr key={task._id}>
                                            <td>{task.title}</td>
                                            <td>{task.description}</td>
                                            <td>{task.status}</td>
                                            <td>
                                                {/* Delete button */}
                                                <button onClick={() => deleteTask(task._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        /* Render user details if a user is selected */
                        selectedUser ? (
                            <div className='userdetails'>
                                <h2>{selectedUser.username}</h2>
                                <p>Email: {selectedUser.email}</p>
                                <p>Role: {selectedUser.role}</p>
                                <p>Username: {selectedUser.username}</p>
                            </div>
                        ) : (
                            <p>Select a user to see details</p>
                        )
                    )}
                </div>
            </div>
        </>
    );
};

export { Adminhome };
