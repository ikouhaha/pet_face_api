const AccessControl = require('role-acl')
const ac = new AccessControl()

ac.grant('user').execute('read').on('dog')

//delete comment
ac.grant('admin').execute('delete').on('comment')
ac.grant('staff').execute('delete').on('comment')

exports.delete = (requester) => ac.can(requester.role).execute('delete').sync().on('comment')