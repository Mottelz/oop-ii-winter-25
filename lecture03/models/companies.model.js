const { db } = require("./db_base");

const getAllCompanies = async () => {
  const stmnt = db.prepare("SELECT * FROM companies");
  let companies;

  try {
    companies = await stmnt.all();
  } catch (err) {
    console.error(err);
    return null;
  }

  return companies ? companies : null;
};

module.exports = {
  getAllCompanies,
};
