let ls = window.localStorage;
let ss = window.sessionStorage;

export default {
    local: {
        get: function(k) {
            return JSON.parse(ls.getItem(k) || null);
        },
        set: function(k, v) {
            ls.setItem(k, JSON.stringify(v));
        },
        remove: function(k) {
            return ls.removeItem(k);
        },
        clear: function() {
            return ls.clear();
        },
    },
    session: {
        get: function(k) {
            return JSON.parse(ss.getItem(k) || null);
        },
        set: function(k, v) {
            ss.setItem(k, JSON.stringify(v));
        },
        remove: function(k) {
            return ss.removeItem(k);
        },
        clear: function() {
            return ss.clear();
        },
    },
}