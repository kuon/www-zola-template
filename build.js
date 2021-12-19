#!/usr/bin/env node

const postCssPlugin = require('esbuild-plugin-postcss2').default
const path = require('path')

const watch = process.argv.indexOf("watch") >= 0
const css = process.argv.indexOf("css") >= 0
const js = process.argv.indexOf("js") >= 0

let entries = []
if (js) entries.push('static/js/app.js')
if (css) entries.push('static/css/app.css')

if (watch) {
  process.stdin.on('end', () => process.exit(0))
  process.stdin.resume()
}

require('esbuild')
  .build({
    plugins: [
      postCssPlugin({
        plugins: [
          require('postcss-import')({
            path: [
              path.join(__dirname, 'static/css'),
              path.join(__dirname, 'static')
            ]
          }),
          require('postcss-url')({ url: 'inline' }),
          require('postcss-nested'),
          require('autoprefixer'),
          require('tailwindcss')()
        ]
      })
    ],
    logLevel: 'debug',
    external: ["*.jpg", "*.svg", "*.png", "*.woff", "*.woff2"],
    entryPoints: entries,
    entryNames: "[dir]/bundle",
    bundle: true,
    watch: watch,
    minify: process.env.NODE_ENV == "production",
    outdir: './static/',
    outbase: './static/',
  })
  .catch(() => process.exit(1))
