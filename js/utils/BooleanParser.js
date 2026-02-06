/**
 * BooleanParser.js
 * Parses boolean expressions into an Abstract Syntax Tree (AST)
 * Supports AND, OR, NOT operators, parentheses, quoted strings, and entity references
 * 
 * Usage:
 *   const parser = new BooleanParser();
 *   const result = parser.parse('(NVIDIA OR TSMC) AND NOT Intel');
 *   // result.ast contains the parsed tree
 *   // result.error contains any parsing error
 */

export class BooleanParser {
  constructor() {
    this.input = '';
    this.pos = 0;
  }

  /**
   * Parse a boolean expression string
   * @param {string} input - The boolean expression to parse
   * @returns {{ ast: Object|null, error: { message: string, position: number }|null }}
   */
  parse(input) {
    this.input = input;
    this.pos = 0;

    if (!input || !input.trim()) {
      return { ast: null, error: null };
    }

    try {
      const ast = this.parseExpression();
      this.skipWhitespace();
      
      if (this.pos < this.input.length) {
        throw this.createError(`Unexpected character: "${this.input[this.pos]}"`);
      }
      
      return { ast, error: null };
    } catch (e) {
      return { 
        ast: null, 
        error: { 
          message: e.message, 
          position: e.position ?? this.pos 
        } 
      };
    }
  }

  /**
   * Create an error with position information
   */
  createError(message) {
    const error = new Error(message);
    error.position = this.pos;
    return error;
  }

  skipWhitespace() {
    while (this.pos < this.input.length && /\s/.test(this.input[this.pos])) {
      this.pos++;
    }
  }

  /**
   * Check if we're at a keyword (AND, OR, NOT) with word boundaries
   */
  matchKeyword(keyword) {
    const remaining = this.input.slice(this.pos);
    const regex = new RegExp(`^${keyword}(?![a-zA-Z0-9_])`, 'i');
    return regex.test(remaining);
  }

  parseExpression() {
    return this.parseOr();
  }

  parseOr() {
    let left = this.parseAnd();
    
    while (true) {
      this.skipWhitespace();
      if (this.matchKeyword('OR')) {
        this.pos += 2;
        this.skipWhitespace();
        const right = this.parseAnd();
        // Flatten consecutive OR operations into a single node with children array
        left = left.type === 'OR'
          ? { type: 'OR', children: [...left.children, right] }
          : { type: 'OR', children: [left, right] };
      } else {
        break;
      }
    }
    
    return left;
  }

  parseAnd() {
    let left = this.parseNot();
    
    while (true) {
      this.skipWhitespace();
      if (this.matchKeyword('AND')) {
        this.pos += 3;
        this.skipWhitespace();
        const right = this.parseNot();
        // Flatten consecutive AND operations into a single node with children array
        left = left.type === 'AND'
          ? { type: 'AND', children: [...left.children, right] }
          : { type: 'AND', children: [left, right] };
      } else {
        break;
      }
    }
    
    return left;
  }

  parseNot() {
    this.skipWhitespace();
    
    if (this.matchKeyword('NOT')) {
      this.pos += 3;
      this.skipWhitespace();
      const operand = this.parseNot();
      return { type: 'NOT', operand };
    }
    
    return this.parsePrimary();
  }

  parsePrimary() {
    this.skipWhitespace();
    
    if (this.pos >= this.input.length) {
      throw this.createError('Unexpected end of expression');
    }

    // Parenthesized expression - parse and return inner expression directly
    // (parentheses are used for precedence, not as a node type)
    if (this.input[this.pos] === '(') {
      this.pos++;
      const expr = this.parseExpression();
      this.skipWhitespace();
      
      if (this.pos >= this.input.length || this.input[this.pos] !== ')') {
        throw this.createError('Missing closing parenthesis');
      }
      
      this.pos++;
      return expr;
    }

    // Entity reference (@entity-id)
    if (this.input[this.pos] === '@') {
      return this.parseEntityReference();
    }

    // Quoted string
    if (this.input[this.pos] === '"') {
      return this.parseQuotedString();
    }

    // Unquoted term (word)
    return this.parseTerm();
  }

  /**
   * Parse an entity reference like @org-005 or @person-001
   */
  parseEntityReference() {
    const start = this.pos;
    this.pos++; // skip @
    
    let id = '';
    while (this.pos < this.input.length && /[a-zA-Z0-9_-]/.test(this.input[this.pos])) {
      id += this.input[this.pos];
      this.pos++;
    }
    
    if (!id) {
      throw this.createError('Expected entity ID after @');
    }
    
    return { 
      type: 'ENTITY', 
      id: id,
      raw: this.input.slice(start, this.pos)
    };
  }

