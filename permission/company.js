const AccessControl = require('role-acl')
const ac = new AccessControl()


ac.grant('admin').execute('read').on('company')
ac.grant('admin').execute('read').on('companies')
ac.grant('admin').execute('update').on('company')
ac.grant('admin')
  .condition({Fn:'NOT_EQUALS', args:{'requester':'$.owner'}})
  .execute('delete')
  .on('user')

exports.readAll = (requester) =>   ac.can(requester.role).execute('read').sync().on('companies')


exports.read = (requester, data) => ac.can(requester.role)
.context({requester:requester.id, owner:data.id}).execute('read').sync().on('company')

exports.update = (requester, data) => ac.can(requester.role).context({requester:requester.id, owner:data.id}).execute('update').sync().on('company') 

exports.delete = (requester, data) =>  ac.can(requester.role).context({requester:requester.id, owner:data.id}).execute('delete').sync().on('company')
