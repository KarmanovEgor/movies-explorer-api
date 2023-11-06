const urlValid = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const emailValid = /^\S+@\S+\.\S+$/;
module.exports = { urlValid, emailValid };
