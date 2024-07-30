var config = null;

const KEY = 'pp_media_config';

const saveConfig = () => {
    localStorage.setItem(KEY, JSON.stringify(config));
};

const loadConfig = () => {
    try {
        if (localStorage.getItem(KEY)) {
            const config = JSON.parse(localStorage.getItem(KEY));
            return config;
        }
    } catch (err) { }

    return {};
};

const saveConfigOption = (option, value) => {
    config[option] = value;
    saveConfig();
};

const getConfigOption = (option, defVal) => {
    if (config[option] !== undefined && config[option]) {
        return config[option];
    }

    return defVal;
};

if (config === null) {
    config = loadConfig();
}

export {
    getConfigOption,
    saveConfigOption,
};
