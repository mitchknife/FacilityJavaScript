// DO NOT EDIT: generated by fsdgenjs
/* eslint-disable */
'use strict';

export const jsConformanceApiPlugin = async (fastify, opts) => {
  const { serviceOrFactory, caseInsenstiveQueryStringKeys, includeErrorDetails } = opts;

  const getService = typeof serviceOrFactory === 'function' ? serviceOrFactory : () => serviceOrFactory;

  for (const jsonSchema of jsonSchemas) {
    fastify.addSchema(jsonSchema);
  }

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
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            service: { type: 'string' },
            version: { type: 'string' },
          },
        },
      },
    },
    handler: async function (req, res) {
      const request = {};

      const result = await getService(req).getApiInfo(request);

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
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            widgets: { type: 'array', items: { $ref: 'Widget' } },
          },
        },
      },
    },
    handler: async function (req, res) {
      const request = {};

      const query = req.query;
      if (typeof query['q'] === 'string') request.query = query['q'];

      const result = await getService(req).getWidgets(request);

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
    schema: {
      response: {
        201: { $ref: 'Widget' },
      },
    },
    handler: async function (req, res) {
      const request = {};

      request.widget = req.body;

      const result = await getService(req).createWidget(request);

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
    schema: {
      response: {
        200: { $ref: 'Widget' },
        304: { type: 'boolean' },
      },
    },
    handler: async function (req, res) {
      const request = {};

      const params = req.params;
      if (typeof params['id'] === 'string') request.id = parseInt(params['id'], 10);

      const headers = req.headers;
      if (typeof headers['if-none-match'] === 'string') request.ifNotETag = headers['if-none-match'];

      const result = await getService(req).getWidget(request);

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
    schema: {
      response: {
        204: { type: 'object', additionalProperties: false },
        404: { type: 'boolean' },
        409: { type: 'boolean' },
      },
    },
    handler: async function (req, res) {
      const request = {};

      const params = req.params;
      if (typeof params['id'] === 'string') request.id = parseInt(params['id'], 10);

      const headers = req.headers;
      if (typeof headers['if-match'] === 'string') request.ifETag = headers['if-match'];

      const result = await getService(req).deleteWidget(request);

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
    schema: {
      response: {
        200: { type: 'array', items: { type: 'object', properties: { value: { $ref: 'Widget' }, error: { $ref: '_error' } } } },
      },
    },
    handler: async function (req, res) {
      const request = {};

      request.ids = req.body;

      const result = await getService(req).getWidgetBatch(request);

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
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            field: { $ref: 'Any' },
            matrix: { type: 'array', items: { type: 'array', items: { type: 'array', items: { type: 'number' } } } },
          },
        },
      },
    },
    handler: async function (req, res) {
      const request = {};

      const body = req.body;
      request.field = body.field;
      request.matrix = body.matrix;

      const result = await getService(req).mirrorFields(request);

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
    schema: {
      response: {
        200: { type: 'object', additionalProperties: false },
      },
    },
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

      const result = await getService(req).checkQuery(request);

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
    schema: {
      response: {
        200: { type: 'object', additionalProperties: false },
      },
    },
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

      const result = await getService(req).checkPath(request);

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
    schema: {
      response: {
        200: { type: 'object', additionalProperties: false },
      },
    },
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

      const result = await getService(req).mirrorHeaders(request);

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
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            normal: { type: 'string' },
          },
        },
        202: { type: 'object', additionalProperties: true },
        204: { type: 'boolean' },
      },
    },
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

      const result = await getService(req).mixed(request);

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
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            normal: { type: 'string' },
          },
        },
      },
    },
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

      const result = await getService(req).required(request);

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
    schema: {
      response: {
        200: { type: 'string' },
      },
    },
    handler: async function (req, res) {
      const request = {};

      const headers = req.headers;
      if (typeof headers['content-type'] === 'string') request.type = headers['content-type'];

      request.content = req.body;

      const result = await getService(req).mirrorBytes(request);

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
    schema: {
      response: {
        200: { type: 'string' },
      },
    },
    handler: async function (req, res) {
      const request = {};

      const headers = req.headers;
      if (typeof headers['content-type'] === 'string') request.type = headers['content-type'];

      request.content = req.body;

      const result = await getService(req).mirrorText(request);

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
    schema: {
      response: {
        200: { type: 'string' },
      },
    },
    handler: async function (req, res) {
      const request = {};

      request.content = req.body;

      const result = await getService(req).bodyTypes(request);

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

const jsonSchemas = [
  {
    $id: '_error',
    type: 'object',
    properties: {
      code: { type: 'string' },
      message: { type: 'string' },
      details: { type: 'object', additionalProperties: true },
      innerError: { $ref: '_error' },
    }
  },
  {
    $id: 'Widget',
    type: 'object',
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
    }
  },
  {
    $id: 'Any',
    type: 'object',
    properties: {
      string: { type: 'string' },
      boolean: { type: 'boolean' },
      double: { type: 'number' },
      int32: { type: 'integer' },
      int64: { type: 'integer' },
      decimal: { type: 'number' },
      datetime: { type: 'string' },
      bytes: { type: 'string' },
      object: { type: 'object', additionalProperties: true },
      error: { $ref: '_error' },
      data: { $ref: 'Any' },
      enum: { $ref: 'Answer' },
      array: { $ref: 'AnyArray' },
      map: { $ref: 'AnyMap' },
      result: { $ref: 'AnyResult' },
      nullable: { $ref: 'AnyNullable' },
    }
  },
  {
    $id: 'AnyArray',
    type: 'object',
    properties: {
      string: { type: 'array', items: { type: 'string' } },
      boolean: { type: 'array', items: { type: 'boolean' } },
      double: { type: 'array', items: { type: 'number' } },
      int32: { type: 'array', items: { type: 'integer' } },
      int64: { type: 'array', items: { type: 'integer' } },
      decimal: { type: 'array', items: { type: 'number' } },
      datetime: { type: 'array', items: { type: 'string' } },
      bytes: { type: 'array', items: { type: 'string' } },
      object: { type: 'array', items: { type: 'object', additionalProperties: true } },
      error: { type: 'array', items: { $ref: '_error' } },
      data: { type: 'array', items: { $ref: 'Any' } },
      enum: { type: 'array', items: { $ref: 'Answer' } },
      array: { type: 'array', items: { type: 'array', items: { type: 'integer' } } },
      map: { type: 'array', items: { type: 'object', additionalProperties: { type: 'integer' } } },
      result: { type: 'array', items: { type: 'object', properties: { value: { type: 'integer' }, error: { $ref: '_error' } } } },
      nullable: { type: 'array', items: { oneOf: [ { type: 'integer' }, { type: 'null' } ] } },
    }
  },
  {
    $id: 'AnyMap',
    type: 'object',
    properties: {
      string: { type: 'object', additionalProperties: { type: 'string' } },
      boolean: { type: 'object', additionalProperties: { type: 'boolean' } },
      double: { type: 'object', additionalProperties: { type: 'number' } },
      int32: { type: 'object', additionalProperties: { type: 'integer' } },
      int64: { type: 'object', additionalProperties: { type: 'integer' } },
      decimal: { type: 'object', additionalProperties: { type: 'number' } },
      datetime: { type: 'object', additionalProperties: { type: 'string' } },
      bytes: { type: 'object', additionalProperties: { type: 'string' } },
      object: { type: 'object', additionalProperties: { type: 'object', additionalProperties: true } },
      error: { type: 'object', additionalProperties: { $ref: '_error' } },
      data: { type: 'object', additionalProperties: { $ref: 'Any' } },
      enum: { type: 'object', additionalProperties: { $ref: 'Answer' } },
      array: { type: 'object', additionalProperties: { type: 'array', items: { type: 'integer' } } },
      map: { type: 'object', additionalProperties: { type: 'object', additionalProperties: { type: 'integer' } } },
      result: { type: 'object', additionalProperties: { type: 'object', properties: { value: { type: 'integer' }, error: { $ref: '_error' } } } },
      nullable: { type: 'object', additionalProperties: { oneOf: [ { type: 'integer' }, { type: 'null' } ] } },
    }
  },
  {
    $id: 'AnyResult',
    type: 'object',
    properties: {
      string: { type: 'object', properties: { value: { type: 'string' }, error: { $ref: '_error' } } },
      boolean: { type: 'object', properties: { value: { type: 'boolean' }, error: { $ref: '_error' } } },
      double: { type: 'object', properties: { value: { type: 'number' }, error: { $ref: '_error' } } },
      int32: { type: 'object', properties: { value: { type: 'integer' }, error: { $ref: '_error' } } },
      int64: { type: 'object', properties: { value: { type: 'integer' }, error: { $ref: '_error' } } },
      decimal: { type: 'object', properties: { value: { type: 'number' }, error: { $ref: '_error' } } },
      datetime: { type: 'object', properties: { value: { type: 'string' }, error: { $ref: '_error' } } },
      bytes: { type: 'object', properties: { value: { type: 'string' }, error: { $ref: '_error' } } },
      object: { type: 'object', properties: { value: { type: 'object', additionalProperties: true }, error: { $ref: '_error' } } },
      error: { type: 'object', properties: { value: { $ref: '_error' }, error: { $ref: '_error' } } },
      data: { type: 'object', properties: { value: { $ref: 'Any' }, error: { $ref: '_error' } } },
      enum: { type: 'object', properties: { value: { $ref: 'Answer' }, error: { $ref: '_error' } } },
      array: { type: 'object', properties: { value: { type: 'array', items: { type: 'integer' } }, error: { $ref: '_error' } } },
      map: { type: 'object', properties: { value: { type: 'object', additionalProperties: { type: 'integer' } }, error: { $ref: '_error' } } },
      result: { type: 'object', properties: { value: { type: 'object', properties: { value: { type: 'integer' }, error: { $ref: '_error' } } }, error: { $ref: '_error' } } },
      nullable: { type: 'object', properties: { value: { oneOf: [ { type: 'integer' }, { type: 'null' } ] }, error: { $ref: '_error' } } },
    }
  },
  {
    $id: 'AnyNullable',
    type: 'object',
    properties: {
      string: { oneOf: [ { type: 'string' }, { type: 'null' } ] },
      boolean: { oneOf: [ { type: 'boolean' }, { type: 'null' } ] },
      double: { oneOf: [ { type: 'number' }, { type: 'null' } ] },
      int32: { oneOf: [ { type: 'integer' }, { type: 'null' } ] },
      int64: { oneOf: [ { type: 'integer' }, { type: 'null' } ] },
      decimal: { oneOf: [ { type: 'number' }, { type: 'null' } ] },
      datetime: { oneOf: [ { type: 'string' }, { type: 'null' } ] },
      bytes: { oneOf: [ { type: 'string' }, { type: 'null' } ] },
      object: { oneOf: [ { type: 'object', additionalProperties: true }, { type: 'null' } ] },
      error: { oneOf: [ { $ref: '_error' }, { type: 'null' } ] },
      data: { oneOf: [ { $ref: 'Any' }, { type: 'null' } ] },
      enum: { oneOf: [ { $ref: 'Answer' }, { type: 'null' } ] },
      array: { oneOf: [ { type: 'array', items: { type: 'integer' } }, { type: 'null' } ] },
      map: { oneOf: [ { type: 'object', additionalProperties: { type: 'integer' } }, { type: 'null' } ] },
      result: { oneOf: [ { type: 'object', properties: { value: { type: 'integer' }, error: { $ref: '_error' } } }, { type: 'null' } ] },
    }
  },
  {
    $id: 'HasWidget',
    type: 'object',
    properties: {
      widget: { $ref: 'Widget' },
    }
  },
  {
    $id: 'Answer',
    type: 'string',
    enum: [ 'yes', 'no', 'maybe' ],
  },
];

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
