'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Member = mongoose.model('User'),
	_ = require('lodash');

/**
 * Create a member
 */
exports.create = function(req, res) {
	var member = new Member(req.body);
	member.user = req.user;

	member.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(member);
		}
	});
};

/**
 * Show the current member
 */
exports.read = function(req, res) {
	res.json(req.member);
};

/**
 * Update a member
 */
exports.update = function(req, res) {
	var member = req.member;

	member = _.extend(member, req.body);

	member.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(member);
		}
	});
};

/**
 * Delete an member
 */
exports.delete = function(req, res) {
	var member = req.member;

	member.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(member);
		}
	});
};

/**
 * List of members
 */
exports.list = function(req, res) {
	Member.find().sort('-created').populate('user', 'displayName').exec(function(err, members) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(members);
		}
	});
};

/**
 * Member middleware
 */
exports.memberByID = function(req, res, next, id) {
	Member.findById(id).populate('user', 'displayName').exec(function(err, member) {
		if (err) return next(err);
		if (!member) return next(new Error('Failed to load member ' + id));
		req.member = member;
		next();
	});
};

/**
 * Member authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.member.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};

/**
 * Member import middleware
 */
exports.import = function(req, res, next) {
	
	res.json({'msg':'da'});
};
