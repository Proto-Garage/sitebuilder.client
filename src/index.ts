import Site from './site';

export { Site };

export default class {
  async retrieveSiteConfig() {
    return new Site();
  }
  async saveSiteConfig() {}
}
