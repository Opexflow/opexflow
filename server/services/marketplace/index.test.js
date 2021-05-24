const httpMock = require('node-mocks-http');
const { createJob, getAllJobs } = require('./index');
const {MongoClient} = require('mongodb');
const mongo = require('../../helpers/mongoClient');
const Marketplace = require('../../DataModals/Marketplace');

jest.mock('../../helpers/mongoClient');

describe('Marketplace service functions test', () => {

  let connection;
  let db;
  let marketPlaceObj;

  beforeAll(async () => {
    req = httpMock.createRequest();
    res = httpMock.createResponse();
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);

    mongo.init.mockImplementation(() => {
      return  { "foo": "bar" };
    });

    mongo.getMarketPlaceObject.mockImplementation(() => {
      marketPlaceObj = new Marketplace(db);
      return marketPlaceObj;
    });

  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('should create a new job', async () => {

    req.body = {'{"title":"Sample Title ","detail":"Desc...","projectType":"One Time","categoryOther":"","category":"Full Stack Development","budget":0,"createdByName":"Prashu S","createdById":"108447971404769","createDate":"21.05.2021"}': ''};
    await createJob(req, res);
    const data = res._getJSONData();
    expect(data.success).toBe(true);
  });

  it('should list all saved jobs', async () => {

    await getAllJobs(req, res);
    const data = res._getJSONData();
    expect(data.success).toBe(true);
  });
});
