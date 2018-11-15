"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
exports.Config = config_1.default;
class default_1 {
    async retrieveSite() {
        return {
            url: 'https://site.aonewallet.com',
            config: new config_1.default(),
        };
    }
    async updateSite(params) {
        console.log(params);
    }
}
exports.default = default_1;
//# sourceMappingURL=index.js.map