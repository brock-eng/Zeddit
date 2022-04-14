"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugError = exports.DebugInfo = exports.__prod__ = void 0;
exports.__prod__ = (process.env.NODE_ENV === 'production');
const DebugInfo = (msg) => {
    if (!exports.__prod__)
        console.log('\u001b[' + 32 + 'm' + '[Info] ' + msg + '\u001b[0m');
};
exports.DebugInfo = DebugInfo;
const DebugError = (msg) => {
    if (!exports.__prod__)
        console.log('\u001b[' + 31 + 'm' + '[Error] ' + msg + '\u001b[0m');
};
exports.DebugError = DebugError;
//# sourceMappingURL=constants.js.map