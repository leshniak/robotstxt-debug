# robotstxt-debug 🤖

A tool for debugging robots.txt. Built on top of [node](https://nodejs.org) >= 8 and [robots-parser](https://github.com/samclarke/robots-parser).

## Installation

`npm install -g leshniak/robotstxt-debug`

## Usage
**Warning:** this tool is in alpha stage.
```
  Usage: robotstxt-debug [options] <url>

  A tool for debugging robots.txt

  Options:

    -v, --version                output the version number
    -u, --user-agent <name>      define custom User-agent (like in robots.txt, e.g. googlebot)
    -r, --robots-txt <url|file>  define custom robots.txt (loading from a file simulates the domain from the destination URL)
    -p, --print                  print robots.txt content
    -h, --help                   output usage information
```

## Example output
```
$ robotstxt-debug http://reddit.com/
Report for page http://reddit.com/

User-agent: *
robots.txt: http://reddit.com/robots.txt
Is allowed: yes
Matching line: Allow: /
Sitemaps: https://www.reddit.com/sitemaps/subreddit-sitemaps.xml, https://www.reddit.com/sitemaps/comment-page-sitemaps.xml
```

## Changes

### Version 0.1.0:
* Initial release.

## License
```
MIT License

Copyright (c) 2018 Maciej Leśniewski

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
