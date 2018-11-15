declare type SerializedNode = {
    id: string;
    type: string;
    attributes: {
        [k: string]: any;
    };
    parent?: string;
    children: string[];
};
export default class Config {
    private nodes;
    readonly root: Node;
    constructor(config?: {
        [k: string]: SerializedNode;
    });
    findNode(id: string): Node | null;
    createNode(params: {
        type: string;
        attributes: any;
    }): Node;
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
declare class Node {
    readonly id: string;
    readonly type: string;
    readonly attributes: {
        [k: string]: any;
    };
    readonly parent?: Node;
    readonly children: Node[];
    constructor(params: {
        id?: string;
        type: string;
        attributes: {
            [k: string]: any;
        };
    });
    addChild(node: Node): void;
    insertAfter(after: Node, node: Node): void;
    insertBefore(before: Node, node: Node): void;
    updateAttributes(attributes: {
        [k: string]: any;
    }): void;
}
export {};
//# sourceMappingURL=config.d.ts.map