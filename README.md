# eslint-plugin-two-line-breaks-after-function

An ESLint plugin that enforces 2 line breaks after functions, with special handling for functions inside objects. This rule helps maintain consistent formatting and improves code readability.

## Installation
First, install ESLint:

```bash
npm install eslint --save-dev
```

Then, install the plugin:

```bash
npm install eslint-plugin-two-line-breaks-after-function --save-dev
```

Note: If you installed ESLint globally (using the -g flag), you must also install eslint-plugin-two-line-breaks-after-function globally.

## Usage
Add two-line-breaks-after-function to the plugins section of your ESLint configuration file (e.g., .eslintrc.json):

```json
{
    "plugins": ["two-line-breaks-after-function"]
}
```
Then, add the rule to the rules section:

```json
{
    "rules": {
        "eslint-two-line-breaks-after-function": "error"
    }
}
```

## Rule Details
This rule enforces that there are exactly 2 line breaks after function declarations and function expressions. For functions inside objects, it enforces 2 line breaks after the comma only if there is another property following the function. The last property in an object does not require additional line breaks.

## Examples

### ✅ Correct Code:
```javascript
// Function Declaration
function foo() {
    // function body
}


const x = 5;
```

```javascript
// Functions Inside Object with Proper Line Breaks
const obj = {
    foo: function() {
        // function body
    },


    bar() {
        // function body
    }
};


let y = 10;
```

```javascript
// Last Property Does Not Require Line Breaks
const obj = {
    baz: () => {
        // function body
    }
};
console.log('Done');
```

### ❌ Incorrect Code:
```javascript
// Missing Line Breaks After Function Declaration
function foo() {
    // function body
}
const x = 5;
```

```javascript
// Functions Inside Object Without Proper Line Breaks
const obj = {
    foo: function() {
        // function body
    },
    bar() {
        // function body
    },
    baz: () => {
        // function body
    }
};
const x = 5;
```

## How It Works
The rule checks for:

- Function Declarations: Ensures 2 line breaks after the function.
- Function Expressions and Arrow Functions Inside Objects:
    - If the function is not the last property, it must have 2 line breaks after the comma.
    - If the function is the last property, no additional line breaks are required.

## Options
This rule does not accept any options.

## When Not To Use It
If you have different formatting preferences or use a code formatter like Prettier that handles line breaks, you might choose not to use this rule.

## Compatibility
ESLint version 6.0.0 or higher is required.
Supports ECMAScript 2020 syntax. Adjust parserOptions if you need to support different versions.

## Contributing
Contributions are welcome! If you find a bug or have a feature request, please open an issue or submit a pull request on GitHub.

To run tests locally:

Clone the repository.
Install dependencies: `npm install`
Run the tests: `npm test`


```bash
npm test
```

Ensure you have all dev dependencies installed before running the tests.