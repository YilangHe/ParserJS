class Parser {
    parse(string) {
        this._string = string
        return this.Program();
    }

    // Main entry point
    Program() {
        return {
            type: 'Program', 
            body: this.NumericLiteral(),
        };
    }

    /**
     * NumericLiteral
     *  : NUMBER
     * 
     * 
     * @returns 
     */
    NumericLiteral() {
        return {
            type: 'NumericLiteral',
            value: Number(this._string)
        };
    }
}

module.exports = {
    Parser, 
};