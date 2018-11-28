import * as R from 'ramda';

import uuid from './uuid';

export type SiteAttributes = {
  id: string;
  subdomain: string;
  url: string;
  config: Config;
};

export type SerializedNode = {
  id: string;
  type: string;
  attributes: { [k: string]: any };
  parent?: string;
  children: string[];
};

export type RootNodeAttributes = {
  title: string;
  description: string;
};
export type RootNode = Node<'Root', RootNodeAttributes>;

export type PageNodeAttributes = {
  path: string;
  title: string;
  frontPage?: boolean;
};
export type PageNode = Node<'Page', PageNodeAttributes>;

export interface Styles {
  color?: string | undefined;
  backgroundImage?: string | undefined;
  backgroundColor?: string | undefined;
  marginTop?: number | string;
  marginBottom?: number | string;
  marginLeft?: number | string;
  marginRight?: number | string;
  paddingTop?: number | string;
  paddingBottom?: number | string;
  paddingLeft?: number | string;
  paddingRight?: number | string;
}

export type HeaderNodeAttributes = {
  template: 1 | 2 | 3 | 4 | 5;
  styles?: Styles;
  navStyles?: Styles;
  topStyles?: Styles;
};

export type HeaderNode = Node<'Header', HeaderNodeAttributes>;

export type FooterNodeAttributes = {
  template: 1 | 2 | 3 | 4 | 5;
  styles?: Styles;
  navStyles?: Styles;
};
export type FooterNode = Node<'Footer', FooterNodeAttributes>;

export type SectionNodeAttributes = {
  type: 'column' | 'row';
};
export type SectionNode = Node<'Section', SectionNodeAttributes>;

export type HeadingNodeAttributes = {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

export type HeadingNode = Node<'Heading', HeadingNodeAttributes>;

export type TextNodeAttributes = {
  tag?: 'p';
};

export type TextNode = Node<'Text', TextNodeAttributes>;

export type ImageNodeAttributes = {
  src: string;
};

export type ImageNode = Node<'Image', ImageNodeAttributes>;

export type CarouselNodeAttributes = {
  src: string;
};

export type CarouselNode = Node<'Carousel', CarouselNodeAttributes>;

export type CarouselItemNodeAttributes = {
  src: string;
  altText: string;
  caption: string;
};

export type CarouselItemNode = Node<'CarouselItem', CarouselItemNodeAttributes>;

export default class Config {
  private nodes: { [k: string]: Node };
  public readonly root: RootNode;
  constructor(config?: { [k: string]: SerializedNode }) {
    this.nodes = {};

    if (config) {
      this.root = new Node({
        id: 'root',
        type: 'Root',
        attributes: config.root.attributes,
      }) as RootNode;

      this.nodes['root'] = this.root;

      const parse = (parent: Node, id: string) => {
        const serialized = config[id];

        const node = new Node(R.pick(['id', 'type', 'attributes'])(serialized));
        parent.addChild(node);

        this.nodes[node.id] = node;

        for (const child of serialized.children) {
          parse(node, child);
        }
      };

      for (const child of config.root.children) {
        parse(this.root, child);
      }
    } else {
      this.root = new Node({
        id: 'root',
        type: 'Root',
        attributes: {},
      }) as RootNode;

      this.nodes['root'] = this.root;

      const defaultPageNode = this.createNode({
        type: 'Page',
        attributes: {
          path: '/',
          frontPage: true,
          title: 'Default Page',
        },
      });

      this.root.addChild(defaultPageNode);

      const headerNode = this.createNode({
        type: 'Header',
        attributes: {
          template: 1,
          styles: {},
          navStyles: {},
          topStyles: {},
        },
      });
      const footerNode = this.createNode({
        type: 'Footer',
        attributes: {
          template: 1,
          styles: {},
          navStyles: {},
        },
      });
      defaultPageNode.addChild(headerNode);
      defaultPageNode.addChild(footerNode);
    }
  }

  findNode(id: string): Node | null {
    return this.nodes[id] || null;
  }

  createNode(params: {
    type: 'Page';
    attributes: PageNodeAttributes;
  }): PageNode;
  createNode(params: {
    type: 'Header';
    attributes: HeaderNodeAttributes;
  }): HeaderNode;
  createNode(params: {
    type: 'Footer';
    attributes: FooterNodeAttributes;
  }): FooterNode;
  createNode(params: {
    type: 'Section';
    attributes: SectionNodeAttributes;
  }): SectionNode;
  createNode(params: {
    type: 'Heading';
    attributes: HeadingNodeAttributes;
  }): HeadingNode;
  createNode(params: {
    type: 'Text';
    attributes: TextNodeAttributes;
  }): TextNode;
  createNode(params: {
    type: 'Image';
    attributes: ImageNodeAttributes;
  }): ImageNode;
  createNode(params: {
    type: 'Carousel';
    attributes: CarouselNodeAttributes;
  }): CarouselNode;
  createNode(params: {
    type: 'CarouselItem';
    attributes: CarouselItemNodeAttributes;
  }): CarouselItemNode;
  createNode(params: { type: string; attributes: any }): Node {
    const node = new Node(params);
    this.nodes[node.id] = node;
    return node;
  }

  removeNode(node: Node) {
    if (node.parent) {
      (node.parent.children as any) = R.filter(
        R.complement(R.propEq('id', node.id))
      )(node.parent.children);
    }

    delete this.nodes[node.id];
  }

  serialize() {
    return R.mapObjIndexed((node: Node) => ({
      id: node.id,
      type: node.type,
      attributes: node.attributes,
      parent: node.parent ? node.parent.id : null,
      children: R.map(R.prop('id'))(node.children),
    }))(this.nodes);
  }
}

export class Node<TType = string, TAttributes = { [k: string]: any }> {
  public readonly id: string;
  public readonly type: TType;
  public readonly attributes: TAttributes;
  public readonly parent?: Node;
  public readonly children: Node[];
  constructor(params: { id?: string; type: TType; attributes: TAttributes }) {
    this.id = params.id || uuid();
    this.type = params.type;
    this.attributes = params.attributes;
    this.children = [];
  }

  findChildren(params: { type: 'Page' }): PageNode[];

  findChildren(params: { type: 'Footer' }): FooterNode[];

  findChildren(params: { type: 'Header' }): HeaderNode[];

  findChildren(params: { type: string }): Node[] {
    return R.filter(R.propEq('type', params.type))(this.children);
  }

  findChild(params: { type: 'Footer' }): FooterNode;
  findChild(params: { type: 'Header' }): HeaderNode;
  findChild(params: { type: string }): Node {
    return R.find(R.propEq('type', params.type))(this.children);
  }

  addChild(node: Node) {
    if (node.parent) {
      throw new Error('Node already has a parent');
    }

    (node.parent as any) = this;

    this.children.push(node);
  }

  insertAfter(after: Node, node: Node) {
    if (node.parent) {
      throw new Error('Node already has a parent');
    }

    const index = R.findIndex(R.propEq('id', after.id))(this.children);

    if (index < 0) {
      return;
    }

    (this.children as any) = R.insert(index + 1, node)(this.children);
  }

  insertBefore(before: Node, node: Node) {
    if (node.parent) {
      throw new Error('Node already has a parent');
    }

    const index = R.findIndex(R.propEq('id', before.id))(this.children);

    if (index < 0) {
      return;
    }

    (this.children as any) = R.insert(index, node)(this.children);
  }

  updateAttributes(attributes: Partial<TAttributes>) {
    (this.attributes as any) = R.mergeDeepRight(this.attributes, attributes);
  }
}
