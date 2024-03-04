const url = location.origin + location.pathname;
const config = {
  development: {
    web: {
      name: 'web',
      url: 'http://localhost:3001/',
      baseroute: '/web',
    },
    mobile: {
      name: 'mobile',
      url: 'http://localhost:3002/',
      baseroute: '/mobile',
    },
  },
  production: {
    web: {
      name: 'web',
      url: `${url}packages/web`,
      baseroute: '/web',
    },
    mobile: {
      name: 'mobile',
      url: `${url}packages/mobile`,
      baseroute: '/mobile',
    }
  }
};
export default config[import.meta.env.VITE_APP_PACKAGES];
