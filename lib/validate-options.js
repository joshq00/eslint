/**
 * @fileoverview Validates rule options.
 * @author Brandon Mills
 * @copyright 2015 Brandon Mills
 */

"use strict";

var validator = require("is-my-json-valid");

var validators = Object.create(null); // Cache generated schema validators

/**
 * Validates a rule's options against a schema.
 * @param {string} id The rule's unique name.
 * @param {object} schema JSON schema for the rule's options.
 * @param {object} options Current options for the rule.
 * @returns {boolean|object[]} True if options are valid, or array of errors if not.
 */
module.exports = function (id, schema, options) {
    var validate = validators[id],
        result;

    if (!validate) {
        validate = validators[id] = validator(schema, { verbose: true });
    }

    result = validate(options);

    if (!result) {
        result = validate.errors;
    }

    return result;
};
