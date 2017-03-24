const PassThrough = require('stream').PassThrough;
const assert = require('assert');
const dgram = require('dgram');
const net = require('net');
const isStream = require('is-stream');
const fn = require('.');

const test = (name, obj, expected, checkStream) => {
	const type = fn(obj);
	assert(type === expected, `${name} should be ${expected}, got ${type}`);
	if (expected !== 'udp' && checkStream !== false) {
		assert(isStream(obj), `${name} should be stream`);
	}
	console.log(`${name} is ${type}`);
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

// PassThrough
test('PassThrough', new PassThrough(), false);

// Number
test('Number', 2, false, false);

// null
test('null', null, false, false);

// undefined
test('undefined', undefined, false, false);
