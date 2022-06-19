'use strict';
const __createBinding =
    (this && this.__createBinding) ||
    (Object.create
        ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              Object.defineProperty(o, k2, {
                  enumerable: true,
                  get: function () {
                      return m[k];
                  },
              });
          }
        : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
          });
const __exportStar =
    (this && this.__exportStar) ||
    function (m, exports) {
        for (const p in m)
            if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports, p))
                __createBinding(exports, m, p);
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.TypeScript =
    exports.SerializeEvent =
    exports.SerializerComponent =
    exports.Serializer =
    exports.JSONOutput =
    exports.EventHooks =
    exports.EntryPointStrategy =
    exports.TypeDocReader =
    exports.TSConfigReader =
    exports.ParameterType =
    exports.ParameterHint =
    exports.Options =
    exports.Logger =
    exports.LogLevel =
    exports.JSX =
    exports.BindOption =
    exports.ArgumentsReader =
    exports.MarkdownEvent =
    exports.RendererEvent =
    exports.PageEvent =
    exports.Theme =
    exports.UrlMapping =
    exports.DefaultThemeRenderContext =
    exports.DefaultTheme =
    exports.Renderer =
    exports.Context =
    exports.Converter =
    exports.normalizePath =
    exports.resetReflectionID =
    exports.Event =
    exports.EventDispatcher =
    exports.Application =
        // eslint-disable-next-line no-void
        void 0;
const application_1 = require('./lib/application');

Object.defineProperty(exports, 'Application', {
    enumerable: true,
    get: function () {
        return application_1.Application;
    },
});
const events_1 = require('./lib/utils/events');

Object.defineProperty(exports, 'EventDispatcher', {
    enumerable: true,
    get: function () {
        return events_1.EventDispatcher;
    },
});
Object.defineProperty(exports, 'Event', {
    enumerable: true,
    get: function () {
        return events_1.Event;
    },
});
const abstract_1 = require('./lib/models/reflections/abstract');

Object.defineProperty(exports, 'resetReflectionID', {
    enumerable: true,
    get: function () {
        return abstract_1.resetReflectionID;
    },
});
const fs_1 = require('./lib/utils/fs');

Object.defineProperty(exports, 'normalizePath', {
    enumerable: true,
    get: function () {
        return fs_1.normalizePath;
    },
});
__exportStar(require('./lib/models'), exports);
const converter_1 = require('./lib/converter');

Object.defineProperty(exports, 'Converter', {
    enumerable: true,
    get: function () {
        return converter_1.Converter;
    },
});
Object.defineProperty(exports, 'Context', {
    enumerable: true,
    get: function () {
        return converter_1.Context;
    },
});
const output_1 = require('./lib/output');

Object.defineProperty(exports, 'Renderer', {
    enumerable: true,
    get: function () {
        return output_1.Renderer;
    },
});
Object.defineProperty(exports, 'DefaultTheme', {
    enumerable: true,
    get: function () {
        return output_1.DefaultTheme;
    },
});
Object.defineProperty(exports, 'DefaultThemeRenderContext', {
    enumerable: true,
    get: function () {
        return output_1.DefaultThemeRenderContext;
    },
});
Object.defineProperty(exports, 'UrlMapping', {
    enumerable: true,
    get: function () {
        return output_1.UrlMapping;
    },
});
Object.defineProperty(exports, 'Theme', {
    enumerable: true,
    get: function () {
        return output_1.Theme;
    },
});
Object.defineProperty(exports, 'PageEvent', {
    enumerable: true,
    get: function () {
        return output_1.PageEvent;
    },
});
Object.defineProperty(exports, 'RendererEvent', {
    enumerable: true,
    get: function () {
        return output_1.RendererEvent;
    },
});
Object.defineProperty(exports, 'MarkdownEvent', {
    enumerable: true,
    get: function () {
        return output_1.MarkdownEvent;
    },
});
const utils_1 = require('./lib/utils');

Object.defineProperty(exports, 'ArgumentsReader', {
    enumerable: true,
    get: function () {
        return utils_1.ArgumentsReader;
    },
});
Object.defineProperty(exports, 'BindOption', {
    enumerable: true,
    get: function () {
        return utils_1.BindOption;
    },
});
Object.defineProperty(exports, 'JSX', {
    enumerable: true,
    get: function () {
        return utils_1.JSX;
    },
});
Object.defineProperty(exports, 'LogLevel', {
    enumerable: true,
    get: function () {
        return utils_1.LogLevel;
    },
});
Object.defineProperty(exports, 'Logger', {
    enumerable: true,
    get: function () {
        return utils_1.Logger;
    },
});
Object.defineProperty(exports, 'Options', {
    enumerable: true,
    get: function () {
        return utils_1.Options;
    },
});
Object.defineProperty(exports, 'ParameterHint', {
    enumerable: true,
    get: function () {
        return utils_1.ParameterHint;
    },
});
Object.defineProperty(exports, 'ParameterType', {
    enumerable: true,
    get: function () {
        return utils_1.ParameterType;
    },
});
Object.defineProperty(exports, 'TSConfigReader', {
    enumerable: true,
    get: function () {
        return utils_1.TSConfigReader;
    },
});
Object.defineProperty(exports, 'TypeDocReader', {
    enumerable: true,
    get: function () {
        return utils_1.TypeDocReader;
    },
});
Object.defineProperty(exports, 'EntryPointStrategy', {
    enumerable: true,
    get: function () {
        return utils_1.EntryPointStrategy;
    },
});
Object.defineProperty(exports, 'EventHooks', {
    enumerable: true,
    get: function () {
        return utils_1.EventHooks;
    },
});
const serialization_1 = require('./lib/serialization');

Object.defineProperty(exports, 'JSONOutput', {
    enumerable: true,
    get: function () {
        return serialization_1.JSONOutput;
    },
});
Object.defineProperty(exports, 'Serializer', {
    enumerable: true,
    get: function () {
        return serialization_1.Serializer;
    },
});
Object.defineProperty(exports, 'SerializerComponent', {
    enumerable: true,
    get: function () {
        return serialization_1.SerializerComponent;
    },
});
Object.defineProperty(exports, 'SerializeEvent', {
    enumerable: true,
    get: function () {
        return serialization_1.SerializeEvent;
    },
});
const TypeScript = require('typescript');

exports.TypeScript = TypeScript;