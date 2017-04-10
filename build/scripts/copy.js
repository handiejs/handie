#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const execSync = require("child_process").execSync;

const dir = path.resolve(__dirname, "../../.handie-tmp/vendors");

if ( fs.existsSync(dir) ) {
  fs.readdirSync(dir).forEach(function( d ) {
    let p = path.resolve(dir, d);
    let regexp = /\-(\d+\.?)+/;

    if ( d.charAt(0) !== "." && fs.statSync(p).isDirectory() ) {
      if ( regexp.test(d) ) {
        let newPath = path.resolve(dir, `../../dist/${d.replace(regexp, "")}`);

        if ( fs.existsSync(newPath) ) {
          execSync(`rm -rf ${newPath}`);
        }

        execSync(`mv ${p} ${newPath}`);
      }
      else {
        execSync(`rm -rf ${p}`);
      }
    }
  });

  execSync(`rm -rf ${dir}`);
}