const seedUsers = require('./20240724105756-my_test_users.js');
const { errorResponse } = require('../src/utils/errorresponse.js');
const { successResponse } = require('../src/utils/successresponse.js');

/**
 * Import additional seeders as needed
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports.runSeeders = async (req,res,next) => {


    try {
        console.log('Starting data seeding...');

        
        await seedUsers();
       
        // Add more seeder functions as needed

        console.log('Data seeding completed successfully.');
        return successResponse(req, res, "Data Seeding Successfull", {});
    } catch (err) {
        console.error('Error seeding data:', err);
        return  errorResponse(res, error.message, 304, error, {});
    }
}


