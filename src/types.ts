export type ID = string;

export interface Node<TAttributes = { [k: string]: any }> {
  id: ID;
  type: string;
  children: ID[];
  parent: string;
  template?: string;
  attributes: TAttributes;
}

export interface Config {
  header: {
    template?: string;
    attributes: {
      backgroundImage?: string;
      backgroundColor?: string;
    };
  };
  footer: {
    template?: string;
    attributes: {
      backgroundImage?: string;
      backgroundColor?: string;
    };
  };
  nodes: {
    [k: string]: Node;
  };
}
