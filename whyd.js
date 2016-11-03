var DEFAULT_WHYD_ROOT = "https://openwhyd.org";
const fetch = require('node-fetch');

function WhydAPI(options){
    options = options || {};
    this.cookie = null;
    this.root = options.root || DEFAULT_WHYD_ROOT;
}

// FIXME : add cookie for logout

/*
WhydAPI.prototype.login = function(email, md5, cb){
    var self = this;
    get(this.root + "/login?action=login&ajax=1&email="+email+"&md5="+md5, {}, function(err, data, res){
        self.cookie = res && res.headers["set-cookie"];
        cb && cb(err, !!self.cookie);
    });
}

WhydAPI.prototype.logout = function(cb){
    get(this.root + "/login?action=logout", {cookie:this.cookie}, function(err, json){
        cb && cb(err, json);
    });
}

//    get(this.root + path, {cookie:this.cookie}});
*/

WhydAPI.prototype.get = function(path){
    return fetch(this.root + path)
}

module.exports = WhydAPI;
