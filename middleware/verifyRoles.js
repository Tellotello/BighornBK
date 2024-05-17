/*
const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    console.log(allowedRoles);
    console.log(req.roles);
    if (!req?.roles) return res.sendStatus(401);

    const rolesArray = [...allowedRoles];
    console.log(rolesArray);
    console.log(req.roles);
    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;

*/
const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (Array.isArray(req.roles)) return res.sendStatus(401); // Check if req.roles is an array
    const rolesArray = [...allowedRoles];
    const result = rolesArray.includes(req.roles);
    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;
