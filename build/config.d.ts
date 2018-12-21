export declare type SiteAttributes = {
    id: string;
    subdomain: string;
    url: string;
    config: Config;
};
export declare type SerializedNode = {
    id: string;
    type: string;
    attributes: {
        [k: string]: any;
    };
    parent?: string | null;
    children: string[];
};
export declare type RootNodeAttributes = {
    title: string;
    description: string;
};
export declare type RootNode = Node<'Root', RootNodeAttributes>;
export declare type PageNodeAttributes = {
    path: string;
    title: string;
    frontPage?: boolean;
};
export declare type PageNode = Node<'Page', PageNodeAttributes>;
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
export declare type HeaderNodeAttributes = {
    template: 1 | 2 | 3 | 4 | 5;
    styles?: Styles;
    navStyles?: Styles;
    topStyles?: Styles;
};
export declare type HeaderNode = Node<'Header', HeaderNodeAttributes>;
export declare type FooterNodeAttributes = {
    template: 1 | 2 | 3 | 4 | 5;
    styles?: Styles;
    navStyles?: Styles;
};
export declare type FooterNode = Node<'Footer', FooterNodeAttributes>;
export declare type SectionNodeAttributes = {
    type: 'column' | 'row';
    size?: number;
    styles?: Styles;
};
export declare type SectionNode = Node<'Section', SectionNodeAttributes>;
export declare type HeadingNodeAttributes = {
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    text: string;
};
export declare type HeadingNode = Node<'Heading', HeadingNodeAttributes>;
export declare type TextNodeAttributes = {
    tag?: string;
    text: string;
};
export declare type TextNode = Node<'Text', TextNodeAttributes>;
export declare type ImageNodeAttributes = {
    src: string;
};
export declare type ImageNode = Node<'Image', ImageNodeAttributes>;
export declare type PlainTextNodeAttributes = {
    heading: string;
    content: string;
};
export declare type PlainTextNode = Node<'PlainText', PlainTextNodeAttributes>;
export declare type CarouselItemNodeAttributes = {
    src: string;
    altText?: string;
    caption?: string;
};
export declare type CarouselOptions = {
    items: number;
    loop: boolean;
    nav: boolean;
    rewind: boolean;
    autoplay: boolean;
};
export declare type CarouselNodeAttributes = {
    items: CarouselItemNodeAttributes[];
    options: CarouselOptions;
};
export declare type CarouselNode = Node<'Carousel', CarouselNodeAttributes>;
export declare type ProductAttributes = {
    link?: string;
    image: string;
    title: string;
    description: string;
};
export declare type MultiProductNodeAttributes = {
    items: ProductAttributes[];
};
export declare type MultiProductNode = Node<'MultiProduct', MultiProductNodeAttributes>;
export declare type GraphicPlateNodeAttributes = {
    image: string;
    heading: string;
    content: string;
};
export declare type GraphicPlateNode = Node<'GraphicPlate', GraphicPlateNodeAttributes>;
export declare type ImageAttributes = {
    link?: string;
    image: string;
};
export declare type PlainTextMultiPictureNodeAttributes = {
    items: ImageAttributes[];
    content: string;
};
export declare type PlainTextMultiPictureNode = Node<'PlainTextMultiPicture', PlainTextMultiPictureNodeAttributes>;
export declare type LargeSmallPicturePlateNodeAttributes = {
    smallImages: ImageAttributes[];
    largeImage: string;
};
export declare type LargeSmallPicturePlateNode = Node<'LargeSmallPicturePlate', LargeSmallPicturePlateNodeAttributes>;
export default class Config {
    private nodes;
    readonly root: RootNode;
    readonly header: HeaderNode;
    readonly footer: FooterNode;
    constructor(config?: {
        [k: string]: SerializedNode;
    });
    findNode(id: string): Node | null;
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
        type: 'PlainText';
        attributes: PlainTextNodeAttributes;
    }): PlainTextNode;
    createNode(params: {
        type: 'MultiProduct';
        attributes: MultiProductNodeAttributes;
    }): MultiProductNode;
    createNode(params: {
        type: 'PlainTextMultiPicture';
        attributes: PlainTextMultiPictureNodeAttributes;
    }): PlainTextMultiPictureNode;
    createNode(params: {
        type: 'GraphicPlate';
        attributes: GraphicPlateNodeAttributes;
    }): GraphicPlateNode;
    createNode(params: {
        type: 'LargeSmallPicturePlate';
        attributes: LargeSmallPicturePlateNodeAttributes;
    }): LargeSmallPicturePlateNode;
    createNode(params: {
        type: 'Carousel';
        attributes: CarouselNodeAttributes;
    }): CarouselNode;
    removeNode(node: Node): void;
    serialize(): {
        [index: string]: {
            id: string;
            type: string;
            attributes: {
                [k: string]: any;
            };
            parent: string | null;
            children: {};
        };
    };
}
export declare class Node<TType = string, TAttributes = {
    [k: string]: any;
}> {
    readonly id: string;
    readonly type: TType;
    readonly attributes: TAttributes;
    readonly parent?: Node;
    readonly children: Node[];
    constructor(params: {
        id?: string;
        type: TType;
        attributes: TAttributes;
    });
    findChildren(params: {
        type: 'Page';
    }): PageNode[];
    findChildren(params: {
        type: 'Footer';
    }): FooterNode[];
    findChildren(params: {
        type: 'Header';
    }): HeaderNode[];
    findChildren(params: {
        type: 'Section';
    }): SectionNode[];
    findChild(params: {
        type: 'Footer';
        attributes?: {
            path: string;
        } | undefined;
    }): FooterNode;
    findChild(params: {
        type: 'Header';
        attributes?: {
            path: string;
        } | undefined;
    }): HeaderNode;
    findChild(params: {
        type: 'Page';
        attributes?: {
            path: string;
        } | undefined;
    }): PageNode;
    addChild(node: Node): void;
    insertAfter(after: Node, node: Node): void;
    insertBefore(before: Node, node: Node): void;
    updateAttributes(attributes: Partial<TAttributes>): void;
}
//# sourceMappingURL=config.d.ts.map