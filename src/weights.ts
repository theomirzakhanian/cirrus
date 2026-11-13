// Written by scripts/weigh.mjs from the production build. Run `npm run weigh` to refresh.
export type WeightKey = 'gzip' | 'brotli' | 'raw'

export const weights = {
  "modules": 2093,
  "rows": [
    {
      "name": "JavaScript",
      "gzip": 106.4,
      "brotli": 91,
      "raw": 338.7
    },
    {
      "name": "Fonts",
      "gzip": 102.6,
      "brotli": 102.5,
      "raw": 102.5
    },
    {
      "name": "Images",
      "gzip": 31.6,
      "brotli": 31.5,
      "raw": 31.7
    },
    {
      "name": "CSS",
      "gzip": 11.3,
      "brotli": 9.3,
      "raw": 59.9
    },
    {
      "name": "HTML",
      "gzip": 0.5,
      "brotli": 0.3,
      "raw": 1.1
    }
  ],
  "files": [
    {
      "name": "dist/assets/index.css",
      "raw": "59.9 kB"
    },
    {
      "name": "dist/assets/index.js",
      "raw": "338.7 kB"
    },
    {
      "name": "dist/index.html",
      "raw": "1.1 kB"
    }
  ]
}
