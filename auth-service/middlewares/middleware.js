
export function validateRequest(req, res, next, schema) {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        console.log('Validation error:', JSON.stringify(error));
        return res.status(400).json({
            message: 'Validation failed',
            errors: JSON.parse(error?.message)?.map(e => ({
                field: e.path.join('.'),
                message: e.message,
            })),
        });
    }
}
