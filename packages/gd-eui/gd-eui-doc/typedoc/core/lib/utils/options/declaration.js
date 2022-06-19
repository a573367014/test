"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultValue = exports.convert = exports.ParameterType = exports.ParameterHint = exports.EmitStrategy = void 0;
const path_1 = require("path");
exports.EmitStrategy = {
    true: true,
    false: false,
    both: "both",
    docs: "docs",
    none: "none", // Emit nothing, just convert and run validation
};
var ParameterHint;
(function (ParameterHint) {
    ParameterHint[ParameterHint["File"] = 0] = "File";
    ParameterHint[ParameterHint["Directory"] = 1] = "Directory";
})(ParameterHint = exports.ParameterHint || (exports.ParameterHint = {}));
var ParameterType;
(function (ParameterType) {
    ParameterType[ParameterType["String"] = 0] = "String";
    /**
     * Resolved according to the config directory.
     */
    ParameterType[ParameterType["Path"] = 1] = "Path";
    ParameterType[ParameterType["Number"] = 2] = "Number";
    ParameterType[ParameterType["Boolean"] = 3] = "Boolean";
    ParameterType[ParameterType["Map"] = 4] = "Map";
    ParameterType[ParameterType["Mixed"] = 5] = "Mixed";
    ParameterType[ParameterType["Array"] = 6] = "Array";
    /**
     * Resolved according to the config directory.
     */
    ParameterType[ParameterType["PathArray"] = 7] = "PathArray";
    /**
     * Resolved according to the config directory if it starts with `.`
     */
    ParameterType[ParameterType["ModuleArray"] = 8] = "ModuleArray";
    /**
     * Resolved according to the config directory unless it starts with `**`, after skipping any leading `!` and `#` characters.
     */
    ParameterType[ParameterType["GlobArray"] = 9] = "GlobArray";
    /**
     * An object with true/false flags
     */
    ParameterType[ParameterType["Flags"] = 10] = "Flags";
})(ParameterType = exports.ParameterType || (exports.ParameterType = {}));
const converters = {
    [ParameterType.String](value, option) {
        var _a;
        const stringValue = value == null ? "" : String(value);
        (_a = option.validate) === null || _a === void 0 ? void 0 : _a.call(option, stringValue);
        return stringValue;
    },
    [ParameterType.Path](value, option, configPath) {
        var _a;
        const stringValue = value == null ? "" : (0, path_1.resolve)(configPath, String(value));
        (_a = option.validate) === null || _a === void 0 ? void 0 : _a.call(option, stringValue);
        return stringValue;
    },
    [ParameterType.Number](value, option) {
        var _a;
        const numValue = parseInt(String(value), 10) || 0;
        if (!valueIsWithinBounds(numValue, option.minValue, option.maxValue)) {
            throw new Error(getBoundsError(option.name, option.minValue, option.maxValue));
        }
        (_a = option.validate) === null || _a === void 0 ? void 0 : _a.call(option, numValue);
        return numValue;
    },
    [ParameterType.Boolean](value) {
        return !!value;
    },
    [ParameterType.Array](value, option) {
        var _a;
        let strArrValue = new Array();
        if (Array.isArray(value)) {
            strArrValue = value.map(String);
        }
        else if (typeof value === "string") {
            strArrValue = [value];
        }
        (_a = option.validate) === null || _a === void 0 ? void 0 : _a.call(option, strArrValue);
        return strArrValue;
    },
    [ParameterType.PathArray](value, option, configPath) {
        var _a;
        let strArrValue = new Array();
        if (Array.isArray(value)) {
            strArrValue = value.map(String);
        }
        else if (typeof value === "string") {
            strArrValue = [value];
        }
        strArrValue = strArrValue.map((path) => (0, path_1.resolve)(configPath, path));
        (_a = option.validate) === null || _a === void 0 ? void 0 : _a.call(option, strArrValue);
        return strArrValue;
    },
    [ParameterType.ModuleArray](value, option, configPath) {
        var _a;
        let strArrValue = new Array();
        if (Array.isArray(value)) {
            strArrValue = value.map(String);
        }
        else if (typeof value === "string") {
            strArrValue = [value];
        }
        strArrValue = resolveModulePaths(strArrValue, configPath);
        (_a = option.validate) === null || _a === void 0 ? void 0 : _a.call(option, strArrValue);
        return strArrValue;
    },
    [ParameterType.GlobArray](value, option, configPath) {
        var _a;
        let strArrValue = new Array();
        if (Array.isArray(value)) {
            strArrValue = value.map(String);
        }
        else if (typeof value === "string") {
            strArrValue = [value];
        }
        strArrValue = resolveGlobPaths(strArrValue, configPath);
        (_a = option.validate) === null || _a === void 0 ? void 0 : _a.call(option, strArrValue);
        return strArrValue;
    },
    [ParameterType.Map](value, option) {
        var _a;
        const key = String(value);
        if (option.map instanceof Map) {
            if (option.map.has(key)) {
                return option.map.get(key);
            }
            else if ([...option.map.values()].includes(value)) {
                return value;
            }
        }
        else if (key in option.map) {
            if (isTsNumericEnum(option.map) && typeof value === "number") {
                return value;
            }
            return option.map[key];
        }
        else if (Object.values(option.map).includes(value)) {
            return value;
        }
        throw new Error((_a = option.mapError) !== null && _a !== void 0 ? _a : getMapError(option.map, option.name));
    },
    [ParameterType.Mixed](value, option) {
        var _a;
        (_a = option.validate) === null || _a === void 0 ? void 0 : _a.call(option, value);
        return value;
    },
    [ParameterType.Flags](value, option) {
        if (typeof value === "boolean") {
            value = Object.fromEntries(Object.keys(option.defaults).map((key) => [key, value]));
        }
        if (typeof value !== "object" || value == null) {
            throw new Error(`Expected an object with flag values for ${option.name} or true/false`);
        }
        const obj = { ...value };
        for (const key of Object.keys(obj)) {
            if (!Object.prototype.hasOwnProperty.call(option.defaults, key)) {
                throw new Error(`The flag '${key}' is not valid for ${option.name}, expected one of: ${Object.keys(option.defaults).join(", ")}`);
            }
            if (typeof obj[key] !== "boolean") {
                // Explicit null/undefined, switch to default.
                if (obj[key] == null) {
                    obj[key] = option.defaults[key];
                }
                else {
                    throw new Error(`Flag values for ${option.name} must be a boolean.`);
                }
            }
        }
        return obj;
    },
};
/**
 * The default conversion function used by the Options container. Readers may
 * re-use this conversion function or implement their own. The arguments reader
 * implements its own since 'false' should not be converted to true for a boolean option.
 * @param value The value to convert.
 * @param option The option for which the value should be converted.
 * @returns The result of the conversion. Might be the value or an error.
 */
