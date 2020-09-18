/* User mongoose model */

const mongoose = require('mongoose')

const GoalSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minlegth: 1
	},
	description: {
		type: String,
		required: true,
		minlegth: 1
	},
	duration: {
		type: Number,
		required: true
	}
})

// const FriendSchema = new mongoose.Schema({
// 	username: {
// 		type: String,
// 		required: true
// 	}
// })

const UserSchema = new mongoose.Schema({
	
	username: {
		type: String,
		required: true,
		minlegth: 3
	},
	email: {
		type: String,
		required: true,
		minlegth: 3
	},
	password: {
		type: String,
		required: true,
		minlength: 8
	},
    profilePictureUrl: {
        type: String,
        required: false
    },
	goals: {
		type: [GoalSchema]
	},
	friends: {
		type: []
	}
})

UserSchema.statics.findByUsername = function(username){

	const currentUser = this;
	return currentUser.findOne({username: username}).then((user)=>{
		return new Promise((resolve, reject)=>{
			if(user){
				resolve(user);
			}else{
				reject();
			}
		})
	})

}

const User = mongoose.model('User', UserSchema)

module.exports = { User }
