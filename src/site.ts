import R from 'ramda';

import { Config, Node, ID } from './types';

export default class Site {
  private _counter: number;
  private _config: Config;
  constructor(config?: Config) {
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

  createNode(params: {
    type: string;
    template?: string;
    attributes: any;
    parent: string;
    after?: string;
  }): Readonly<Node> {
    const node = {
      ...params,
      id: (this._counter++).toString(),
      children: [],
    };

    const parent = this._config.nodes[params.parent];

    if (!parent) {
      throw new Error('Parent node does not exist.');
    }

    this._config.nodes[node.id] = node;

    if (params.after) {
      const index = R.indexOf(params.after, parent.children);
      if (index >= 0) {
        parent.children = R.insert(index + 1, node.id)(parent.children);
      }
    } else {
      parent.children = [node.id, ...parent.children];
    }

    return node;
  }

  findNode(id: ID): Readonly<Node> | null {
    const node = this._config.nodes[id];

    if (!node) {
      return null;
    }

    return node;
  }

  updateNode(
    id: ID,
    params: {
      children?: string[];
      template?: string;
      attributes?: any;
    }
  ) {
    let node = this.findNode(id);

    if (!node) {
      return;
    }

    if (params.children) {
      if (
        R.intersection(node.children, params.children).length !==
        node.children.length
      ) {
        throw new Error('Can only rearrange children.');
      }

      node = { ...node, children: params.children };
    }

    if (params.template) {
      node = { ...node, template: params.template };
    }

    if (params.attributes) {
      const attributes = R.mergeDeepRight(node.attributes, params.attributes);
      node = {
        ...node,
        attributes,
      };
    }
  }

  deleteNode(id: ID) {
    const node = this.findNode(id);

    if (!node) {
      return;
    }
  }

  get config(): Readonly<Config> {
    return this._config;
  }
}
