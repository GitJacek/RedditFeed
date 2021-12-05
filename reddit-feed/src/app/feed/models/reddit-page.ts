import { Entry } from './entry';
import { RedditResponse } from './reddit-response';

export class RedditPage {
    public after?: string;
    public before?: string;
    public children: RedditResponse<Entry>[];
}