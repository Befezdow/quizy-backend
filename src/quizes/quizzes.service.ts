import { MongoClient, Db, ObjectId } from 'mongodb';
import { NewQuizDbo, QuizDetailsDbo, QuizListDbo } from './quizzes.dbo';
import { config } from '../config';

export class QuizzesService {
  async init() {
    let client;
    try {
      console.log(`MongoDB URI: ${config.mongoURI}`);
      client = await new MongoClient(config.mongoURI).connect();
      console.log('MongoDB connection established');
    } catch (err) {
      console.log('Connection error: ', err);
      throw err;
    }

    this._database = client.db(config.mongoDatabase);

    const collectionNames = await this._database
      .listCollections()
      .map((elem) => elem.name)
      .toArray();

    if (!collectionNames.includes(config.quizzesCollection)) {
      await this._database.createCollection<NewQuizDbo>(
        config.quizzesCollection,
      );
    }
  }

  _database: Db | null = null;

  async getDatabase(): Promise<Db> {
    if (this._database === null) {
      await this.init();
    }

    return this._database!;
  }

  async find(id: string): Promise<QuizDetailsDbo | null> {
    const database = await this.getDatabase();
    const collection = database.collection<QuizDetailsDbo>('quizzes');
    return collection.findOne({ _id: new ObjectId(id) });
  }

  async findAll(): Promise<QuizListDbo[]> {
    const database = await this.getDatabase();
    const collection = database.collection<QuizListDbo>('quizzes');
    return collection.find({}).toArray();
  }

  async create(data: NewQuizDbo): Promise<string> {
    const database = await this.getDatabase();
    const collection = database.collection<NewQuizDbo>('quizzes');
    return (await collection.insertOne(data)).insertedId.toString();
  }
}
