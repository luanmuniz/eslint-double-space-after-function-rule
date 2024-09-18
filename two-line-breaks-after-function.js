"use strict";

module.exports = {
    meta: {
        type: "layout",
        docs: {
            description: "require 2 line breaks after functions declarations.",
            category: "Stylistic Issues",
            recommended: false
        },
        fixable: "whitespace",
        schema: [] // no options
    },
    create(context) {
        const sourceCode = context.getSourceCode();

        function checkFunctionNode(node) {
            let lastToken, nextToken, reportLocation;

            if (node.type === 'Property') {
                // For functions inside objects, proceed only if there's a property after
                const propertyIndex = node.parent.properties.indexOf(node);
                const isLastProperty = propertyIndex === node.parent.properties.length - 1;

                if (isLastProperty) {
                    // Do not enforce line breaks after the last property
                    return;
                }

                // Get the comma token after the property
                lastToken = sourceCode.getTokenAfter(node.value, token => token.value === ',');
                if (!lastToken) {
                    // If there's no comma, use the end of the node (unlikely but safe)
                    lastToken = sourceCode.getLastToken(node);
                }

                reportLocation = node.value;
            } else {
                // For function declarations and other functions
                lastToken = sourceCode.getLastToken(node);
                reportLocation = node;
            }

            nextToken = sourceCode.getTokenAfter(lastToken, { includeComments: true });

            if (nextToken) {
                const lastTokenLine = lastToken.loc.end.line;
                const nextTokenLine = nextToken.loc.start.line;

                const lineDifference = nextTokenLine - lastTokenLine;

                if (lineDifference < 3) {
                    context.report({
                        node: reportLocation,
                        message: "Expected 2 line breaks after function.",
                        fix(fixer) {
                            const neededLineBreaks = 3 - lineDifference;
                            const fixText = "\n".repeat(neededLineBreaks);
                            return fixer.insertTextAfter(lastToken, fixText);
                        }
                    });
                }
            }
        }

        return {
            FunctionDeclaration(node) {
                checkFunctionNode(node);
            },
            'Property[value.type="FunctionExpression"], Property[value.type="ArrowFunctionExpression"]'(node) {
                checkFunctionNode(node);
            },
            MethodDefinition(node) {
                checkFunctionNode(node);
            }
        };
    }
};
