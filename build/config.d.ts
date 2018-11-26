export declare type SerializedNode = {
    id: string;
    type: string;
    attributes: {
        [k: string]: any;
    };
    parent?: string;
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
};
export declare type PageNode = Node<'Page', PageNodeAttributes>;
export declare type HeaderNodeAttributes = {
    background: {
        color: string;
        image?: string;
    };
};
export declare type HeaderNode = Node<'Header', HeaderNodeAttributes>;
export declare type FooterNodeAttributes = {
    background: {
        color: string;
        image?: string;
    };
};
export declare type FooterNode = Node<'Footer', FooterNodeAttributes>;
export declare type SectionNodeAttributes = {
    type: 'column' | 'row';
};
export declare type SectionNode = Node<'Section', SectionNodeAttributes>;
export declare type ImageNodeAttributes = {
    src: string;
};
export declare type ImageNode = Node<'Image', ImageNodeAttributes>;
export default class Config {
    private nodes;
    readonly root: RootNode;
    constructor(config?: {
        [k: string]: SerializedNode;
    });
    findNode(id: string): Node<"Root", RootNodeAttributes> | Node<"Page", PageNodeAttributes> | Node<"Header", HeaderNodeAttributes> | Node<"Footer", FooterNodeAttributes> | Node<"Section", SectionNodeAttributes> | Node<"Image", ImageNodeAttributes>;
    createNode(params: {
        type: 'Page';
        attributes: PageNodeAttributes;
    }): PageNode;
    createNode(params: {
        type: 'Header';
        attributes: HeaderNodeAttributes;
    }): PageNode;
    createNode(params: {
        type: 'Footer';
        attributes: FooterNodeAttributes;
    }): FooterNode;
    createNode(params: {
        type: 'Section';
        attributes: SectionNodeAttributes;
    }): SectionNode;
    createNode(params: {
        type: 'Image';
        attributes: ImageNodeAttributes;
    }): ImageNode;
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
        type: string;
    }): Node[];
    addChild(node: Node): void;
    insertAfter(after: Node, node: Node): void;
    insertBefore(before: Node, node: Node): void;
    updateAttributes(attributes: Partial<TAttributes>): void;
}
//# sourceMappingURL=config.d.ts.map