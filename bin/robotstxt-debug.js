#!/usr/bin/env node

const fs = require('fs');
const {URL} = require('url');
const colors = require('colors/safe');
const program = require('commander');
const axios = require('axios');

const pkg = require('../package.json');
const createReport = require('./report');

program
    .version(pkg.version, '-v, --version')
    .description(pkg.description)
    .usage('[options] <url>')
    .option('-u, --user-agent <name>', 'define custom User-agent (like in robots.txt, e.g. googlebot)')
    .option('-r, --robots-txt <url|file>', 'define custom robots.txt (loading from a file simulates the domain from the destination URL)')
    .option('-p, --print', 'print robots.txt content')
    .parse(process.argv);

if (!program.args.length) {
    program.help();
}

const httpUrl = /^https?:\/\//i;
const userAgent = program.userAgent || '*';

let destinationUrl;
let robotsTxtUrl;

try {
    destinationUrl = new URL(program.args[0]);

    if (program.robotsTxt) {
        robotsTxtUrl = httpUrl.test(program.robotsTxt) ? new URL(program.robotsTxt) : program.robotsTxt;
    } else {
        robotsTxtUrl = new URL(`${destinationUrl.origin}/robots.txt`);
    }
} catch (error) {
    console.error(`Error while parsing URLs:\n${error.message}.`);
    process.exit(1);
}

let robotsTxtQuery;

if (httpUrl.test(robotsTxtUrl)) {
    robotsTxtQuery = axios.get(robotsTxtUrl.toString())
        .then((robotsTxtResponse) => robotsTxtResponse.data)
        .catch(({response}) => {
            console.warn(colors.yellow(`Warning: Cannot fetch robots.txt: HTTP ${response.status} ${response.statusText}\n`));
            return '';
        });
} else {
    robotsTxtQuery = new Promise((resolve, reject) => {
        fs.readFile(robotsTxtUrl, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            robotsTxtUrl = new URL(`${destinationUrl.origin}/robots.txt`);
            resolve(data);
        });
    });
}

robotsTxtQuery
    .then((robotsTxt) => createReport(
        robotsTxt,
        {robotsTxtUrl, destinationUrl, userAgent, print: program.print}
    ))
    .then(console.log)
    .catch((error) => {
        console.error(`Error:\n${error.message}.`);
        process.exit(2);
    });
