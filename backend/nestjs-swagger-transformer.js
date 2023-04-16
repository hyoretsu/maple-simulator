const transformer = require("@nestjs/swagger/plugin");

module.exports.name = "nestjs-swagger-transformer";
module.exports.version = 1;

module.exports.factory = cs => {
  return transformer.before({}, cs.program);
};
