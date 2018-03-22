const colors = require('colors/safe');
const robotsParser = require('robots-parser');

module.exports = function createReport(
    robotsTxt,
    {
        robotsTxtUrl,
        destinationUrl,
        userAgent,
        print
    }
) {
    const robots = robotsParser(robotsTxtUrl.toString(), robotsTxt);
    const lines = robotsTxt.split(/\r?\n/);
    const isAllowed = robots.isAllowed(destinationUrl.toString(), userAgent);
    const sitemaps = robots.getSitemaps();
    const crawlDelay = robots.getCrawlDelay(userAgent);
    const preferredHost = robots.getPreferredHost();
    const matchingLineNumber = robots.getMatchingLineNumber(destinationUrl.toString(), userAgent);

    let reportText = '';

    if (print) {
        reportText += `${colors.bold('robots.txt content:')}\n\n${robotsTxt}\n\n`;
    }

    reportText += [
        colors.bold(`Report for page ${colors.blue(destinationUrl)}\n`),
        `User-agent: ${userAgent}`,
        `robots.txt: ${robotsTxtUrl}`,
        `Is allowed: ${(isAllowed || isAllowed === undefined) ? colors.green('yes') : colors.red('no')}\n`
    ].join('\n');

    if (matchingLineNumber !== undefined && matchingLineNumber !== -1) {
        reportText += `Matching line: ${colors.yellow(lines[matchingLineNumber - 1])}\n`;
    }

    if (sitemaps.length) {
        reportText += `Sitemaps: ${sitemaps.join(', ')}\n`;
    }

    if (crawlDelay) {
        reportText += `Crawl delay: ${crawlDelay}\n`;
    }

    if (preferredHost) {
        reportText += `Preferred host: ${preferredHost}\n`;
    }

    return reportText;
};
