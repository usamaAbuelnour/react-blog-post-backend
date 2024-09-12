const Yup = require("yup");

const createPostValidationSchema = Yup.object()
    .shape({
        title: Yup.string().required(),
        description: Yup.string().required(),
        imgUrl: Yup.string().url().required(),
    })
    .noUnknown();
const updatePostValidationSchema = Yup.object()
    .shape({
        title: Yup.string().optional(),
        description: Yup.string().optional(),
        imgUrl: Yup.string().url().optional(),
    })
    .noUnknown();

module.exports = { createPostValidationSchema, updatePostValidationSchema };
