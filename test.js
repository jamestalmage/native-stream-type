const assert = require('assert');
const dgram = require('dgram');
const net = require('net');
const isStream = require('is-stream');
const fn = require('.');

const test = (name, obj, expected) => {
	const type = fn(obj);
	assert(type === expected, `${name} should be a ${expected}, got ${type}`);
	if (expected !== 'udp') {
		assert(isStream(obj), `${name} should be a stream`);
	}
	console.log(`${name} is a ${type}`);
};

// STDIO
['stdin', 'stdout', 'stderr'].forEach(io => {
	test(io, process[io], 'tty');
});

// TCP SERVER CONNECTION
const tcpServer = net.createServer(tcpServerConnection => {
	setTimeout(() => {
		tcpServerConnection.end();
		tcpServer.unref();
	}, 0);
	test('tcpServerConnection', tcpServerConnection, 'tcp');
});

tcpServer.listen(41321);

// TCP CLIENT
const tcpClient = net.connect(41321);
test('tcpClient', tcpClient, 'tcp');

// UDP SOCKET
const udpSocket = dgram.createSocket('udp4');
test('udpSocket', udpSocket, 'udp');
