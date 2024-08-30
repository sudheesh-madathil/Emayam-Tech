const Task = require("../model/Task.js");

exports.post = async (req, res) => {
  const { title, description } = req.body;
  console.log(req.body, "task request");

  try {
    const newTask = new Task({
      title,
      description
    });
    await newTask.save();
    
    // Sending a response after successfully saving the task
    res.status(201).json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get all task
exports.get = async (req, res) => {
    try {
      const tasks = await Task.find(); // Fetch all tasks
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
//delete task 
exports.delete = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedTask = await Task.findByIdAndDelete(id);
  
      if (!deletedTask) {
        return res.status(404).json({ message: " not found" });
      }
  
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  // edit
  exports.put = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body; // Include status in the request body
  console.log(req.body,"request");
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { title, description, status },  // Update status as well
        { new: true, runValidators: true } // Return the updated document and validate the update
      );

      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.status(200).json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  