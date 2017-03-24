'use strict';

const Pipe = process.binding('pipe_wrap').Pipe;
const TTY = process.binding('tty_wrap').TTY;
const TCP = process.binding('tcp_wrap').TCP;
const UDP = process.binding('udp_wrap').UDP;

function getHandleType(stream) {
	if (stream instanceof Pipe) {
		return 'pipe';
	}

	if (stream instanceof TTY) {
		return 'tty';
	}

	if (stream instanceof TCP) {
		return 'tcp';
	}

	if (stream instanceof UDP) {
		return 'udp';
	}

	return false;
}

function getHandle(stream) {
	if (!stream) {
		return false;
	}

	if (getHandleType(stream)) {
		return stream;
	}

	if (getHandleType(stream.handle)) {
		return stream.handle;
	}

	if (getHandleType(stream._handle)) {
		return stream._handle;
	}

	return false;
}

module.exports = function (stream) {
	const handle = getHandle(stream);

	return handle && getHandleType(handle);
};

module.exports.getHandle = getHandle;
module.exports.getHandleType = getHandleType;
