const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userdata = require("./Models/userdata.js");
const message = require("./Models/message.js");
const Drive = require("./Models/drivedetail.js")
const Resource=require("./Models/Resouce.js")
const TpoEvent = require("./Models/TpoEvent.js")
const Attendence = require("./Models/Attendence.js")

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Database is connected"))
  .catch((error) => console.log("Error occurred:", error));

app.use(cors({
    origin: "*", 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));



// Middlewares
app.use(cors({
    origin: ['http://localhost:5173', 'https://evolve-traning-and-placement-system.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); 

// POST: User Registration
app.post("/api/register", async (req, res) => {
    try {
        const { username, password, email, classemail, tpoemail, accesstype } = req.body;

        
        const exist = await userdata.findOne({ email });
        if (exist) {
            return res.status(400).json({ status: "404", message: "User already exists" });
        }      

        const newuser = new userdata({
            username,
            password,
            email,
            classemail,
            tpoemail,
            accesstype
        });

        await newuser.save();
        res.status(201).json({ status: 200, message: "User registered successfully", userId: newuser._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
});

app.get("/api/login", async (req, res) => {
    try {
        const response = await userdata.find();
        if (response.length === 0) {
            return res.status(404).json({ status: "404", message: "No users found" });
        }
        res.status(200).json(response);
    } catch (err) {
        console.log("Error occurred in /api/login route:", err);
        res.status(500).json({ status: "500", message: "Internal Server Error" });
    }
});

app.patch("/api/accounts/:_id", async (req,res)=>{
   try{
    const userId = req.params._id;
    const data = req.body;
    const user = await userdata.findByIdAndUpdate(userId,data,{new:"true"});
    if(!user){
        res.json({status:"404",message:"Not found to update"})
    }
   res.json({status:"200",message:"Updated successfulyy"})
   }
   catch(error){
        console.log("error occured");
        res.json({status:"500"})
   }
})

app.get("/api/tpo/getdata/:email",async (req,res)=>{
    try{
        const mail = req.params.email;
        const response = await userdata.find({tpoemail:mail , accesstype:"Class Teacher"})    
        res.status(200).json(response)
    }
    catch(Error){
        res.json({status:"404"})
    }
})

app.get("/api/tpo/getdata/student/:email",async (req,res)=>{
    try{
        const mail = req.params.email;
        const response = await userdata.find({classemail:mail , accesstype:"Student"})  
        res.json(response)
    }
    catch(Error){
        res.json({status:"404"})
    }
})


app.get("/api/tpo/getdata/student/profile/:email",async (req,res)=>{
    try{
        const mail = req.params.email;
        const response = await userdata.find({email:mail , accesstype:"Student"})  
        res.json(response)
    }
    catch(Error){
        res.json({status:"404"})
    }
})

app.patch("/api/message/:_id",async (req,res)=>{
    console.log("ali");
    
    try{
        const userId = req.params._id;
        const data = req.body;
        const user = await message.findByIdAndUpdate(userId,data,{new:"true"});
        if(!user){
            res.json({status:"404",message:"Not found to update"})
        }
       res.json({status:"200",message:"Updated successfulyy"})
       }
       catch(error){
            console.log("error occured");
            res.json({status:"500"})
       }
})

app.post("/api/message",async (req,res)=>{
    try{        
        const {sender,receiver,msg} = req.body;
    const newmsg = new message({
        sender,
        receiver,
        msg,
        read : false,
    })
    await newmsg.save()
    res.json({status:"200",id:newmsg._id})
    }
    catch(err){
        res.json({status:"500"})
    }
})

app.get("/api/message/get/:email", async (req, res) => {
    try {
        const mail = req.params.email;
        console.log("Fetching messages for:", mail);
        const response = await message.find({ receiver: mail, read: false });
        console.log("Messages found:", response);

        // Return an empty array if no messages exist
        if (response.length === 0) {
            return res.status(200).json([]); 
        }

        res.status(200).json(response);
    } catch (err) {
        console.error("Error fetching messages:", err);
        res.status(500).json({ status: "500", message: "Internal Server Error" });
    }
});

app.get("/api/message/get/perticular/:useremail/:nextemail",async (req,res)=>{
    try {
        const { useremail, nextemail } = req.params;
        const response = await message.find({
        $or: [
            { sender: useremail, receiver: nextemail },
            { sender: nextemail, receiver: useremail }
        ]
        });
        console.log(response);
        res.json(response)
    }
    catch(er){
        res.json({status:"500"});
    }
})

app.get("/api/drivedata", async (req, res) => {
    try {
        const data = await Drive.find();  // Use await, not async
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "500", error: "Internal Server Error" });
    }
});

app.put("/api/drivedata/:id", async (req, res) => {
    try {
      const updatedDrive = await Drive.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true } // return updated doc
      );
      if (!updatedDrive) {
        return res.status(404).json({ message: "Drive not found" });
      }
      res.json(updatedDrive);
    } catch (err) {
      console.error("Error updating drive:", err);
      res.status(500).json({ message: "Server Error" });
    }
  });

  app.post('/api/drivedata', async (req, res) => {
    try {
      const {
        companyName,
        jobRole,
        salaryPackage,
        driveDate,
        eligibilityCriteria,
        description,
        registrationLink,
        status
      } = req.body;
  
      // Create a new drive object manually
      const newDrive = new Drive({
        companyName,
        jobRole,
        salaryPackage,
        driveDate,
        eligibilityCriteria,
        description,
        registrationLink,
        status
      });
  
      // Save to database
      await newDrive.save();
      res.status(201).json({ message: 'Drive added successfully', drive: newDrive });
  
    } catch (err) {
      console.error("Error in POST /drivedata:", err);
      res.status(400).json({
        error: "Failed to add drive. Check data format.",
        details: err.message
      });
    }
  });

 app.get('/api/resouces', async (req, res) => {
    try {
      const resources = await Resource.find();
      res.json(resources);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });
  
  app.post('/api/resouces', async (req, res) => {
    try {
      const newRes = new Resource(req.body);
      const saved = await newRes.save();
      res.json(saved);
    } catch (err) {
      res.status(400).json({ error: "Invalid input", details: err.message });
    }
  });

app.put('/api/resouces/:id', async (req, res) => {
    try {
      const updated = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: "Update failed", details: err.message });
    }
  });
  
  app.get('/api/tpoevents', async (req, res) => {
    try {
      const events = await TpoEvent.find();
      res.json(events);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  app.post('/api/tpoevents', async (req, res) => {
    try {
      const newEvent = new TpoEvent(req.body);
      const savedEvent = await newEvent.save();
      res.status(201).json(savedEvent);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  app.put('/api/tpoevents/:id', async (req, res) => {
    try {
      const updatedEvent = await TpoEvent.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedEvent);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  app.delete('/:id', async (req, res) => {
    try {
      await TpoEvent.findByIdAndDelete(req.params.id);
      res.json({ message: "Event deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  app.post("/api/attendance", async (req, res) => {
    const { userEmail, eventId, eventName, views, feedback, suggestion, markedAt } = req.body;
  
    try {
      const attendance1 = new Attendence({
        userEmail,
        eventId,
        eventName,
        views,
        feedback,
        suggestion,
        markedAt
      });
  
      await attendance1.save();
      res.status(201).json({ message: "Attendance marked successfully" });
    } catch (error) {
      console.error("Error saving attendance:", error);
  
      if (error.code === 11000) {
        res.status(400).json({ message: "Attendance already marked for this event" });
      } else {
        res.status(500).json({ message: "Failed to mark attendance" });
      }
    }
  });

  app.get('/api/classteacher/getdata/students/:email', async (req, res) => {
    console.log("ali");
    const {email} = req.params;
    console.log(email);
    
    try {
      const students = await userdata.find({ classemail: req.params.email });
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch students.' });
    }
  });
  
  // GET profile of a specific student
  app.get('/api/classteacher/getdata/student/profile/:email', async (req, res) => {
    try {
      const student = await userdata.find({ email: req.params.email });
      res.json(student);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch student profile.' });
    }
  });

  app.get('/api/attendance/all', async (req, res) => {
    try {
      const records = await Attendance.find().sort({ markedAt: -1 });
      res.json(records);
    } catch (err) {
      res.status(500).json({ error: 'Server error while fetching attendance' });
    }
  });

app.listen(port, () => {
    console.log("Server is working on port " + port);
});
