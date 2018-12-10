"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var R = __importStar(require("ramda"));
var uuid_1 = __importDefault(require("./uuid"));
var Config = (function () {
    function Config(config) {
        var _this = this;
        this.nodes = {};
        if (config) {
            this.root = new Node({
                id: 'root',
                type: 'Root',
                attributes: config.root.attributes,
            });
            this.nodes['root'] = this.root;
            var parse_1 = function (parent, id) {
                var serialized = config[id];
                var node = new Node(R.pick(['id', 'type', 'attributes'])(serialized));
                parent.addChild(node);
                _this.nodes[node.id] = node;
                for (var _i = 0, _a = serialized.children; _i < _a.length; _i++) {
                    var child = _a[_i];
                    parse_1(node, child);
                }
            };
            for (var _i = 0, _a = config.root.children; _i < _a.length; _i++) {
                var child = _a[_i];
                parse_1(this.root, child);
            }
        }
        else {
            this.root = new Node({
                id: 'root',
                type: 'Root',
                attributes: {},
            });
            this.nodes['root'] = this.root;
            var defaultPageNode = this.createNode({
                type: 'Page',
                attributes: {
                    path: '/',
                    frontPage: true,
                    title: 'Default Page',
                },
            });
            this.root.addChild(defaultPageNode);
            var headerNode = this.createNode({
                type: 'Header',
                attributes: {
                    template: 1,
                    styles: {},
                    navStyles: {},
                    topStyles: {},
                },
            });
            var footerNode = this.createNode({
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
    Config.prototype.findNode = function (id) {
        return this.nodes[id] || null;
    };
    Config.prototype.createNode = function (params) {
        var node = new Node(params);
        this.nodes[node.id] = node;
        return node;
    };
    Config.prototype.removeNode = function (node) {
        if (node.parent) {
            node.parent.children = R.filter(R.complement(R.propEq('id', node.id)))(node.parent.children);
        }
        delete this.nodes[node.id];
    };
    Config.prototype.serialize = function () {
        return R.mapObjIndexed(function (node) { return ({
            id: node.id,
            type: node.type,
            attributes: node.attributes,
            parent: node.parent ? node.parent.id : null,
            children: R.map(R.prop('id'))(node.children),
        }); })(this.nodes);
    };
    return Config;
}());
exports.default = Config;
var Node = (function () {
    function Node(params) {
        this.id = params.id || uuid_1.default();
        this.type = params.type;
        this.attributes = params.attributes;
        this.children = [];
    }
    Node.prototype.findChildren = function (params) {
        return R.filter(R.propEq('type', params.type))(this.children);
    };
    Node.prototype.findChild = function (params) {
        if (params === void 0) { params = {
            type: '',
            path: undefined,
        }; }
        if (params.path) {
            this.children = R.find(R.propEq('path', params.path))(this.children);
        }
        return R.find(R.propEq('type', params.type))(this.children);
    };
    Node.prototype.addChild = function (node) {
        if (node.parent) {
            throw new Error('Node already has a parent');
        }
        node.parent = this;
        this.children.push(node);
    };
    Node.prototype.insertAfter = function (after, node) {
        if (node.parent) {
            throw new Error('Node already has a parent');
        }
        var index = R.findIndex(R.propEq('id', after.id))(this.children);
        if (index < 0) {
            return;
        }
        this.children = R.insert(index + 1, node)(this.children);
    };
    Node.prototype.insertBefore = function (before, node) {
        if (node.parent) {
            throw new Error('Node already has a parent');
        }
        var index = R.findIndex(R.propEq('id', before.id))(this.children);
        if (index < 0) {
            return;
        }
        this.children = R.insert(index, node)(this.children);
    };
    Node.prototype.updateAttributes = function (attributes) {
        this.attributes = R.mergeDeepRight(this.attributes, attributes);
    };
    return Node;
}());
exports.Node = Node;
//# sourceMappingURL=config.js.map