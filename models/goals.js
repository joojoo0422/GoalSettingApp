/* Goal mongoose model */

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
	},
	comments: {
		type: Array
	},
	kudos: {
		type: Number,
		default: 0
	},
	ratings: {
		type: Number,
		default: 0
	},
	progress: {
		type: Number,
		default: 0
	},
	flagged: {
		type: Boolean,
		default: false
	},
	creator: {
		type: String
	}

	// ** ADD ATTRIBUTE HERE **
	// if attribute is updated, you must also update attributes in:
	// // client/src/actions/goalActions.js: addGoalJSON() -> new Request in line 22
	// // server.js: post "/goals" call -> new Goal in line 286
})

const Goal = mongoose.model('Goal', GoalSchema)

module.exports = { Goal }
