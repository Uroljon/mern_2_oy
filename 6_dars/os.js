let os = require("os")
// returns bytes by default
console.log(os.totalmem() / 1024 / 1024 / 1024); //total memory of server's RAM
console.log(os.freemem() / 1024 / 1024 / 1024); //free memory of server's RAM

// returns seconds by default
console.log(os.uptime() / 60 / 60 ); //up time in hours

// user info
console.log((os.userInfo())); /** =>
{
  uid: -1,
  gid: -1,
  username: 'NOUT CENTER',
  homedir: 'C:\\Users\\NOUT CENTER',
  shell: null
}
*/