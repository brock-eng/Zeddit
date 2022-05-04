export const __prod__ = (process.env.NODE_ENV === 'production');

export const DebugInfo = (msg: String) =>
{
    if (!__prod__)
        console.log('\u001b[' + 32 + 'm' + '[Info] ' + msg + '\u001b[0m');
}

export const DebugError = (msg: String) =>
{
    if (!__prod__)
        console.log('\u001b[' + 31 + 'm' + '[Error] ' + msg + '\u001b[0m');
}