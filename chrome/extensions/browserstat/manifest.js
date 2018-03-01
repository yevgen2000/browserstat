{
  "manifest_version": 2,
  "name": "Page visits stat",
  "version": "1.0",
  "icons": {
    "128": "glasses.png"
  },
  "content_scripts": [
    {
      "matches": [ "*://*/*" ],
      "js": [ "content.js", "jquery-3.3.1.min.js" ]
    }
  ],
  "permissions": [
    "http://localhost/api/v1/*"
  ],
  "browser_action": {
    "default_title": "Site visits statistic",
    "default_icon": "glasses.png",
    "default_popup": "popup.html"
  },
}
