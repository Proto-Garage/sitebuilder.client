declare type SerializedNode = {
    id: string;
    type: string;
    attributes: {
        [k: string]: any;
    };
    parent?: string;
    children: string[];
};
declare type RootNodeAttributes = {
    title: string;
    description: string;
};
declare type RootNode = Node<'Root', RootNodeAttributes>;
declare type PageNodeAttributes = {
    path: string;
    title: string;
};
declare type PageNode = Node<'Page', PageNodeAttributes>;
declare type HeaderNodeAttributes = {
    background: {
        color: string;
        image?: string;
    };
};
declare type FooterNodeAttributes = {
    background: {
        color: string;
        image?: string;
    };
};
declare type FooterNode = Node<'Footer', FooterNodeAttributes>;
declare type SectionNodeAttributes = {
    type: 'column' | 'row';
};
declare type SectionNode = Node<'Section', SectionNodeAttributes>;
declare type ImageNodeAttributes = {
    src: string;
};
declare type ImageNode = Node<'Image', ImageNodeAttributes>;
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
declare class Node<TType = string, TAttributes = {
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
    findChild(params: {
        type: string;
    }): Node | null;
    addChild(node: Node): void;
    insertAfter(after: Node, node: Node): void;
    insertBefore(before: Node, node: Node): void;
    updateAttributes(attributes: Partial<TAttributes>): void;
}
export {};
//# sourceMappingURL=config.d.ts.map