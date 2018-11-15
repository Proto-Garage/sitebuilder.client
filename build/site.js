'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const ramda_1 = __importDefault(require('ramda'));
class Site {
  constructor(config) {
    this._counter = 0;
    if (config) {
      this._config = config;
    } else {
      this._config = config || {
        header: {
          attributes: {},
        },
        footer: {
          attributes: {},
        },
        nodes: {
          root: {
            id: 'root',
            type: 'Root',
            parent: '',
            children: [],
            attributes: {},
          },
        },
      };
    }
  }
  createNode(params) {
    const node = Object.assign({}, params, {
      id: (this._counter++).toString(),
      children: [],
    });
    const parent = this._config.nodes[params.parent];
    if (!parent) {
      throw new Error('Parent node does not exist.');
    }
    this._config.nodes[node.id] = node;
    if (params.after) {
      const index = ramda_1.default.indexOf(params.after, parent.children);
      if (index >= 0) {
        parent.children = ramda_1.default.insert(index + 1, node.id)(
          parent.children
        );
      }
    } else {
      parent.children = [node.id, ...parent.children];
    }
    return node;
  }
  findNode(id) {
    const node = this._config.nodes[id];
    if (!node) {
      return null;
    }
    return node;
  }
  updateNode(id, params) {
    let node = this.findNode(id);
    if (!node) {
      return;
    }
    if (params.children) {
      if (
        ramda_1.default.intersection(node.children, params.children).length !==
        node.children.length
      ) {
        throw new Error('Can only rearrange children.');
      }
      node = Object.assign({}, node, { children: params.children });
    }
    if (params.template) {
      node = Object.assign({}, node, { template: params.template });
    }
    if (params.attributes) {
      const attributes = ramda_1.default.mergeDeepRight(
        node.attributes,
        params.attributes
      );
      node = Object.assign({}, node, { attributes });
    }
  }
  deleteNode(id) {
    const node = this.findNode(id);
    if (!node) {
      return;
    }
  }
  get config() {
    return this._config;
  }
}
exports.default = Site;
//# sourceMappingURL=site.js.map
