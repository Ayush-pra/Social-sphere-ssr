const express = require("express");
require('dotenv').config();
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("./models/user");
const postModel = require("./models/post");
const path = require("path");
const upload = require("./config/multerconfig");
const crypto = require("crypto");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/register", async (req, res) => {
    try {
        let { username, name, age, email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (user) return res.status(400).send("User Already Exist");

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                try {
                    let newUser = await userModel.create({
                        username,
                        name,
                        age,
                        email,
                        password: hash
                    });
                    let token = jwt.sign({ email, userid: newUser._id }, process.env.JWT_SECRET);
                    res.cookie("token", token);
                    res.redirect("/profile");
                } catch (innerErr) {
                    res.status(500).send("Error creating user");
                }
            });
        });
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/logout", (req, res) => {
    res.cookie("token", "");
    res.redirect("/login");
});

app.post("/login", async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (!user) return res.status(404).send("User not found");

        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                let token = jwt.sign({ email, userid: user._id }, process.env.JWT_SECRET);
                res.cookie("token", token);
                res.status(200).redirect("/profile");
            } else {
                res.redirect("/login");
            }
        });
    } catch (err) {
        res.status(500).send("Login failed");
    }
});

function isLoggedIn(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.redirect("/login");

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data;
        next();
    } catch (err) {
        return res.redirect("/login");
    }
}

app.get("/profile", isLoggedIn, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email }).populate("posts");
        res.render("profile", { user });
    } catch (err) {
        res.status(500).send("Error loading profile");
    }
});

app.post("/post", isLoggedIn, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        let post = await postModel.create({
            user: user._id,
            content: req.body.content
        });
        user.posts.push(post._id);
        await user.save();
        res.redirect("/profile");
    } catch (err) {
        res.status(500).send("Error creating post");
    }
});

app.get("/like/:id", isLoggedIn, async (req, res) => {
    try {
        let post = await postModel.findOne({ _id: req.params.id });
        if (post.likes.indexOf(req.user.userid) === -1) {
            post.likes.push(req.user.userid);
        } else {
            post.likes.splice(post.likes.indexOf(req.user.userid), 1);
        }
        await post.save();
        res.redirect("/profile");
    } catch (err) {
        res.status(500).send("Error liking post");
    }
});

app.get("/edit/:id", isLoggedIn, async (req, res) => {
    try {
        let post = await postModel.findOne({ _id: req.params.id }).populate("user");
        res.render("edit", { post });
    } catch (err) {
        res.status(500).send("Error loading edit page");
    }
});

app.post("/update/:id", isLoggedIn, async (req, res) => {
    try {
        await postModel.findOneAndUpdate({ _id: req.params.id }, { content: req.body.content });
        res.redirect("/profile");
    } catch (err) {
        res.status(500).send("Update failed");
    }
});

app.get("/delete/:id", isLoggedIn, async (req, res) => {
    try {
        await postModel.findOneAndDelete({ _id: req.params.id });
        res.redirect("/profile");
    } catch (err) {
        res.status(500).send("Delete failed");
    }
});

app.post("/upload", isLoggedIn, upload.single('image'), async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        user.profilepic = req.file.filename;
        await user.save();
        res.redirect("/profile");
    } catch (err) {
        res.status(500).send("Upload failed");
    }
});

app.get("/bio/:id", isLoggedIn, async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        res.render("bio", { user });
    } catch (err) {
        res.status(500).send("Error loading bio");
    }
});

app.post("/update/bio/:id", isLoggedIn, async (req, res) => {
    try {
        const { bioContent } = req.body;
        await userModel.findByIdAndUpdate(req.params.id, { bioContent });
        res.redirect("/profile");
    } catch (err) {
        res.status(500).send("Bio update failed");
    }
});

app.get("/search", isLoggedIn, async (req, res) => {
    try {
        const searchQuery = req.query.q;
        let users = [];
        if (searchQuery) {
            users = await userModel.find({
                $or: [
                    { username: { $regex: searchQuery, $options: 'i' } },
                    { name: { $regex: searchQuery, $options: 'i' } }
                ],
                _id: { $ne: req.user.userid }
            }).select('username name profilepic bioContent');
        }
        res.render("search", { users, searchQuery: searchQuery || '' });
    } catch (err) {
        res.status(500).send("Search failed");
    }
});

app.get("/user/:id", isLoggedIn, async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id).populate("posts");
        const currentUser = await userModel.findOne({ email: req.user.email });
        const isOwnProfile = user._id.toString() === currentUser._id.toString();
        res.render("userProfile", { user, isOwnProfile, currentUser });
    } catch (err) {
        res.status(500).send("Error loading user profile");
    }
});

app.listen(process.env.PORT || 3002);