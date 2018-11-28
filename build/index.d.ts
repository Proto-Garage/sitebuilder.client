import 'whatwg-fetch';
import Config, { SiteAttributes, Styles, Node, SerializedNode, RootNodeAttributes, RootNode, PageNodeAttributes, PageNode, HeaderNodeAttributes, HeaderNode, FooterNodeAttributes, FooterNode, SectionNodeAttributes, SectionNode, ImageNode, CarouselNode, CarouselItemNode } from './config';
export { SiteAttributes, Styles, Node, Config, SerializedNode, RootNodeAttributes, RootNode, PageNodeAttributes, PageNode, HeaderNodeAttributes, HeaderNode, FooterNodeAttributes, FooterNode, SectionNodeAttributes, SectionNode, ImageNode, CarouselNode, CarouselItemNode, };
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