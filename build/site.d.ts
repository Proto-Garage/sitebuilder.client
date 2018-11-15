import { Config, Node, ID } from './types';
export default class Site {
  private _counter;
  private _config;
  constructor(config?: Config);
  createNode(params: {
    type: string;
    template?: string;
    attributes: any;
    parent: string;
    after?: string;
  }): Readonly<Node>;
  findNode(id: ID): Readonly<Node> | null;
  updateNode(
    id: ID,
    params: {
      children?: string[];
      template?: string;
      attributes?: any;
    }
  ): void;
  deleteNode(id: ID): void;
  readonly config: Readonly<Config>;
}
//# sourceMappingURL=site.d.ts.map
