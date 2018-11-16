"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = __importDefault(require("ramda"));
const uuid_1 = __importDefault(require("./uuid"));
class Config {
    constructor(config) {
        this.nodes = {};
        if (config) {
            this.root = new Node({
                id: 'root',
                type: 'Root',
                attributes: config.root.attributes,
            });
            this.nodes['root'] = this.root;
            const parse = (parent, id) => {
                const serialized = config[id];
                const node = new Node(ramda_1.default.pick(['id', 'type', 'attributes'])(serialized));
                parent.addChild(node);
                for (const child of serialized.children) {
                    parse(node, child);
                }
            };
            for (const child of config.root.children) {
                parse(this.root, child);
            }
        }
        else {
            this.root = new Node({
                id: 'root',
                type: 'Root',
                attributes: {},
            });
            this.nodes['root'] = this.root;
        }
    }
    findNode(id) {
        return (this.nodes[id] || null);
    }
    createNode(params) {
        const node = new Node(params);
        this.nodes[node.id] = node;
        return node;
    }
    removeNode(node) {
        if (node.parent) {
            node.parent.children = ramda_1.default.filter(ramda_1.default.complement(ramda_1.default.propEq('id', node.id)))(node.parent.children);
        }
        delete this.nodes[node.id];
    }
    serialize() {
        return ramda_1.default.mapObjIndexed((node) => ({
            id: node.id,
            type: node.type,
            attributes: node.attributes,
            parent: node.parent ? node.parent.id : null,
            children: ramda_1.default.map(ramda_1.default.prop('id'))(node.children),
        }))(this.nodes);
    }
}
exports.default = Config;
class Node {
    constructor(params) {
        this.id = params.id || uuid_1.default();
        this.type = params.type;
        this.attributes = params.attributes;
        this.children = [];
    }
    findChild(params) {
        return ramda_1.default.find(ramda_1.default.propEq('type', params.type))(this.children);
    }
    addChild(node) {
        if (node.parent) {
            throw new Error('Node already has a parent');
        }
        node.parent = this;
        this.children.push(node);
    }
    insertAfter(after, node) {
        if (node.parent) {
            throw new Error('Node already has a parent');
        }
        const index = ramda_1.default.findIndex(ramda_1.default.propEq('id', after.id))(this.children);
        if (index < 0) {
            return;
        }
        this.children = ramda_1.default.insert(index + 1, node)(this.children);
    }
    insertBefore(before, node) {
        if (node.parent) {
            throw new Error('Node already has a parent');
        }
        const index = ramda_1.default.findIndex(ramda_1.default.propEq('id', before.id))(this.children);
        if (index < 0) {
            return;
        }
        this.children = ramda_1.default.insert(index, node)(this.children);
    }
    updateAttributes(attributes) {
        this.attributes = ramda_1.default.mergeDeepRight(this.attributes, attributes);
    }
}
//# sourceMappingURL=config.js.map