/**
 * Created by bliberini on 4/15/16.
 */
module.exports = {
    invalidCategoryPSQL: 'error: null value in column "interestid" violates not-null constraint',
    invalidCategoryMsg: 'Invalid interest provided. If you want to include a new interest, please add it in the Interest section first.',
    emailAlreadyExistsMsg: 'A user with the provided email already exists',
    aliasAlreadyExistsMsg: 'A user with the provided alias already exists',
    aliasAndEmailAlreadyExistMsg: 'A user with the provided alias and email already exists',
    paramsIdAndBodyIdDontMatch: 'Id provided in the URL params and the one provided in the request\'s body don\'t match',
    errorCannotPut: 'Error: cannot PUT /users/',
    invalidId: 'The provided ID isn\'t valid'
};