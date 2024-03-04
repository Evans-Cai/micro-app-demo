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
    h5: {
      name: 'h5',
      url: 'http://localhost:3003/',
      baseroute: '/h5',
    },
  },
  production: {
    web: {
      name: 'web',
      url: `${import.meta.env.VITE_APP_WEB_URL}/packages/web`,
      baseroute: '/web',
    },
    mobile: {
      name: 'mobile',
      url: `${import.meta.env.VITE_APP_WEB_URL}//packages/mobile`,
      baseroute: '/mobile',
    },
    h5: {
      name: 'h5',
      url: `${import.meta.env.VITE_APP_WEB_URL}/packages/h5`,
      baseroute: '/h5',
    },
  }
};
export default config[import.meta.env.VITE_APP_PACKAGES];
