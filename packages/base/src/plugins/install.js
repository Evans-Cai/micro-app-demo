// Moment
import Moment from 'moment';
// MD5
import Md5 from 'js-md5';
// base62
import Base62 from '@pluve/base62';
// jscrypto
import { RSADecrypt } from '@/utils/jscrypto.js';
export default {
  install: (app) => {
    app.config.globalProperties['$moment'] = Moment;
    app.config.globalProperties['$Base62'] = Base62;
    app.config.globalProperties['$md5'] = Md5;
    app.config.globalProperties['$getRsaCode'] = RSADecrypt;
  }
}
