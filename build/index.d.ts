import 'whatwg-fetch';
import Config from './config';
export { Config };
export default class {
    private options;
    constructor(options: {
        token: string;
    });
    private request;
    retrieveSite(id?: string): Promise<{
        id: string;
        subdomain: string;
        url: string;
        config: Config;
    } | null>;
    updateSite(id: string, params: {
        subdomain?: string;
        config?: Config;
    }): Promise<boolean>;
}
//# sourceMappingURL=index.d.ts.map