const Marketplace = require('./Marketplace');
const {MongoClient} = require('mongodb');

const mockJob = {
  title: 'Sample Job',
  detail: 'This is sample job....',
  projectType: 'One time',
  createdByName: 'John',
  createdById: '123',
}

describe('Marketplace Class with mongo db space', () => {

  let connection;
  let db;
  let newJob;

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

  it('should call the Marketplace constructor and return object', () => {
    const mpObj = new Marketplace(db);
    expect(mpObj).toBeTruthy();
  });

  it('should add a new job', async () => {
    const mpObj = new Marketplace(db);
    newJob =  await mpObj.createJob({_id: 111, ...mockJob});
    expect(newJob.ops[0]).toEqual({_id: 111, ...mockJob});
  });

  it('should get a job by id', async () => {
    const mpObj = new Marketplace(db);
    const job = await mpObj.getJob(111);
    expect(newJob.ops[0]).toEqual(job);
  });

  it('should get all the jobs', async () => {
    const mpObj = new Marketplace(db);
    const jobs = await mpObj.getAllJobs();
    expect(jobs).toBeTruthy();
  });

  it('should update an existing user ', async () => {
    const mpObj = new Marketplace(db);

    const query = { _id: 111 };
    const update = {
      $set: {projectType: 'Complex'},
      $setOnInsert: {
        _id: 111,
        createdByName: 'John',
        createdById: '123',
      }
    };

    const updatedJob = await mpObj.updateOrCreateJob(query, update, {upsert: true})
    const job = await mpObj.getJob(111);
    expect('Complex').toEqual(job.projectType)
  });
});
