const AccessControl = require('role-acl')
const ac = new AccessControl()


//create dog
ac.grant('staff').condition({ Fn: 'EQUALS', args: { 'requester': '$.owner' } }).execute('create').on('dog')
ac.grant('admin').execute('create').on('dog')

//update dog
ac.grant('staff')
  .condition({ Fn: 'EQUALS', args: { 'requester': '$.owner' } })
  .execute('update')
  .on('dog')
ac.grant('admin').execute('update').on('dog')

//delete dog
ac.grant('staff')
  .condition({ Fn: 'EQUALS', args: { 'requester': '$.owner' } })
  .execute('delete')
  .on('dog')
ac.grant('admin').execute('delete').on('dog')

//readdogs  
ac.grant('public').execute('read').on('dogs')
ac.grant('user').execute('read').on('dogs')
ac.grant('staff').execute('read').on('dogs')
ac.grant('admin').execute('read').on('dogs')

//read dog
ac.grant('public').execute('read').on('dog')
ac.grant('user').execute('read').on('dog')
ac.grant('admin').execute('read').on('dog')
ac.grant('staff').execute('read').on('dog')


exports.readAll = (requester) => ac.can(requester.role).execute('read').sync().on('dogs')


exports.read = (requester) => ac.can(requester.role).execute('read').sync().on('dog')



exports.create = (requester,data) => ac.can(requester.role).context({ requester: requester.companyCode, owner: data.companyCode }).execute('create').sync().on('dog')


exports.update = (requester, data) => ac.can(requester.role).context({ requester: requester.companyCode, owner: data.companyCode }).execute('update').sync().on('dog')

exports.delete = (requester, data) => ac.can(requester.role).context({ requester: requester.companyCode, owner: data.companyCode }).execute('delete').sync().on('dog')
