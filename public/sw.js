/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "favicon.ico",
    "revision": "deff56634ba8c08b5a702a46ad32bf39"
  },
  {
    "url": "favicon.png",
    "revision": "183df8b9184a2e7b964e261b7ab194d7"
  },
  {
    "url": "fgpe-logo.jpg",
    "revision": "638d3dc32035be1e5b6b2e2aa76b4955"
  },
  {
    "url": "img/icons/android-chrome-192x192.png",
    "revision": "c0ab3b3fca9f6f6c0c7f541a1c4f8456"
  },
  {
    "url": "img/icons/android-chrome-512x512.png",
    "revision": "97a2ab2bfa4166c32a43032e465f86aa"
  },
  {
    "url": "img/icons/apple-touch-icon-114x114.png",
    "revision": "b85287cf507eed040c7cc48f4f369787"
  },
  {
    "url": "img/icons/apple-touch-icon-120x120.png",
    "revision": "8189ffc16d52c085c6e1ff57ecafd594"
  },
  {
    "url": "img/icons/apple-touch-icon-144x144.png",
    "revision": "08ea6441613e51a98d88ee809abdc67a"
  },
  {
    "url": "img/icons/apple-touch-icon-152x152.png",
    "revision": "fc0720e0b70979c54f700b50d57843fa"
  },
  {
    "url": "img/icons/apple-touch-icon-180x180.png",
    "revision": "c56ea7657b57d98c5e618e03c3fe3764"
  },
  {
    "url": "img/icons/apple-touch-icon-60x60.png",
    "revision": "b6f9fbe0baffb233ef5e32a232054c88"
  },
  {
    "url": "img/icons/apple-touch-icon-76x76.png",
    "revision": "6362e7c2b58ed47d4340f75b3661aeb4"
  },
  {
    "url": "img/icons/apple-touch-icon.png",
    "revision": "f7a1ea8da2da1a862a77418d3503d5f0"
  },
  {
    "url": "img/icons/favicon-16x16.png",
    "revision": "853305ee4c5abf2b89995bf11692ab61"
  },
  {
    "url": "img/icons/favicon-32x32.png",
    "revision": "183df8b9184a2e7b964e261b7ab194d7"
  },
  {
    "url": "img/icons/msapplication-icon-144x144.png",
    "revision": "08ea6441613e51a98d88ee809abdc67a"
  },
  {
    "url": "img/icons/mstile-150x150.png",
    "revision": "68a5412f813e546f028f510fe4537e85"
  },
  {
    "url": "img/icons/safari-pinned-tab.svg",
    "revision": "c9a79edaef66feac2fa3c453b763d0b5"
  },
  {
    "url": "index.html",
    "revision": "bf7772da59a68a40ee0f1aa5b2655940"
  },
  {
    "url": "loader.css",
    "revision": "c354a172eae9325ed3e7e4da4d01bbe9"
  },
  {
    "url": "logo-nocaption.svg",
    "revision": "1dacf386951ea43040bfac11456404e6"
  },
  {
    "url": "logo.svg",
    "revision": "344858ecaaef05a322ef08e826c6907a"
  },
  {
    "url": "manifest.json",
    "revision": "7eb6cbc60c5808d69a7bd3b3b78a18b7"
  },
  {
    "url": "robots.txt",
    "revision": "b6216d61c03e6ce0c9aea6ca7808f7ca"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
