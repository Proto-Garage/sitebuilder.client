import 'whatwg-fetch';
import Config, {
  SiteAttributes,
  Styles,
  Node,
  SerializedNode,
  RootNodeAttributes,
  RootNode,
  PageNodeAttributes,
  PageNode,
  HeaderNodeAttributes,
  HeaderNode,
  FooterNodeAttributes,
  FooterNode,
  SectionNodeAttributes,
  SectionNode,
  ImageNode,
  PlainTextNode,
  PlainTextNodeAttributes,
  CarouselNode,
  CarouselItemNodeAttributes,
  CarouselOptions,
  CarouselNodeAttributes,
  MultiProductNode,
  MultiProductNodeAttributes,
  ProductAttributes,
} from './config';

export {
  SiteAttributes,
  Styles,
  Node,
  Config,
  SerializedNode,
  RootNodeAttributes,
  RootNode,
  PageNodeAttributes,
  PageNode,
  HeaderNodeAttributes,
  HeaderNode,
  FooterNodeAttributes,
  FooterNode,
  SectionNodeAttributes,
  SectionNode,
  ImageNode,
  PlainTextNode,
  PlainTextNodeAttributes,
  CarouselNode,
  CarouselItemNodeAttributes,
  CarouselOptions,
  CarouselNodeAttributes,
  MultiProductNode,
  MultiProductNodeAttributes,
  ProductAttributes,
};

const BASE_URL = 'http://api.sitebuilder.development.aonewallet.com/graphql';

export default class {
  constructor(
    private options: {
      token: string;
    }
  ) {}

  private async request(params: { query: string; variables?: Object }) {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.options.token}`,
      },
      mode: 'cors',
      body: JSON.stringify(params),
    });

    const body = await response.json();
    if (body.errors) {
      throw body.errors[0];
    }

    return body.data;
  }

  async retrieveSite(id?: string): Promise<SiteAttributes | null> {
    const { site } = await this.request({
      query: `
        query ($id: ID) {
          site(id: $id) {
            id
            subdomain
            url
            config
          }
        }
      `,
      variables: {
        id,
      },
    });

    if (!site) {
      return null;
    }

    return {
      ...site,
      config: new Config(site.config),
    };
  }

  async updateSite(
    id: string,
    params: { subdomain?: string; config?: Config }
  ): Promise<boolean> {
    let input = params as any;
    if (params.config) {
      input = { ...input, config: params.config.serialize() };
    }

    const { updateSite } = await this.request({
      query: `
        mutation ($id: ID!, $input: UpdateSiteInput!) {
          updateSite(id: $id, input: $input)
        }
      `,
      variables: {
        id,
        input,
      },
    });

    return updateSite;
  }
}
