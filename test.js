const { RuleTester } = require('eslint');
const rule = require('./two-line-breaks-after-function');

const ruleTester = new RuleTester({
    languageOptions: { ecmaVersion: 2020 }
});

ruleTester.run('two-line-breaks-after-function', rule, {
    valid: [
        // Initial valid test cases
        {
            code: `
function foo() {
    // function body
}


const x = 5;
`
        },
        {
            code: `
function bar() {
    // function body
}


// Another function
function baz() {
    // function body
}
`
        },
        {
            code: `
function qux() {
    // function body
}


/* Comment */
let y = 10;
`
        },
        // New valid test cases with functions inside an object
        {
            code: `
const obj = {
    foo: function() {
        // function body
    },


    bar() {
        // function body
    }
};


let y = 10;
`
        },
        {
            code: `
const obj = {
    foo: () => {
        // function body
    },


    bar: function() {
        // function body
    }
};


console.log('Done');
`
        },
        // Valid case: last property doesn't require line breaks
        {
            code: `
const obj = {
    foo: function() {
        // function body
    }
};
const x = 5;
`
        },
        {
            code: `
const obj = {
    foo: () => {
        // function body
    },


    bar: function() {
        // function body
    },


    baz() {
        // function body
    }
};
console.log('Done');
`
        }
    ],

    invalid: [
        // Initial invalid test cases with updated error messages
        {
            code: `
function foo() {
    // function body
}
const x = 5;
`,
            errors: [{
                message: "Expected 2 line breaks after function.",
                type: "FunctionDeclaration"
            }],
            output: `
function foo() {
    // function body
}


const x = 5;
`
        },
        {
            code: `
function bar() {
    // function body
}
// Some comment
let y = 10;
`,
            errors: [{
                message: "Expected 2 line breaks after function.",
                type: "FunctionDeclaration"
            }],
            output: `
function bar() {
    // function body
}


// Some comment
let y = 10;
`
        },
        {
            code: `
function baz() {
    // function body
}

/* Comment */
let z = 15;
`,
            errors: [{
                message: "Expected 2 line breaks after function.",
                type: "FunctionDeclaration"
            }],
            output: `
function baz() {
    // function body
}


/* Comment */
let z = 15;
`
        },
        // New invalid test cases with functions inside an object
        {
            code: `
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
`,
            errors: [
                {
                    message: "Expected 2 line breaks after function.",
                    type: "FunctionExpression"
                },
                {
                    message: "Expected 2 line breaks after function.",
                    type: "FunctionExpression"
                }
            ],
            output: `
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
`
        },
        // Invalid test case: only the functions before other properties require line breaks
        {
            code: `
const obj = {
    foo: () => {
        // function body
    },
    bar: function() {
        // function body
    }
};
console.log('Done');
`,
            errors: [
                {
                    message: "Expected 2 line breaks after function.",
                    type: "ArrowFunctionExpression"
                }
            ],
            output: `
const obj = {
    foo: () => {
        // function body
    },


    bar: function() {
        // function body
    }
};
console.log('Done');
`
        }
    ]
});

console.log('All tests passed!');