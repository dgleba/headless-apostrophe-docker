const config = require('config')
const colors = config.get('colors')

module.exports = {
  construct: function (self, options) {
    self.afterInit = function () {
      var findUserAdmin = function (callback) {
        self.apos.users
          .find({ res: {} }, { username: 'admin' })
          .permission(false)
          .toCount(function (err, count) {
            if (err) {
              return callback(err)
            }
            return callback(null, count)
          })
      }

      var addUserAdmin = function () {
        return new Promise(function (resolve, reject) {
          var addUser = function (req, username, password, groupname, callback) {
            return self.apos.groups
              .find(req, { title: groupname })
              .permission(false)
              .toObject(function (err, group) {
                if (err) {
                  return reject(err)
                }
                if (!group) {
                  return resolve('That group does not exist.')
                }
                return self.apos.users.insert(
                  req,
                  {
                    username: username,
                    password: password,
                    title: username,
                    firstName: username,
                    groupIds: [group._id]
                  },
                  { permissions: false },
                  callback
                )
              })
          }

          findUserAdmin(function (err, count) {
            if (err) {
              return reject(err)
            }
            if (count === 0) {
              addUser({ res: {} }, 'admin', 'admin', 'admin', resolve)
              console.log(colors.bg.green, 'User admin creation', colors.reset)
            } else {
              console.log(
                colors.bg.yellow,
                colors.fg.blue,
                'User admin already created',
                colors.reset
              )
              resolve()
            }
          })
        })
      }

      addUserAdmin().catch(error => {
        console.error(error.stack)
      })
    }
  }
}
