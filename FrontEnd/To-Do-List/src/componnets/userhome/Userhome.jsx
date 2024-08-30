import "./UserHome.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const Userhome = () => {
    const navigate = useNavigate()
    const {userId} = useParams()
    console.log(userId,"idlllll");
const [userprofile,setuserprofile]= useState({})
console.log(userprofile,"userprofile");
  const [tasks, setTasks] = useState([]); // List of tasks
  const [title, setTitle] = useState(""); // Title of task
  const [description, setDescription] = useState(""); // Description of task
  const [status, setStatus] = useState(""); // Status of task
  const [editMode, setEditMode] = useState(false); // Determines if we're editing
  const [currentTaskId, setCurrentTaskId] = useState(null); // The task ID currently being edited

  // Fetch tasks from the backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/usertask")
      .then((response) => {
        setTasks(response.data); // Set the tasks state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });


      axios
      .get(`http://localhost:3000/userRegister/${userId}`)
      .then((response) => {
      setuserprofile(response.data); // Set the tasks state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  },
  
  
  
  [userId]);

  // Add a new task
  const addTask = async () => {
    if (!title || !description) {
      alert("Fill the box");
      return;
    }
    const newTask = { title, description, status: "Pending" }; // Default status as 'Pending'

    try {
      const res = await axios.post("http://localhost:3000/usertask", newTask);
      setTasks([...tasks, res.data.task]); // Assuming the response contains the created task in res.data.task
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Delete a task by ID
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/usertask/${id}`);
      setTasks(tasks.filter((task) => task._id !== id)); // Remove the task from state
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Enter edit mode for a task
  const enterEditMode = (task) => {
    setEditMode(true);
    setCurrentTaskId(task._id); // Set the current task ID to be edited
    setTitle(task.title); // Pre-fill the input fields with the task's current data
    setDescription(task.description);
    setStatus(task.status); // Set the status of the task being edited
  };

  // Update a task by ID
  const updateTask = async () => {
    const updatedTask = { title, description, status }; // Updated task object

    try {
      const res = await axios.put(
        `http://localhost:3000/usertask/${currentTaskId}`,
        updatedTask
      );
      setTasks(
        tasks.map((task) => (task._id === currentTaskId ? res.data.task : task))
      );
      setEditMode(false); // Exit edit mode
      setCurrentTaskId(null);
      setTitle("");
      setDescription("");
      setStatus("");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const userlogout =()=>{
    navigate("/")

  }

  return (
    <>
      <div className="userhomemain">
        <div className="userprofile">
          <div className="userimg">

          </div>
          <div className="pofileIteam">
            <div className="pofileIteam1">

            {userprofile.user && userprofile.user.username}
            </div>
            <div className="pofileIteam1">
                profile
            </div>
          </div>

          <div className="userlogout">
            <button onClick={userlogout}>Log out</button>
          </div>
        </div>

        <div className="usertask">
          <h2>Task Management</h2>
          <div className="taskbar">
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
            />
            <input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
            />

            {/* Conditionally render 'Add Task' or 'Update Task' button */}
            {editMode ? (
              <button onClick={updateTask}>Update</button>
            ) : (
              <button onClick={addTask}>Add Task</button>
            )}
          </div>

          {/* Render the list of tasks */}
          <div className="addtask">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Edit Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task._id}>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.status}</td>
                    <td>
                      {/* Status dropdown for each task */}
                      <select
                        value={
                          task._id === currentTaskId ? status : task.status
                        } // Update status only for the current editing task
                        onChange={(e) => {
                          if (task._id === currentTaskId) setStatus(e.target.value); // Update status in state only if in edit mode
                        }}
                        disabled={task._id !== currentTaskId} // Disable the dropdown if not in edit mode for this task
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">in-progress</option>
                        <option value="completed">completed</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="delete"
                        onClick={() => deleteTask(task._id)}
                      >
                        <MdDeleteOutline size={24} />
                      </button>
                      <button
                        className="edit"
                        onClick={() => enterEditMode(task)}
                      >
                        <FaRegEdit size={24} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export { Userhome };
