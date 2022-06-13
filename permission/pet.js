const AccessControl = require('role-acl')
const ac = new AccessControl()

//create pet
ac.grant('staff').execute('create').on('pet')
ac.grant('user').execute('create').on('pet')
ac.grant('admin').execute('create').on('pet')


//update pet
ac.grant('staff')
  .condition({ Fn: 'EQUALS', args: { 'requester': '$.owner' } })
  .execute('update')
  .on('pet')
ac.grant('user')
  .condition({ Fn: 'EQUALS', args: { 'requester': '$.owner' } })
  .execute('update')
  .on('pet')
ac.grant('admin').execute('update').on('pet')

//delete pet
ac.grant('staff')
  .condition({ Fn: 'EQUALS', args: { 'requester': '$.owner' } })
  .execute('delete')
  .on('pet')
ac.grant('user')
  .condition({ Fn: 'EQUALS', args: { 'requester': '$.owner' } })
  .execute('delete')
  .on('pet')
ac.grant('admin').execute('delete').on('pet')

//read pets  
ac.grant('public').execute('read').on('pets')
ac.grant('user').execute('read').on('pets')
ac.grant('staff').execute('read').on('pets')
ac.grant('admin').execute('read').on('pets')

//read pet
ac.grant('public').execute('read').on('pet')
ac.grant('user').execute('read').on('pet')
ac.grant('admin').execute('read').on('pet')
ac.grant('staff').execute('read').on('pet')


exports.readAll = (requester) => ac.can(requester.role).execute('read').sync().on('pets')


exports.read = (requester) => ac.can(requester.role).execute('read').sync().on('pet')



exports.create = (requester) => ac.can(requester.role).execute('create').sync().on('pet')


exports.update = (requester, data) => ac.can(requester.role).context({ requester: requester.id, owner: data.createdBy }).execute('update').sync().on('pet')

exports.delete = (requester, data) => ac.can(requester.role).context({ requester: requester.id, owner: data.createdBy }).execute('delete').sync().on('pet')
