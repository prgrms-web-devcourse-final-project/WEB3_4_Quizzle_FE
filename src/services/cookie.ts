class Cookie {
  static set = (cookieName: string, cookieValue: string, cookieExpire?: Date, cookiePath?: string, cookieDomain?: string, cookieSecure?: string) => {
    let cookieText = escape(cookieName) + '=' + escape(cookieValue);

    cookieText += (cookieExpire ? '; EXPIRES=' + cookieExpire.toISOString() : '');
    cookieText += (cookiePath ? '; PATH=' + cookiePath : '');
    cookieText += (cookieDomain ? '; DOMAIN=' + cookieDomain : '');
    cookieText += (cookieSecure ? '; SECURE' : '');
    document.cookie = cookieText;
  }

  static get = (cookieName: string) => {
    const value = document.cookie.match('(^|;) ?' + cookieName + '=([^;]*)(;|$)');

    if (!!value) {
      return value[2];
    }
  }

  static delete = (cookieName: string) => {
    const temp = this.get(cookieName);

    if (temp) {
      this.set(cookieName, temp, (new Date(1)));
    }
  }
}

export default Cookie;