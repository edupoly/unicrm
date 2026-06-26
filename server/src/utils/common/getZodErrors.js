const getZodErrors = (issues) => {
    if (!(Array.isArray(issues))) {
        return [];
    }
    return issues.map(issue => ({ field: issue.path[0], message: issue.message }));
};

module.exports = getZodErrors;