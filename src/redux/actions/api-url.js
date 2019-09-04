const GenerateApiUrls = function() {
  const DOMAIN = 'http://markusmaelzer-at.stackstaging.com';
  const ROOT_URL = '/cockpit';
  const API_TOKEN = '?token=47b491ec7e8b7c012f69d1eeb8e417';
  this.DOMAIN = DOMAIN;
  this.collection = (name) => `${DOMAIN}${ROOT_URL}/api/collections/get/${name}${API_TOKEN}`;
  this.singleton = (name) => `${DOMAIN}${ROOT_URL}/api/singletons/get/${name}${API_TOKEN}`;
}

export const API_URL = new GenerateApiUrls();