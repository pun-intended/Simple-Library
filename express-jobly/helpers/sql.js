const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.
/** Return array of stringified for a partial update.
 *
 * Takes json object containing properties to update and new values, returns 
 * an array of strings to be inserted in an UPDATE query
 * 
 * If column name is found in jsToSql object provided as argument, it is set
 * accordingly, otherwise, provided column name is
 * 
 * {firstName: 'Aliya', age: 32} returns 
 * {setCols: '"first_name"=$1, "age"=$2'
 * values: ['Aliya', 32]
 * } 
 * */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
    // converts json variable names to sql column names, if found in the jsToSql object
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
