import { Request, Response } from 'express';
import { esClient } from '../utils/elasticsearch';
import { SearchRequest } from '@elastic/elasticsearch/lib/api/types';

export const searchEmails = async (req: Request, res: Response) => {
  try {
    const query = req.query.query as string;

    const searchParams: SearchRequest = {
      index: 'emails',
      query: {
        multi_match: {
          query,
          fields: ['subject', 'from', 'to', 'text'],
        },
      },
    };

    const result = await esClient.search(searchParams);

    const hits = result.hits?.hits || [];
    const sources = hits.map((hit: any) => hit._source);

    res.json(sources);
  } catch (error) {
    console.error('Elasticsearch search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
};
