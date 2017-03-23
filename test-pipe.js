const assert = require('assert');
const isStream = require('is-stream');
const fn = require('.');

const type = fn(process.stdin);
assert(type === 'pipe', `expected stdin to be a 'pipe', got ${type}`);
assert(isStream(process.stdin), 'stdin should be a stream');
console.log('stdin is a pipe');
