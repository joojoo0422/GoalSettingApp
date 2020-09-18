
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json());


const {mongoose} = require('./db/mongoose')
mongoose.set('useFindAndModify', false)

const bcrypt = require('bcryptjs')

const {User} = require('./models/users')
const {Goal} = require('./models/goals')

const {ObjectID}= require('mongodb')


const session = require('express-session');
const { json } = require('body-parser');
const log = console.log

function isMongoError(error){
	return error === 'object' && error !== null && error.name === "MongoNetworkError";
}


app.use(
    session({
        secret: "oursecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        }
    })
)

app.get('/loginAuth', (req, res) => {

    User.find().then((users)=>{
        if(!users){
            res.status(404)
        }else{
            res.send(users)
        }

    }).catch((error)=>{
        console.log(error)
        res.status(500).send("Internal server error.")
    })
})

app.post('/loginSession', (req, res) => {

    const username = req.body.username;

    User.findByUsername(username).then((user)=>{
        req.session.username = user.username;
        req.session.email = user.email;
        res.send({currentUser: req.session.username});
    })
    .catch((error)=>{
        res.status(400).send();
    })

})

app.post('/signup', (req, res)=>{

    if(mongoose.connection.readyState != 1){
		console.log("mongoose connection error");
		res.status(500).send("Internal server error");
		return;
	}

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash){
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash,
                profilePictureUrl: req.body.profilePictureUrl
            })
            req.session.username = req.body.username;
            req.session.email = req.body.email;

            user.save().then((result)=>{
                res.send(result)
            }).catch((error)=>{
                if(isMongoError(error)){
                    res.status(500).send("Internal server error")
                }else{
                    res.status(404).send("404 not found")
                }
            })
        })
    })

})


app.get('/check-session', (req, res)=>{

    if(req.session.username){
        res.send({currentUser: req.session.email})
    }else{
        res.status(401).send()
    }
})

//Route to log out and destroy the cookie
app.get('/logout', (req, res)=>{
    req.session.destroy(error => {
        if(error){
            res.status(500).send(error)
        }else{
            res.send()
        }
    })
})

/*** API Routes below ************************************/
/** User resource routes **/

// a PATCH route for changing properties of a resource.
app.patch("/users/:username", (req, res) => {
    const currUsername = req.params.username;

    const newGoal = {
        "title": req.body.title,
        "description": req.body.description,
        "duration": req.body.duration
    }

    User.find({ username: currUsername }).then((user) => {
        if (!user) {
            res.status(404).send('Resource not found')
        } else{
            user[0].goals.push(newGoal);
            user[0].save();
            res.send({ user }) // this returns a list with one user -> if need to access take the first index
        }
    }).catch((error) => {
        res.status(500).send(error) // server error
    })

});

