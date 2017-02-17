import {Validator} from 'jsonschema';

const hexCode = {
  type: 'string',
  pattern: '^#(\d{6})|^#([A-F]{6})|^#([A-F]|[0-9]){6}'
};

const email = {
  type: 'string',
  pattern: '/^[A-Z0-9._-]+@[A-Z0-9.-]+\.[A-Z0-9.-]+$/i'
};

const phoneNumber = {
  type: 'string',
  pattern: '^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$'
};

const GUID = {
  type: 'string'
};

export const userSchema = {
  id: '/User',
  type: 'object',
  properties: {
    id: GUID,
    email: email,
    phone: phoneNumber,
    cards: {
      type: 'array',
      items: GUID
    },
    ignoredContacts: {
      type: 'array',
      items: GUID
    },
    contacts: {
      type: 'array',
      items: GUID
    },
  }
};

export const cardSchema = {
  id: '/Card',
  type: 'object',
  properties: {
    id: GUID,
    user: GUID,
    displayName: {type: 'string'},
    type: {type: 'string'},
    profilePhoto: GUID,
    displayPhoto: GUID,
    style: {
      type: 'object',
      properties: {
        header: {
          type: 'object',
          properties: {
            startColor: hexCode,
            endColor: hexCode,
          }
        },
        body: {
          type: 'object',
          properties: {
            startColor: hexCode,
            endColor: hexCode,
          }
        }
      }
    },
    fields: {
      type: 'array',
      items: {type: '/Field'}
    }
  }
};

const fieldSchema = {
  type: 'object',
  properties: {
    custom: {type: 'boolean'},
    value: {type: 'string'},
    displayName: {type: 'string'},
    icon: {type: 'string'}
  },
  required: ['custom', 'value']
};

const validator = new Validator();
validator.addSchema(userSchema);
validator.addSchema(cardSchema);
validator.addSchema(fieldSchema);
export default validator;
