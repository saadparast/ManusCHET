import neo4j, { Driver } from 'neo4j-driver';
import config from '../config';

class Neo4jService {
  private driver: Driver;
  private static instance: Neo4jService;

  private constructor() {
    const { uri, user, password } = config.neo4j;
    
    try {
      this.driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
      console.log('Neo4j connection established');
    } catch (error) {
      console.error('Failed to create Neo4j driver instance:', error);
      throw error;
    }
  }

  public static getInstance(): Neo4jService {
    if (!Neo4jService.instance) {
      Neo4jService.instance = new Neo4jService();
    }
    return Neo4jService.instance;
  }

  public getDriver(): Driver {
    return this.driver;
  }

  public async verifyConnectivity(): Promise<void> {
    try {
      await this.driver.verifyConnectivity();
      console.log('Neo4j connection verified');
    } catch (error) {
      console.error('Neo4j connectivity verification failed:', error);
      throw error;
    }
  }

  public async close(): Promise<void> {
    try {
      await this.driver.close();
      console.log('Neo4j connection closed');
    } catch (error) {
      console.error('Error closing Neo4j connection:', error);
      throw error;
    }
  }

  public async executeQuery(
    query: string,
    params: Record<string, any> = {}
  ): Promise<any> {
    const session = this.driver.session();
    try {
      const result = await session.run(query, params);
      return result.records;
    } catch (error) {
      console.error('Error executing Neo4j query:', error);
      throw error;
    } finally {
      await session.close();
    }
  }
}

export default Neo4jService.getInstance();
