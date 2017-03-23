# native-stream-type [![Build Status](https://travis-ci.org/jamestalmage/native-stream-type.svg?branch=master)](https://travis-ci.org/jamestalmage/native-stream-type)

> Find the native stream type, validate it for child_process use

The [`stdio` option in `child_process.spawn`](https://nodejs.org/dist/latest-v6.x/docs/api/child_process.html#child_process_options_stdio) allows only certain types of streams. You can use this module to determine if an object is an allowed stream type.

You can use this module to validate stream arguments before passing to `child_process`.


## Install

```
$ npm install --save native-stream-type
```


## Usage

```js
const nativeStreamType = require('native-stream-type');

nativeStreamType(process.stdin);
//=> 'tty'
```


## API

### nativeStreamType(obj)

Returns a `string` (`pipe` | `tty` | `tcp` | `udp`) if `obj` is one of the native backed stream implementations.
 
Returns `false` if `obj` is not one of the above native streams.

Note that `udp` sockets don't necessarily implement a stream interface (see "Notes" section below).

#### obj

Type: `Stream`

An object that might be a native stream implementation.


## Notes

This uses the undocumented `process.binding(...)`. At present, the Node team is avoiding deprecation, so it should be safe to use.

You are allowed to pass UDP sockets as a `stdio` option, even though they do not implement the stream interface. Thus, getting a truthy return value does not guarantee a stream. Passing a UDP socket will spawn without throwing an error, but I have yet to figure out how to actually transfer any data to the child process when using one. You may want to guard against non streams using [`is-stream`](https://github.com/sindresorhus/is-stream).

Implementation derived from Node internals [here](https://github.com/nodejs/node/blob/98e54b0bd4854bdb3e2949d1b6b20d6777fb7cde/lib/internal/child_process.js#L14-L18), [here](https://github.com/nodejs/node/blob/98e54b0bd4854bdb3e2949d1b6b20d6777fb7cde/lib/internal/child_process.js#L254-L261), and [here](https://github.com/nodejs/node/blob/98e54b0bd4854bdb3e2949d1b6b20d6777fb7cde/lib/internal/child_process.js#L846-L856).

## License

MIT © [James Talmage](http://github.com/jamestalmage)
