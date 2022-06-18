const AccessControl = require('role-acl')
const ac = new AccessControl()

//create post
ac.grant('staff').execute('create').on('post')
ac.grant('user').execute('create').on('post')
ac.grant('admin').execute('create').on('post')


//update post
ac.grant('staff')
  .condition({ Fn: 'EQUALS', args: { 'requester': '$.owner' } })
  .execute('update')
  .on('post')
ac.grant('user')
  .condition({ Fn: 'EQUALS', args: { 'requester': '$.owner' } })
  .execute('update')
  .on('post')
ac.grant('admin').execute('update').on('post')

//delete post
ac.grant('staff')
  .condition({ Fn: 'EQUALS', args: { 'requester': '$.owner' } })
  .execute('delete')
  .on('post')
ac.grant('user')
  .condition({ Fn: 'EQUALS', args: { 'requester': '$.owner' } })
  .execute('delete')
  .on('post')
ac.grant('admin').execute('delete').on('post')

//read posts  
ac.grant('public').execute('read').on('posts')
ac.grant('user').execute('read').on('posts')
ac.grant('staff').execute('read').on('posts')
ac.grant('admin').execute('read').on('posts')

//read post
ac.grant('public').execute('read').on('post')
ac.grant('user').execute('read').on('post')
ac.grant('admin').execute('read').on('post')
ac.grant('staff').execute('read').on('post')


exports.readAll = (requester) => ac.can(requester.role).execute('read').sync().on('posts')


exports.read = (requester) => ac.can(requester.role).execute('read').sync().on('post')



exports.create = (requester) => ac.can(requester.role).execute('create').sync().on('post')


exports.update = (requester, data) => ac.can(requester.role).context({ requester: requester.id, owner: data.createdBy }).execute('update').sync().on('post')

exports.delete = (requester, data) => ac.can(requester.role).context({ requester: requester.id, owner: data.createdBy }).execute('delete').sync().on('post')