  parseQuotedString() {
    this.pos++; // skip opening quote
    let value = '';
    
    while (this.pos < this.input.length && this.input[this.pos] !== '"') {
      if (this.input[this.pos] === '\\' && this.pos + 1 < this.input.length) {
        this.pos++;
        value += this.input[this.pos];
      } else {
        value += this.input[this.pos];
      }
      this.pos++;
    }
    
    if (this.pos >= this.input.length) {
      throw this.createError('Unterminated quoted string');
    }
    
    this.pos++; // skip closing quote
    return { type: 'TERM', value, quoted: true };
  }

  parseTerm() {
    let value = '';
    
    // Read until we hit a delimiter (whitespace, parens, quotes)
    // Keywords (AND, OR, NOT) are only recognized when separated by whitespace,
    // so we don't check for them here - this allows terms like "terror", "hand", "cannot"
    while (
      this.pos < this.input.length &&
      !/[\s()"]/.test(this.input[this.pos])
    ) {
      value += this.input[this.pos];
      this.pos++;
    }
    
    if (!value) {
      throw this.createError('Expected term');
    }
    
    // Check if the entire term is a reserved keyword - if so, it's a syntax error
    // (e.g., someone wrote "AND" where a term was expected)
    const upperValue = value.toUpperCase();
    if (upperValue === 'AND' || upperValue === 'OR' || upperValue === 'NOT') {
      this.pos -= value.length; // Put it back for better error positioning
      throw this.createError(`Unexpected keyword "${value}" - expected a term`);
    }
    
    return { type: 'TERM', value, quoted: false };
  }

  /**
   * Convert an AST back to a boolean expression string
   * @param {Object} ast - The AST to stringify
   * @param {Object} entityMap - Optional map of entity IDs to names for display
   * @returns {string}
   */
  static stringify(ast, entityMap = {}) {
    if (!ast) return '';

    switch (ast.type) {
      case 'TERM':
        return ast.quoted ? `"${ast.value}"` : ast.value;
      
      case 'ENTITY':
        // If we have a name mapping, use it for display
        if (entityMap[ast.id]) {
          return `@${entityMap[ast.id].name || ast.id}`;
        }
        return `@${ast.id}`;
      
      case 'NOT':
        return `NOT ${BooleanParser.stringify(ast.operand, entityMap)}`;
      
      case 'AND':
        return ast.children
          .map(child => BooleanParser.stringify(child, entityMap))
          .join(' AND ');
      
      case 'OR':
        return ast.children
          .map(child => BooleanParser.stringify(child, entityMap))
          .join(' OR ');
      
      default:
        return '';
    }
  }

  /**
   * Convert a simple scope object to a boolean expression
   * @param {Object} scope - The scope object with personIds, organizationIds, etc.
   * @param {string} logic - 'AND' or 'OR' (default: 'OR')
   * @returns {string}
   */
  static scopeToExpression(scope, logic = 'OR') {
    const terms = [];
    
    // Add entity references
    ['personIds', 'organizationIds', 'factionIds', 'locationIds', 'eventIds'].forEach(key => {
      const ids = scope[key] || [];
      ids.forEach(id => {
        terms.push(`@${id}`);
      });
    });
    
    // Add keywords as quoted strings
    (scope.keywords || []).forEach(keyword => {
      terms.push(`"${keyword}"`);
    });
    
    if (terms.length === 0) return '';
    if (terms.length === 1) return terms[0];
    
    return terms.join(` ${logic} `);
  }

  /**
   * Extract all entity IDs and keywords from an AST
   * @param {Object} ast - The AST to extract from
   * @returns {{ entityIds: string[], keywords: string[] }}
   */
  static extractTerms(ast) {
    const result = { entityIds: [], keywords: [] };
    
    function traverse(node) {
      if (!node) return;
      
      switch (node.type) {
        case 'TERM':
          result.keywords.push(node.value);
          break;
        case 'ENTITY':
          result.entityIds.push(node.id);
          break;
        case 'NOT':
          traverse(node.operand);
          break;
        case 'AND':
        case 'OR':
          node.children.forEach(child => traverse(child));
          break;
      }
    }
    
    traverse(ast);
    return result;
  }
}

export default BooleanParser;
