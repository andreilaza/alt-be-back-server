'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Event Schema
	title
	image
	start date
	end date
	description
	attending
	checkins
	status
	qrcode
	repeat (daily weekly)
	location
	points
	posts
	comments

 */
var EventSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		trim: true,
		required: 'Title cannot be blank'
	},
	description: {
		type: String,
		trim: true,
		required: 'Description cannot be blank'
	},
	image: {
		type: String,
		trim: true,
		required: 'Image cannot be blank'
	},
	startDate: {
		type: Date,
		required: 'Start Date cannot be blank'
	},
	endDate: {
		type: Date,
		required: 'Start Date cannot be blank'
	},
	attending: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    checkins: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    active: {
    	type: Boolean,
    	default: true
    },
    qrCode: {
    	type: String,
    	default: ''
    },
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	repeat: {
		type: String,
		default: ''
	},
	location: {
		type: String,
		default: ''
	},
	points: {
		type: Number,
		required: 'Points cannot be blank'
	},
	posts: {
		type: Schema.ObjectId,
		ref: 'Post'
	}
});

mongoose.model('Event', EventSchema);