/*
*   All code owned by Ruchir Bapat, Copyright 2016, All Rights Reserved
*   The code is licensed under: Apache 2.0
*/

var date = new Date();
var Time = {
	frames_passed: 0,
	seconds: 0,
	delta: 0,
	time: 0,
	fps: 0,
	last_frame: 0,
	current_frame: 0,
    
	Update: function() {
		Time.current_frame = date.getTime();
		Time.delta = Time.current_frame - Time.last_frame;

		//Update time
		Time.time = date.getTime();

		//Find FPS
		Time.fps = 1 / Time.delta;

		//Done
		Time.frames_passed++;
		Time.seconds += Time.delta;
		Time.last_frame = Time.current_frame;
	},

	GetCurrentFrame: function() { return Time.current_frame; },
	GetFramesPassed: function() { return Time.frames_passed; },
	GetLastFrame: function() { return Time.last_frame; },
	GetSeconds: function() { return Time.seconds; },
	GetDelta: function() { return Time.delta; },
	GetTime: function() { return Time.time; },
	GetFPS: function() { return Time.fps; }
}