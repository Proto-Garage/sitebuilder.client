import Config from './config';
export { Config };
export default class {
    private token;
    constructor(token: string);
    retrieveSite(): Promise<{
        url: string;
        config: Config;
    }>;
    updateSite(params: {
        url?: string;
        config?: Config;
    }): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map