function convert(value, option, configPath) {
    var _a;
    const _converters = converters;
    return _converters[(_a = option.type) !== null && _a !== void 0 ? _a : ParameterType.String](value, option, configPath);
}
exports.convert = convert;
const defaultGetters = {
    [ParameterType.String](option) {
        var _a;
        return (_a = option.defaultValue) !== null && _a !== void 0 ? _a : "";
    },
    [ParameterType.Path](option) {
        var _a;
        const defaultStr = (_a = option.defaultValue) !== null && _a !== void 0 ? _a : "";
        if (defaultStr == "") {
            return "";
        }
        return (0, path_1.isAbsolute)(defaultStr)
            ? defaultStr
            : (0, path_1.join)(process.cwd(), defaultStr);
    },
    [ParameterType.Number](option) {
        var _a;
        return (_a = option.defaultValue) !== null && _a !== void 0 ? _a : 0;
    },
    [ParameterType.Boolean](option) {
        var _a;
        return (_a = option.defaultValue) !== null && _a !== void 0 ? _a : false;
    },
    [ParameterType.Map](option) {
        return option.defaultValue;
    },
    [ParameterType.Mixed](option) {
        return option.defaultValue;
    },
    [ParameterType.Array](option) {
        var _a;
        return (_a = option.defaultValue) !== null && _a !== void 0 ? _a : [];
    },
    [ParameterType.PathArray](option) {
        var _a, _b;
        return ((_b = (_a = option.defaultValue) === null || _a === void 0 ? void 0 : _a.map((value) => (0, path_1.resolve)(process.cwd(), value))) !== null && _b !== void 0 ? _b : []);
    },
    [ParameterType.ModuleArray](option) {
        var _a, _b;
        return ((_b = (_a = option.defaultValue) === null || _a === void 0 ? void 0 : _a.map((value) => value.startsWith(".") ? (0, path_1.resolve)(process.cwd(), value) : value)) !== null && _b !== void 0 ? _b : []);
    },
    [ParameterType.GlobArray](option) {
        var _a;
        return resolveGlobPaths((_a = option.defaultValue) !== null && _a !== void 0 ? _a : [], process.cwd());
    },
    [ParameterType.Flags](option) {
        return { ...option.defaults };
    },
};
function getDefaultValue(option) {
    var _a;
    const getters = defaultGetters;
    return getters[(_a = option.type) !== null && _a !== void 0 ? _a : ParameterType.String](option);
}
exports.getDefaultValue = getDefaultValue;
function resolveGlobPaths(globs, configPath) {
    return globs.map((path) => {
        var _a, _b;
        const start = (_b = (_a = path.match(/^[!#]+/)) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : "";
        const remaining = path.substr(start.length);
        if (!remaining.startsWith("**")) {
            return start + (0, path_1.resolve)(configPath, remaining);
        }
        return start + remaining;
    });
}
function resolveModulePaths(modules, configPath) {
    return modules.map((path) => {
        if (path.startsWith(".")) {
            return (0, path_1.resolve)(configPath, path);
        }
        return path;
    });
}
function isTsNumericEnum(map) {
    return Object.values(map).every((key) => map[map[key]] === key);
}
/**
 * Returns an error message for a map option, indicating that a given value was not one of the values within the map.
 * @param map The values for the option.
 * @param name The name of the option.
 * @returns The error message.
 */
function getMapError(map, name) {
    let keys = map instanceof Map ? [...map.keys()] : Object.keys(map);
    // If the map is a TS numeric enum we need to filter out the numeric keys.
    // TS numeric enums have the property that every key maps to a value, which maps back to that key.
    if (!(map instanceof Map) && isTsNumericEnum(map)) {
        // This works because TS enum keys may not be numeric.
        keys = keys.filter((key) => Number.isNaN(parseInt(key, 10)));
    }
    return `${name} must be one of ${keys.join(", ")}`;
}
/**
 * Returns an error message for a value that is out of bounds of the given min and/or max values.
 * @param name The name of the thing the value represents.
 * @param minValue The lower bound of the range of allowed values.
 * @param maxValue The upper bound of the range of allowed values.
 * @returns The error message.
 */
function getBoundsError(name, minValue, maxValue) {
    if (isFiniteNumber(minValue) && isFiniteNumber(maxValue)) {
        return `${name} must be between ${minValue} and ${maxValue}`;
    }
    else if (isFiniteNumber(minValue)) {
        return `${name} must be >= ${minValue}`;
    }
    else {
        return `${name} must be <= ${maxValue}`;
    }
}
/**
 * Checks if the given value is a finite number.
 * @param value The value being checked.
 * @returns True, if the value is a finite number, otherwise false.
 */
function isFiniteNumber(value) {
    return Number.isFinite(value);
}
/**
 * Checks if a value is between the bounds of the given min and/or max values.
 * @param value The value being checked.
 * @param minValue The lower bound of the range of allowed values.
 * @param maxValue The upper bound of the range of allowed values.
 * @returns True, if the value is within the given bounds, otherwise false.
 */
function valueIsWithinBounds(value, minValue, maxValue) {
    if (isFiniteNumber(minValue) && isFiniteNumber(maxValue)) {
        return minValue <= value && value <= maxValue;
    }
    else if (isFiniteNumber(minValue)) {
        return minValue <= value;
    }
    else if (isFiniteNumber(maxValue)) {
        return value <= maxValue;
    }
    else {
        return true;
    }
}
