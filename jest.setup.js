import { TextEncoder, TextDecoder } from 'util';

// To eliminate the error when unit testing: ReferenceError: TextEncoder is not defined
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;