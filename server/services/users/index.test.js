const {saveOrUpdateUser} = require('./index');
const {MongoClient} = require('mongodb');
const mongo = require('../../helpers/mongoClient');
const Users = require('../../DataModals/Users');

jest.mock('../../helpers/mongoClient');

describe('saveOrUpdateUser function test', () => {

  let connection;
  let db;
  let userObj;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);

    mongo.init.mockImplementation(() => {
      return  { "foo": "bar" };
    });

    mongo.getUserObject.mockImplementation(() => {
      userObj = new Users(db);
      return userObj;
    });

  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('should create or update the User profile', async () => {

    const profile = {
      id: 123,
      displayName: 'Jhon Doe',
      emails: [
        {
          value: 'jhondoe@test.com'
        }
      ]
    }

    const updatedUser = await saveOrUpdateUser(profile, mongo);

    const user = await userObj.getUser('123');
    expect(user).toBeTruthy();
  });
});
