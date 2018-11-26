import 'whatwg-fetch';
import Config, { SiteAttributes, Node, SerializedNode, RootNodeAttributes, RootNode, PageNodeAttributes, PageNode, HeaderNodeAttributes, HeaderNode, FooterNodeAttributes, FooterNode, SectionNodeAttributes, SectionNode, ImageNode } from './config';
export { Node, Config, SerializedNode, RootNodeAttributes, RootNode, PageNodeAttributes, PageNode, HeaderNodeAttributes, HeaderNode, FooterNodeAttributes, FooterNode, SectionNodeAttributes, SectionNode, ImageNode, };
export default class {
    private options;
    constructor(options: {
        token: string;
    });
    private request;
    retrieveSite(id?: string): Promise<SiteAttributes | null>;
    updateSite(id: string, params: {
        subdomain?: string;
        config?: Config;
    }): Promise<boolean>;
}
//# sourceMappingURL=index.d.ts.map