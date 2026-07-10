const commonValidationErrors = {
    REQUIRED_OBJECT: 'This field must be an object',
    INVALID_REQUEST: 'The inputs of the request are invalid',
    REQUIRED_ARRAY: 'This field must be an array',
    INVALID_ARRAY: 'At least one item is required',
    NO_PERMISSIONS_IN_DB: 'System configuration error: No permissions found in the database.'
};

module.exports = commonValidationErrors;