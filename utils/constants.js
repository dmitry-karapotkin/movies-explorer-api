const HTTP_REGEX = /^https?:\/\/(www\.)?([-a-z0-9]{1,256}\.)+[a-z0-9]{1,6}\b[\w\-/.~:/?#[\]@!$&'()*+,;=]*#?$/i;
const superSecret = 'awesome-difficulty';
const devDB = 'mongodb://localhost:27017/diplomdb';

module.exports = {
  HTTP_REGEX,
  superSecret,
  devDB,
};
