/* global window */
import cookie from 'react-cookies';

class Logger {
  static genPrefix(logType, logColor, isIE) {
    return isIE
      ? [`[ ${logType} ]`]
      : [`[ %c${logType}%c ]`, `color: ${logColor}`, 'color: black'];
  }

  constructor() {
    this.LEVEL = {
      /* unused solarized color : #859900 */
      NONE: {
        color: null,
        priority: 0,
      },
      INFO: {
        color: '#268bd2',
        priority: 1,
      },
      WARN: {
        color: '#b58900',
        priority: 2,
      },
      ERROR: {
        color: '#dc322f',
        priority: 3,
      },
      FATAL: {
        color: '#d33682',
        priority: 4,
      },
      DEBUG: {
        color: '#6c71c4',
        priority: 5,
      },
      TRACE: {
        color: '#2aa198',
        priority: 6,
      },
      ALL: {
        color: null,
        priority: 7,
      },
    };
    // const gitTag = GIT_TAG || ''; // eslint-disable-line no-undef
    const allCookies = cookie.loadAll();
    this.isIE = window.navigator.languages === undefined;
    if (window) {
      window.logLevel = window.logLevel
        || (allCookies.loglevel && allCookies.loglevel.toUpperCase())
        || 'NONE';
    }
    if (window.logLevel && window.logLevel === 'NONE' && window.location.hostname === 'localhost') window.logLevel = 'DEBUG';

    this.logLevel = (window && window.logLevel && this.LEVEL[window.logLevel]) ? window.logLevel : 'NONE';
    this.consoleLog('INFO', [`

      ███████╗██╗      █████╗ ███████╗██╗  ██╗██╗   ██╗
      ██╔════╝██║     ██╔══██╗██╔════╝██║  ██║╚██╗ ██╔╝
      █████╗  ██║     ███████║███████╗███████║ ╚████╔╝ 
      ██╔══╝  ██║     ██╔══██║╚════██║██╔══██║  ╚██╔╝  
      ██║     ███████╗██║  ██║███████║██║  ██║   ██║   
      ╚═╝     ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝   
      Logging Level ${this.logLevel}
    `]);
  }

  consoleLog(level, args) {
    const maxPriority = this.LEVEL[this.logLevel].priority;
    const incomingPriority = this.LEVEL[level].priority;
    if (incomingPriority > maxPriority) return;

    if (this.LEVEL[level].color === null) return;
    const prefix = this.constructor.genPrefix(level, this.LEVEL[level].color || 'black', this.isIE);
    console.log(...prefix, ...args); // eslint-disable-line no-console
  }

  updateLogLevel(level) {
    if (window) window.logLevel = this.LEVEL[level] || this.LEVEL.NONE;
    this.logLevel = this.LEVEL[level] || this.LEVEL.NONE;
  }

  info(...args) { this.consoleLog('INFO', args); }
  warn(...args) { this.consoleLog('WARN', args); }
  error(...args) { this.consoleLog('ERROR', args); }
  fatal(...args) { this.consoleLog('FATAL', args); }
  debug(...args) { this.consoleLog('DEBUG', args); }
  trace(...args) { this.consoleLog('TRACE', args); }
  all(...args) { this.consoleLog('ALL', args); }
}

export default new Logger();
