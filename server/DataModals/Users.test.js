const Users = require('../DataModals/Users');
const {MongoClient} = require('mongodb');

const mockUser = {
  name: "Test User",
  created_at: '2020-12-21T09:08:27Z',
  updated_at: '2021-05-15T16:05:12Z'
}

// const mockAddUser = jest.fn().mockResolvedValue(mockUser);
// const mockGetUser = jest.fn().mockResolvedValue(mockUser);


// jest.mock('./Users', () => {
//   return jest.fn().mockImplementation(() => {
//     return {
//       addUser: mockAddUser,
//       getUser: mockGetUser,
//     };
//   });
// });


// describe('Users Class', () => {

//   let connection;
//   let db;

//   beforeAll(async () => {
//     Users.mockClear();
//     connection = await MongoClient.connect(global.__MONGO_URI__, {
//       useNewUrlParser: true,
//     });
//     db = await connection.db(global.__MONGO_DB_NAME__);
//   });

//   afterAll(async () => {
//     await connection.close();
//     await db.close();
//   });

//   it('should call the User constructor', () => {
//     const userObj = new Users(db);
//     expect(Users).toHaveBeenCalledTimes(1);
//   });

//   it('should add a new user', async () => {
//     const userObj = new Users(db);
//     const newUser = await userObj.addUser(mockUser);
    
//     expect(mockAddUser.mock.calls[0][0]).toEqual(newUser);
//   });

//   it('should return a user for given id', async () => {
//     const userObj = new Users(db);
//     const id = 1;
//     const user = await userObj.getUser(id);
    
//     expect(mockGetUser.mock.calls[0][0]).toEqual(id);
//   });
// });

describe('Users Class with mongo db space', () => {

  let connection;
  let db;

  beforeAll(async () => {
    //Users.mockClear();
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('should call the User constructor and return object', () => {
    const userObj = new Users(db);
    expect(userObj).toBeTruthy();
  });

  it('should add a new user', async () => {
    const userObj = new Users(db);
    const newUser =  await userObj.addUser(mockUser);
    expect(newUser.ops[0]).toEqual(mockUser)
  });

  it('should get a user by id', async () => {
    const userObj = new Users(db);
    const newUser =  await userObj.addUser({_id: 123, name: 'John'});
    const user = await userObj.getUser(123);
    expect(newUser.ops[0]).toEqual(user)
  });

  it('should update an existing user ', async () => {
    const userObj = new Users(db);
    const newUser =  await userObj.addUser({_id: 124, name: 'John'});

    const query = { _id: 124 };
    const update = {
      $set: {name: 'Doe'},
      $setOnInsert: {
        _id: 124,
      }
    };

    const updatedUser = await userObj.updateOrInsertUser(query, update, {upsert: true})
    const user = await userObj.getUser(124);
    expect('Doe').toEqual(user.name)
  });
});
