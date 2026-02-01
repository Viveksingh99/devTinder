const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database");
const app = express();

const User = require("./modals/user");

// Connect to MongoDB
connectDB()
// order of Router are important

const PORT = process.env.PORT || 8080;
app.use(express.json());

app.use(express.json());


// signup api 
app.post("/signup", async (req, res) => {
  try {
    const newUser = new User(req.body);
    // const newUser = new User({
    //   firstName: "madhaw",
    //   lastName: "singh",
    //   email: "madhaw@gmail.com",
    //   password: "madhaw123",
    //   age: 3,
    //   gender: "male"
    // });

    const savedUser = await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      user: savedUser
    });
  } catch (error) {
  console.log("Signup error:", error);
  res.status(500).json({
    error: "Error creating user",
    details: error.message
  });
}

});

// feed api 
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log("Fetch users error:", error);
    res.status(500).json({
      error: "Error fetching users",
      details: error.message
    });
  }} );

  // fing user with email 
  app.get("/email", async (req, res) => {
  try {
    const email = req.body.email;

    console.log("Email received:", email);

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email }).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("Get user error:", error);
    res.status(500).json({
      error: "Error fetching user",
      details: error.message
    });
  }
});

// delete the data from db
app.delete("/user", async (req, res) => {
  try {
    const email = req.body.email;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      user: deletedUser
    });
  } catch (error) {
    console.log("Delete user error:", error);
    res.status(500).json({
      error: "Error deleting user",
      details: error.message
    });
  }
});

// update the data 

app.patch("/user", async (req, res) => {
  console.log(req.body, 'fff')
  try {
    const { email, ...updateData } = req.body;

    if (!email) {
      return res.status(400).json({ error: "_id is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      email,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      error: "Error updating user",
      details: error.message
    });
  }
});




// app.use('/vivek', (req, res) => {
//   res.send("Hello, vivek!");
// });

// app.use('/vivek/:id', (req, res) => {
//   const userId = req.params.id;
//   res.send(`Hello again, vivek with id ${userId}!`);
// });

// app.use('/user', (req, res) => {
//   res.send("Hello, hritik!");
// });
// app.use('/', (req, res, next) => {
//   res.send("Hello, world!");
//   next();
// });
// app.get("/test", (req, res) => {
//   res.send("Hello, test!");
// });

// app.get("/", (req, res) => {
//   res.send("Hello, Express!");
// });

// b is optional
// app.get("/ab?c", (req, res) => {
//   res.send("Welcome to the Home Page!");
// });
// app.get("/a(ab)?c", (req, res) => {
//   res.send("Matched!");
// });
// app.get("/a+bc", (req, res) => {
//   res.send("Matched!");
// });
// app.get("/a*bc", (req, res) => {
//   res.send("Matched!");
// });
// app.get("/user(s)?", (req, res) => {
//   res.send("Users route");
// });
// app.get("/file*", (req, res) => {
//   res.send("File route");
// });
// app.get(/^\/a(ab)?c$/, (req, res) => {
//   res.send("Regex matched!");
// });

// app.get("/api/v1", (req, res) => {
//   res.send("Hello, API v1!");
// });

// app.get("/user", (req, res) => {
//   res.send({firstName: "Vivek", lastName: "singh", age: 24, gender: "male", email: "vivek.singh@example.com", password: "password123", id: "1"});
// });

// app.get("/user/:id", (req, res) => {
//   const userId = req.params.id;
//   res.send({firstName: "Hritik", lastName: "singh", age: 18, gender: "male", email: "hritik.singh@example.com", id: userId});
// });

// app.post("/create", (req, res) => {
//   res.send({message: "User created successfully!"});
// });

// app.put("/update/:id", (req, res) => {
//   const userId = req.params.id;
//   res.send({message: `User with id ${userId} updated successfully!`});
// });

// app.delete("/delete/:id", (req, res) => {
//   const userId = req.params.id;
//   res.send({message: `User with id ${userId} deleted successfully!`});
// });

// app.use('/userData', (req, res, next) => {
//   // res.send("user data not found");
//   next();
// }, (req, res, next) => {
//   // res.send({firstName: "Default", lastName: "User1", age: 0, gender: "unknown", email: "default@example.com"});
//   next();
// }, (req, res, next) => {
//   res.send({firstName: "Default", lastName: "User2", age: 0, gender: "unknown", email: "default@example.com"});
//   next();
// }, (req, res, next) => {
//   res.send({firstName: "Default", lastName: "User3", age: 0, gender: "unknown", email: "default@example.com"});
//   next();
// });

  // when we call next() multiple times in a single route, only the first response is sent to the client. Subsequent calls to next() do not send additional responses, as the response has already been finalized.

//   app.use('/name', (req, res, next) => {
//     // res.send("404 Not Found!");
//     next();
//   });

// app.use('/name', (req, res, next) => {
//   res.send("Vivek Singh");
// }); 

// app.use('/admin', (req, res) => {
//   const auth = 'secret123'; // Example authentication check
//   if (auth === "secret123") {
//     res.send("Welcome, Admin!");
//   } else {
//     res.status(401).send("Unauthorized: Invalid credentials");
//   }
// }
// );

// const userAuth = require("./middleware/auth");
// app.use('/admin', userAuth, (req, res) => { 
//   res.send("Welcome, Admin!");
// }
// );  

// app.use('/dashboard', userAuth, (req, res) => {
//   res.send("Welcome to your Dashboard!");
// }
// );

// // error handling middleware
// app.use('/dashboard', (err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// app.get("/testError", (req, res, next) => {
//   try {
//     throw new Error("Something broke");
//   } catch (err) {
//     next(err);
//   }
// });



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
