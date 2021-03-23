const{ROLE} = require('../roles')

function canViewToDo(user, toDo) {
  return {
    user.role === ROLE.ADMIN || project.userId === user.Id
  }
}

module.exports = {
  canViewToDo
}
