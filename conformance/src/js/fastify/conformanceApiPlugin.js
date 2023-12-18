// DO NOT EDIT: generated by fsdgenjs
/* eslint-disable */
'use strict';


const standardErrorCodes = {
  'NotModified': 304,
  'InvalidRequest': 400,
  'NotAuthenticated': 401,
  'NotAuthorized': 403,
  'NotFound': 404,
  'Conflict': 409,
  'RequestTooLarge': 413,
  'TooManyRequests': 429,
  'InternalError': 500,
  'ServiceUnavailable': 503,
  'NotAdmin': 403,
  'TooHappy': 500,
};

function parseBoolean(value) {
  if (typeof value === 'string') {
    const lowerValue = value.toLowerCase();
    if (lowerValue === 'true') {
      return true;
    }
    if (lowerValue === 'false') {
      return false;
    }
  }
  return undefined;
}

export const conformanceApiPlugin = async (fastify, opts) => {
  const { api, caseInsenstiveQueryStringKeys, includeErrorDetails } = opts;

  fastify.setErrorHandler((error, req, res) => {
    req.log.error(error);
    if (includeErrorDetails) {
      res.status(500).send({
        code: 'InternalError',
        message: error.message,
        details: {
          stack: error.stack?.split('\n').filter((x) => x.length > 0),
        }
      });
    }
    else {
      res.status(500).send({
        code: 'InternalError',
        message: 'The service experienced an unexpected internal error.',
      });
    }
  });

  if (caseInsenstiveQueryStringKeys) {
    fastify.addHook('onRequest', async (req, res) => {
      const query = req.query;
      for (const key of Object.keys(query)) {
        const lowerKey = key.toLowerCase();
        if (lowerKey !== key) {
          query[lowerKey] = query[key];
          delete query[key];
        }
      }
    });
  }

  fastify.route({
    url: '/',
    method: 'GET',
    handler: async function (req, res) {
      const request = {};

      const result = await api.getApiInfo(request);

      if (result.error) {
        const status = result.error.code && standardErrorCodes[result.error.code];
        res.status(status || 500).send(result.error);
        return;
      }

      if (result.value) {
        res.status(200).send(result.value);
        return;
      }

      throw new Error('Result must have an error or value.');
    }
  });

  fastify.route({
    url: '/widgets',
    method: 'GET',
    handler: async function (req, res) {
      const request = {};

      const query = req.query;
      if (typeof query['q'] === 'string') request.query = query['q'];

      const result = await api.getWidgets(request);

      if (result.error) {
        const status = result.error.code && standardErrorCodes[result.error.code];
        res.status(status || 500).send(result.error);
        return;
      }

      if (result.value) {
        res.status(200).send(result.value);
        return;
      }

      throw new Error('Result must have an error or value.');
    }
  });

  fastify.route({
    url: '/widgets',
    method: 'POST',
    handler: async function (req, res) {
      const request = {};

      request.widget = req.body;

      const result = await api.createWidget(request);

      if (result.error) {
        const status = result.error.code && standardErrorCodes[result.error.code];
        res.status(status || 500).send(result.error);
        return;
      }

      if (result.value) {
        if (result.value.url != null) res.header('Location', result.value.url);
        if (result.value.eTag != null) res.header('eTag', result.value.eTag);

        if (result.value.widget) {
          res.status(201).send(result.value.widget);
          return;
        }
      }

      throw new Error('Result must have an error or value.');
    }
  });

  fastify.route({
    url: '/widgets/:id',
    method: 'GET',
    handler: async function (req, res) {
      const request = {};

      const params = req.params;
      if (typeof params['id'] === 'string') request.id = parseInt(params['id'], 10);

      const headers = req.headers;
      if (typeof headers['if-none-match'] === 'string') request.ifNotETag = headers['if-none-match'];

      const result = await api.getWidget(request);

      if (result.error) {
        const status = result.error.code && standardErrorCodes[result.error.code];
        res.status(status || 500).send(result.error);
        return;
      }

      if (result.value) {
        if (result.value.eTag != null) res.header('eTag', result.value.eTag);

        if (result.value.widget) {
          res.status(200).send(result.value.widget);
          return;
        }

        if (result.value.notModified) {
          res.status(304);
          return;
        }
      }

      throw new Error('Result must have an error or value.');
    }
  });

  fastify.route({
    url: '/widgets/:id',
    method: 'DELETE',
    handler: async function (req, res) {
      const request = {};

      const params = req.params;
      if (typeof params['id'] === 'string') request.id = parseInt(params['id'], 10);

      const headers = req.headers;
      if (typeof headers['if-match'] === 'string') request.ifETag = headers['if-match'];

      const result = await api.deleteWidget(request);

      if (result.error) {
        const status = result.error.code && standardErrorCodes[result.error.code];
        res.status(status || 500).send(result.error);
        return;
      }

      if (result.value) {
        if (result.value.notFound) {
          res.status(404);
          return;
        }

        if (result.value.conflict) {
          res.status(409);
          return;
        }

        res.status(204);
        return;
      }

      throw new Error('Result must have an error or value.');
    }
  });

  fastify.route({
    url: '/widgets/get',
    method: 'POST',
    handler: async function (req, res) {
      const request = {};

      request.ids = req.body;

      const result = await api.getWidgetBatch(request);

      if (result.error) {
        const status = result.error.code && standardErrorCodes[result.error.code];
        res.status(status || 500).send(result.error);
        return;
      }

      if (result.value) {
        if (result.value.results) {
          res.status(200).send(result.value.results);
          return;
        }
      }

      throw new Error('Result must have an error or value.');
    }
  });

  fastify.route({
    url: '/mirrorFields',
    method: 'POST',
    handler: async function (req, res) {
      const request = {};

      const body = req.body;
      request.field = body.field;
      request.matrix = body.matrix;

      const result = await api.mirrorFields(request);

      if (result.error) {
        const status = result.error.code && standardErrorCodes[result.error.code];
        res.status(status || 500).send(result.error);
        return;
      }

      if (result.value) {
        res.status(200).send(result.value);
        return;
      }

      throw new Error('Result must have an error or value.');
    }
  });

  fastify.route({
    url: '/checkQuery',
    method: 'GET',
    handler: async function (req, res) {
      const request = {};

      const query = req.query;
      if (typeof query['string'] === 'string') request.string = query['string'];
      if (typeof query['boolean'] === 'string') request.boolean = parseBoolean(query['boolean']);
      if (typeof query['double'] === 'string') request.double = parseFloat(query['double']);
      if (typeof query['int32'] === 'string') request.int32 = parseInt(query['int32'], 10);
      if (typeof query['int64'] === 'string') request.int64 = parseInt(query['int64'], 10);
      if (typeof query['decimal'] === 'string') request.decimal = parseFloat(query['decimal']);
      if (typeof query['enum'] === 'string') request.enum = query['enum'];
      if (typeof query['datetime'] === 'string') request.datetime = query['datetime'];

      const result = await api.checkQuery(request);

      if (result.error) {
        const status = result.error.code && standardErrorCodes[result.error.code];
        res.status(status || 500).send(result.error);
        return;
      }

      if (result.value) {
        res.status(200);
        return;
      }

      throw new Error('Result must have an error or value.');
    }
  });

  fastify.route({
    url: '/checkPath/:string/:boolean/:double/:int32/:int64/:decimal/:enum/:datetime',
    method: 'GET',
    handler: async function (req, res) {
      const request = {};

      const params = req.params;
      if (typeof params['string'] === 'string') request.string = params['string'];
      if (typeof params['boolean'] === 'string') request.boolean = parseBoolean(params['boolean']);
      if (typeof params['double'] === 'string') request.double = parseFloat(params['double']);
      if (typeof params['int32'] === 'string') request.int32 = parseInt(params['int32'], 10);
      if (typeof params['int64'] === 'string') request.int64 = parseInt(params['int64'], 10);
      if (typeof params['decimal'] === 'string') request.decimal = parseFloat(params['decimal']);
      if (typeof params['enum'] === 'string') request.enum = params['enum'];
      if (typeof params['datetime'] === 'string') request.datetime = params['datetime'];

      const result = await api.checkPath(request);

      if (result.error) {
        const status = result.error.code && standardErrorCodes[result.error.code];
        res.status(status || 500).send(result.error);
        return;
      }

      if (result.value) {
        res.status(200);
        return;
      }

      throw new Error('Result must have an error or value.');
    }
  });

  fastify.route({
    url: '/mirrorHeaders',
    method: 'GET',
    handler: async function (req, res) {
      const request = {};

      const headers = req.headers;
      if (typeof headers['string'] === 'string') request.string = headers['string'];
      if (typeof headers['boolean'] === 'string') request.boolean = parseBoolean(headers['boolean']);
      if (typeof headers['double'] === 'string') request.double = parseFloat(headers['double']);
      if (typeof headers['int32'] === 'string') request.int32 = parseInt(headers['int32'], 10);
      if (typeof headers['int64'] === 'string') request.int64 = parseInt(headers['int64'], 10);
      if (typeof headers['decimal'] === 'string') request.decimal = parseFloat(headers['decimal']);
      if (typeof headers['enum'] === 'string') request.enum = headers['enum'];
      if (typeof headers['datetime'] === 'string') request.datetime = headers['datetime'];

      const result = await api.mirrorHeaders(request);

      if (result.error) {
        const status = result.error.code && standardErrorCodes[result.error.code];
        res.status(status || 500).send(result.error);
        return;
      }

      if (result.value) {
        if (result.value.string != null) res.header('string', result.value.string);
        if (result.value.boolean != null) res.header('boolean', result.value.boolean);
        if (result.value.double != null) res.header('double', result.value.double);
        if (result.value.int32 != null) res.header('int32', result.value.int32);
        if (result.value.int64 != null) res.header('int64', result.value.int64);
        if (result.value.decimal != null) res.header('decimal', result.value.decimal);
        if (result.value.enum != null) res.header('enum', result.value.enum);
        if (result.value.datetime != null) res.header('datetime', result.value.datetime);

        res.status(200);
        return;
      }

      throw new Error('Result must have an error or value.');
    }
  });

  fastify.route({
    url: '/mixed/:path',
    method: 'POST',
    handler: async function (req, res) {
      const request = {};

      const params = req.params;
      if (typeof params['path'] === 'string') request.path = params['path'];

      const query = req.query;
      if (typeof query['query'] === 'string') request.query = query['query'];

      const headers = req.headers;
      if (typeof headers['header'] === 'string') request.header = headers['header'];

      const body = req.body;
      request.normal = body.normal;

      const result = await api.mixed(request);

      if (result.error) {
        const status = result.error.code && standardErrorCodes[result.error.code];
        res.status(status || 500).send(result.error);
        return;
      }

      if (result.value) {
        if (result.value.header != null) res.header('header', result.value.header);

        if (result.value.body) {
          res.status(202).send(result.value.body);
          return;
        }

        if (result.value.empty) {
          res.status(204);
          return;
        }

        res.status(200).send(result.value);
        return;
      }

      throw new Error('Result must have an error or value.');
    }
  });

  fastify.route({
    url: '/required',
    method: 'POST',
    handler: async function (req, res) {
      const request = {};

      const query = req.query;
      if (typeof query['query'] === 'string') request.query = query['query'];

      const body = req.body;
      request.normal = body.normal;
      request.widget = body.widget;
      request.widgets = body.widgets;
      request.widgetMatrix = body.widgetMatrix;
      request.widgetResult = body.widgetResult;
      request.widgetResults = body.widgetResults;
      request.widgetMap = body.widgetMap;
      request.hasWidget = body.hasWidget;
      request.point = body.point;

      const result = await api.required(request);

      if (result.error) {
        const status = result.error.code && standardErrorCodes[result.error.code];
        res.status(status || 500).send(result.error);
        return;
      }

      if (result.value) {
        res.status(200).send(result.value);
        return;
      }

      throw new Error('Result must have an error or value.');
    }
  });

  fastify.route({
    url: '/mirrorBytes',
    method: 'POST',
    handler: async function (req, res) {
      const request = {};

      const headers = req.headers;
      if (typeof headers['content-type'] === 'string') request.type = headers['content-type'];

      request.content = req.body;

      const result = await api.mirrorBytes(request);

      if (result.error) {
        const status = result.error.code && standardErrorCodes[result.error.code];
        res.status(status || 500).send(result.error);
        return;
      }

      if (result.value) {
        if (result.value.type != null) res.header('Content-Type', result.value.type);

        if (result.value.content) {
          res.status(200).send(result.value.content);
          return;
        }
      }

      throw new Error('Result must have an error or value.');
    }
  });

  fastify.route({
    url: '/mirrorText',
    method: 'POST',
    handler: async function (req, res) {
      const request = {};

      const headers = req.headers;
      if (typeof headers['content-type'] === 'string') request.type = headers['content-type'];

      request.content = req.body;

      const result = await api.mirrorText(request);

      if (result.error) {
        const status = result.error.code && standardErrorCodes[result.error.code];
        res.status(status || 500).send(result.error);
        return;
      }

      if (result.value) {
        if (result.value.type != null) res.header('Content-Type', result.value.type);

        if (result.value.content) {
          res.status(200).send(result.value.content);
          return;
        }
      }

      throw new Error('Result must have an error or value.');
    }
  });

  fastify.route({
    url: '/bodyTypes',
    method: 'POST',
    handler: async function (req, res) {
      const request = {};

      request.content = req.body;

      const result = await api.bodyTypes(request);

      if (result.error) {
        const status = result.error.code && standardErrorCodes[result.error.code];
        res.status(status || 500).send(result.error);
        return;
      }

      if (result.value) {
        if (result.value.content) {
          res.status(200).send(result.value.content);
          return;
        }
      }

      throw new Error('Result must have an error or value.');
    }
  });
}
