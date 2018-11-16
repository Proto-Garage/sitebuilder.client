import Config from './config';

export { Config };

export default class {
  constructor(private token: string) {
    console.log(this.token);
  }
  async retrieveSite() {
    return {
      url: 'https://site.aonewallet.com',
      config: new Config(),
    };
  }
  async updateSite(params: { url?: string; config?: Config }) {
    console.log(params);
  }
}