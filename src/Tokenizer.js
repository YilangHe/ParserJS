// Tokenizer Spec
const Spec = [
    // space
    [/^\s+/, null],
    // skip single line comment
    [/^\/\/.*/, null],

    [/^\d+/, 'NUMBER'],
    [/^"[^"]*"/, 'STRING'],
];


class Tokenizer {
    init(string) {
        this._string = string;
        this._cursor = 0;
    }

    isEOF() {
        return this._cursor == this._string.length;
    }

    hasMoreTokens() {
        return this._cursor < this._string.length;
    }

    getNextToken() {
        if(!this.hasMoreTokens()) {
            return null;
        }

        const string = this._string.slice(this._cursor);

        for (const [regexp, tokenType] of Spec) {
            const tokenValue = this._match(regexp, string);
            if(tokenValue == null) {
                continue;
            }

            // skip whitespace
            if(tokenType == null) {
                return this.getNextToken();
            }

            return {
                type: tokenType,
                value: tokenValue,
            };
        }

        throw new SyntaxError(`Unexpected token: "${string[0]}"`)
    }

    _match(regexp, str) {
        let matched = regexp.exec(str)
        if(matched !== null) {
            this._cursor += matched[0].length;
            return matched[0];
        }
        return null;
    }
}

module.exports = {
    Tokenizer,
}