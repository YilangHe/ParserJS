const { Tokenizer } = require("./Tokenizer");

class Parser {

    constructor() {
        this._string = '';
        this._tokenizer = new Tokenizer();
    }

    parse(string) {
        this._string = string
        this._tokenizer.init(string);

        this._lookahead = this._tokenizer.getNextToken();

        return this.Program();
    }

    // Main entry point
    Program() {
        return {
            type: 'Program', 
            body: this.Literal(),
        };
    }

    /**
     * 
     */
    Literal() {
        switch(this._lookahead.type) {
            case 'NUMBER':
                return this.NumericLiteral();
            case 'STRING':
                return this.StringLiteral();
        }
        throw new SyntaxError(`Literal: Unexpected literal production`);
    }

    /**
     * NumericLiteral
     *  : NUMBER
     * 
     * 
     * @returns 
     */
    NumericLiteral() {
        const token = this._eat('NUMBER');
        return {
            type: 'NumericLiteral',
            value: Number(token.value)
        };
    }

    StringLiteral() {
        const token = this._eat('STRING');
        return {
            type: 'StringLiteral',
            value: token.value.slice(1, -1), // actual val without ""
        };
    }

    _eat(tokenType) {
        const token = this._lookahead;
        if(token == null) {
            throw new SyntaxError(
                `Unexpected end of input, expected: ${tokenType}`,
            );
        }
        
        else if(token.type != tokenType) {
            throw new SyntaxError(
                `Unexpected token ${token.value}, expected: ${tokenType}`,
            );
        }

        this._lookahead = this._tokenizer.getNextToken();

        return token;
    }
}

module.exports = {
    Parser, 
};