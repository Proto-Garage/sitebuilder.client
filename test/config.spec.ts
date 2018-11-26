import { expect } from 'chai';

import Config from '../src/config';

describe('Site', () => {
  describe('constructor', () => {
    describe('Given no parameter', () => {
      const site = new Config();

      it('should create root node', () => {
        expect(site.root).to.be.ok;
      });
    });

    describe('Given serialized config', () => {
      const site = new Config({
        root: {
          id: 'root',
          type: 'Root',
          attributes: {},
          children: ['0'],
        },
        '0': {
          id: '0',
          type: 'Page',
          attributes: {},
          children: ['1', '2', '3'],
          parent: 'root',
        },
        '1': {
          id: '1',
          type: 'Header',
          attributes: {},
          children: [],
          parent: '0',
        },
        '2': {
          id: '2',
          type: 'Section',
          attributes: {},
          children: [],
          parent: '0',
        },
        '3': {
          id: '3',
          type: 'Footer',
          attributes: {},
          children: [],
          parent: '0',
        },
      });

      it('should construct the tree structure', () => {
        expect(site.root).to.be.ok;
        expect(site.root.children).to.length(1);
        expect(site.root.children[0].children).to.length(3);
      });
    });
  });

  describe('createNode', () => {
    const site = new Config();

    it('should create node', () => {
      const node = site.createNode({
        type: 'Page',
        attributes: {
          path: '/',
          title: 'Default Page',
        },
      });

      expect(site.serialize()[node.id]).to.be.ok;
    });
  });

  describe('removeNode', () => {
    const site = new Config();

    const node = site.createNode({
      type: 'Page',
      attributes: {
        path: '/',
        title: 'Default Page',
      },
    });

    it('should remove node', () => {
      site.removeNode(node);

      expect(site.serialize()[node.id]).to.not.be.ok;
    });
  });
});