// a GET route to get all users
app.get("/users", (req, res) => {
    User.find().then(
        users => {
            res.send({ users });
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

app.delete('/users/:username', (req, res) => {
		const targetUser = req.params.username;

		if (mongoose.connection.readyState != 1) {
				log('Issue with mongoose connection')
				res.status(500).send('Internal server error')
				return;
		}

		User.deleteOne({ username: targetUser }).then(user => {
				if (!user) {
					res.status(404).send()
				} else {
					res.send(user)
				}
		})
		.catch((error) => {
				res.status(500).send()
		})
});

/** Goal resource routes **/
// a POST route to *create* a goal
app.post("/goals", (req, res) => {

    // Create a new student using the Goal mongoose model
    const goal = new Goal({
        title: req.body.title,
        description: req.body.description,
        duration: req.body.duration,
        comments: req.body.comments,
        kudos: req.body.kudos,
        // ** ADD ATTRIBUTE HERE **
		flagged: req.body.flagged,
        creator: req.body.creator
    });

    // Save goal to the database
    goal.save().then(
        result => {
            res.send(result);
        },
        error => {
            res.status(400).send(error); // 400 for bad request
        }
    );
});

// a GET route to get all students
app.get("/goals", (req, res) => {
    Goal.find().then(
        goals => {
            res.send({ goals });
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

app.delete('/goals/:id', (req, res) => {
		const id = req.params.id;

		if (!ObjectID.isValid(id)) {
			res.status(404).send('Resource not found')
			return;
		}

		if (mongoose.connection.readyState != 1) {
				log('Issue with mongoose connection')
				res.status(500).send('Internal server error')
				return;
		}

		Goal.findByIdAndRemove(id).then(goal => {
				if (!goal) {
					res.status(404).send()
				} else {
					res.send(goal)
				}
		})
		.catch((error) => {
				res.status(500).send()
		})
});

app.patch('/goals/:id', (req, res) => {
		const id = req.params.id

		if (!ObjectID.isValid(id)) {
			res.status(404).send('Resource not found')
			return;
		}

		if (mongoose.connection.readyState != 1) {
				log('Issue with mongoose connection')
				res.status(500).send('Internal server error')
				return;
		}

		Goal.findByIdAndUpdate(id, { flagged: true }).then((goal) => {
			if (!goal) {
				res.status(404).send('Resource not found')
			} else {
				res.send(goal)
			}
		}).catch((error) => {
			if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
				res.status(500).send('Internal server error')
			} else {
				log(error)
				res.status(400).send('Bad Request') // bad request for changing the student.
			}
		})
});

app.post('/add-comment/:goalTitle', (req, res) => {

    const goal = req.params.goalTitle;
    Goal.findOneAndUpdate({"title": goal}, {"$push": {"comments": req.body.comment}}, {new: true, useFindAndModify: false}).then((result)=>{
        if(!result){
            res.status(404).send("404 not found")
        }else{
            res.send(result)
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).send("Internal server error")
    })


})

app.post('/add-kudos/:goalTitle', (req, res) => {

    const goal = req.params.goalTitle;
    Goal.findOneAndUpdate({"title": goal}, {$inc :{"kudos": 1}}, {new: true, useFindAndModify: false}).then((result)=>{
        if(!result){
            res.status(404).send("404 not found")
        }else{
            res.send(result)
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).send("Internal server error")
    })

})

app.post('/add-ratings/:goalTitle', (req, res) => {

    const goal = req.params.goalTitle;
    Goal.findOneAndUpdate({"title": goal}, {"ratings": req.body.ratings}, {new: true, useFindAndModify: false}).then((result)=>{
        if(!result){
            res.status(404).send("404 not found")
        }else{
            res.send(result)
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).send("Internal server error")
    })

})

app.post('/add-progress/:goalTitle', (req, res) => {

    const goal = req.params.goalTitle;
    Goal.findOneAndUpdate({"title": goal}, {$inc : {"progress": 1}}, {new: true, useFindAndModify: false}).then((result)=>{
        if(!result){
            res.status(404).send("404 not found")
        }else{
            res.send(result)
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).send("Internal server error")
    })

})

app.get('/get-goal-detail/:goalTitle', (req, res) => {
    const goal = req.params.goalTitle;
    Goal.findOne({"title": goal}).then(result => {
        if(!result){
            res.status(404).send("404 not found")
        }else{
            res.send(result)
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).send("Internal server error")
    })
})

/** Profile resource routes **/

app.get("/profile/:username", (req, res) => {

    const usernameToFind = req.params.username
    log("grabbing a profile")

    User.findOne({username: usernameToFind}).then((user) => {
        if(!user){
            res.status(404).send('404 resource not found')
        } else {
            res.send(user)
        }
    })

})

app.get("/profile/friends/:username", (req, res) => {

    const usernameToFind = req.params.username

    User.findOne({username: usernameToFind}).then((user) => {
        if(!user){
            res.status(404).send('404 resource not found')
        } else {
            // res.send(user.friends)
            User.find(
                { 'username': {$in: user.friends} }
            ).then((friendsProfiles) => {
                if(!friendsProfiles)
                {
                    res.status(404).send('404 resource not found')
                }
                else
                {
                    res.send(friendsProfiles)
                }
            })
        }
    })

})

app.get("/profiles", (req, res) => {


    User.find({}).then((users) => {
        log(users)
        if(!users){
            res.status(404).send('404 resource not found')
        } else {
            res.send(users)
        }
    })

})

app.get("/profile/goals/:username", (req, res) => {

    const usernameToFind = req.params.username

    User.findOne({username: usernameToFind}).then((user) => {
        if(!user){
            res.status(404).send('404 resource not found')
        } else {
            res.send(user.goals)
        }
    })

})

app.post("/profile/addGoal/:username", (req, res) => {

    const usernameToFind = req.params.username

    const goal = new Goal({
        title: req.body.title,
        description: req.body.description,
        duration: req.body.duration
    })

    User.findOneAndUpdate(
        { username: usernameToFind },
        { $push: { goals: goal } },
        { new:true, useFindAndModify: false },
    ).then((result) => {
        if(!result) {
            res.status(404).send('404 resource not found')
        }
        else
        {
            res.send(result)
        }
    }).catch((error) => {
        res.status(500).send("internal server error")
    })

})

app.post("/profile/addFriend/:username/:userToAdd", (req, res) => {

    const usernameToFind = req.params.username
    const userToAdd = req.params.userToAdd

    log(usernameToFind)
    log(userToAdd)

    const newFriend = {
        username: userToAdd
    }

    User.findOneAndUpdate(
        { username: usernameToFind },
        { $push: { friends: userToAdd } },
        { new:true, useFindAndModify: false },
    ).then((result) => {
        log(result)
        if(!result) {
            res.status(404).send('404 resource not found')
        }
        else
        {
            res.send(result)
        }
    }).catch((error) => {
        res.status(500).send("internal server error")
    })

})




app.delete("/profile/removeFriend/:username/:userToRemove", (req, res) => {

    const usernameToFind = req.params.username
    const userToRemove = req.params.userToRemove

    log(usernameToFind)
    log(userToRemove)

    const newFriend = {
        username: userToRemove
    }

    User.findOneAndUpdate(
        { username: usernameToFind },
        { $pull: { friends: userToRemove } },
        { new:true, useFindAndModify: false },
    ).then((result) => {
        log(result)
        if(!result) {
            res.status(404).send('404 resource not found')
        }
        else
        {
            res.send(result)
        }
    }).catch((error) => {
        res.status(500).send("internal server error")
    })

})

app.post("/profile/updateEmail/:username", (req, res) => {

    const usernameToFind = req.params.username
    const newEmail = req.body.newEmail

    log(usernameToFind)
    log(newEmail)


    User.findOneAndUpdate(
        { username: usernameToFind },
        { $set: {email: newEmail} },
        { new:true, useFindAndModify: false },
    ).then((result) => {
        log(result)
        if(!result) {
            res.status(404).send('404 resource not found')
        }
        else
        {
            res.send(result)
        }
    }).catch((error) => {
        res.status(500).send("internal server error")
    })

})

app.post("/profile/updateProfilePicture/:username", (req, res) => {

    const usernameToFind = req.params.username
    const newProfilePictureUrl = req.body.newProfilePictureUrl

    log(usernameToFind)
    log(newProfilePictureUrl)


    User.findOneAndUpdate(
        { username: usernameToFind },
        { $set: {profilePictureUrl: newProfilePictureUrl} },
        { new:true, useFindAndModify: false },
    ).then((result) => {
        log(result)
        if(!result) {
            res.status(404).send('404 resource not found')
        }
        else
        {
            res.send(result)
        }
    }).catch((error) => {
        res.status(500).send("internal server error")
    })

})
/*** API Routes ************************************/

const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})

app.use(express.static(__dirname+'/client/build'))

app.get("*", (req, res)=>{
    res.sendFile(__dirname + '/client/build/index.html')
})
