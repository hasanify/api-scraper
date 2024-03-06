"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachValidator = void 0;
const express_validator_1 = require("express-validator");
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
    }
    next();
};
const validate = {
    scrape: [
        (0, express_validator_1.param)('url')
            .notEmpty()
            .withMessage('url is required')
            .isURL()
            .withMessage('invalid url')
            .trim(),
    ],
};
const attachValidator = (validators) => {
    return [...validators, handleValidationErrors];
};
exports.attachValidator = attachValidator;
exports.default = validate;
