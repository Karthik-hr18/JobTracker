const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body); //the .validate in this line is inbuilt function this checks the req.body data against the schema we created 
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    }
}

export default validate;
