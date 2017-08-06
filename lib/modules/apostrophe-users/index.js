// This configures the apostrophe-users module to add an admin-level
// group by default:
const config = require('config')
const colors = config.get('colors')

module.exports = {
  groups: [
    {
      title: 'guest',
      permissions: []
    },
    {
      title: 'admin',
      permissions: ['admin']
    }
  ],
  construct: (self, options) => {
    self.afterInit = () => {
      const findUserAdmin = callback => {
        self
          .find({ res: {} }, { username: 'admin' })
          .permission(false)
          .toCount((err, count) => {
            if (err) {
              return callback(err)
            }
            return callback(null, count)
          })
      }

      const addUserAdmin = () => {
        return new Promise((resolve, reject) => {
          const addUser = (req, username, password, groupname, callback) => {
            return self.apos.groups
              .find(req, { title: groupname })
              .permission(false)
              .toObject((err, group) => {
                if (err) {
                  return reject(err)
                }
                if (!group) {
                  return resolve('That group does not exist.')
                }
                return self.apos.users.insert(
                  req,
                  {
                    username,
                    password,
                    title: username,
                    firstName: username,
                    groupIds: [group._id]
                  },
                  { permissions: false },
                  callback
                )
              })
          }

          findUserAdmin((err, count) => {
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

      addUserAdmin().catch(err => console.error(err.stack))
    }
  }
}
