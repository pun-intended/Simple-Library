const { sqlForPartialUpdate } = require("./sql")
const {BadRequestError} = require('../expressError') 

describe("sqlForPartialUpdate", function() {
    
    test("returns object containing setcols and values", function() {
        const updateData = {
            firstName: "Test",
            lastName: "Name",
            age: 26
        }
        const testFormat = {}

        result = sqlForPartialUpdate(updateData, testFormat)
        expect(result).toHaveProperty('setCols');
        expect(result).toHaveProperty('values');
    })
    
    test("Contains correct string of keys", function() {
        const updateData = {
            firstName: "Test",
            lastName: "Name",
            age: 26
        }
        const testFormat = {}

        result = sqlForPartialUpdate(updateData, testFormat)
        expect(result.setCols).toBe("\"firstName\"=$1, \"lastName\"=$2, \"age\"=$3" )
    
    })

    test("Contains all correct values", function() {
        const updateData = {
            firstName: "Test",
            lastName: "Name",
            age: 26
        }
        const testFormat = {}

        result = sqlForPartialUpdate(updateData, testFormat)
        expect(result.values).toEqual(["Test", "Name", 26])
    })
    
    test("Converts column names given jsToSql argument", function() {
        const updateData = {
            firstName: "Test",
            lastName: "Name",
            age: 26
        }

        const testFormat = {
            firstName: "first_name",
            lastName: "last_name"
        }
        
        result = sqlForPartialUpdate(updateData, testFormat)
        expect(result.setCols).toBe("\"first_name\"=$1, \"last_name\"=$2, \"age\"=$3" )
        expect(result.values).toEqual(["Test", "Name", 26])
    })
    test("Rejects empty requests", function() {
        const updateData = {}

        expect(() => {sqlForPartialUpdate(updateData)}).toThrow(BadRequestError)
    })

} )
