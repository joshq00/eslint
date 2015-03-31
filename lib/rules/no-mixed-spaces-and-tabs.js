/**
 * @fileoverview Disallow mixed spaces and tabs for indentation
 * @author Jary Niebur
 * @copyright 2014 Nicholas C. Zakas. All rights reserved.
 * @copyright 2014 Jary Niebur. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var smartTabs;

    switch (context.options[0]) {
        case true: // Support old syntax, maybe add deprecation warning here
        case "smart-tabs":
            smartTabs = true;
            break;
        default:
            smartTabs = false;
    }

    var COMMENT_START = /^\s*\/\*/,
        MAYBE_COMMENT = /^\s*\*/;

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {

        "Program": function(node) {
            /*
             * Tab-space, space-tab,
             * or non-space and tab.
             */
            var regex = /(?=\t | \t)|[\S](?=\t)/,
                match,
                lines = context.getSourceLines();

            if (smartTabs) {
                /*
                 * Space-tab or
                 * non-space and tab
                 */
                regex = /[\S ](?=\t)/;
            }

            lines.forEach(function(line, i) {
                match = regex.exec(line);

                if (match) {

                    if (!MAYBE_COMMENT.test(line) && !COMMENT_START.test(lines[i - 1])) {
                        context.report(node, { line: i + 1, column: match.index + 1 }, "Mixed spaces and tabs.");
                    }

                }
            });
        }

    };

};
