const chai = require('chai');
const http = require('chai-http');
const subset = require('chai-subset');

const UserController = require('../../../api/src/resources/User/UserController'); // Arquivo a ser testado

chai.use(http);
chai.use(subset);

const { expect } = chai;

//exemplo com classe
class UserModelFake {
  // constructor(data) {
  //   this.user = data;
  // }

  // async save() {
  //   return this.user
  // }

  // static async exists() {
  //   return false
  // }

  // static find() {
  //   return {
  //     exec: async () => payload
  //   }
  // }

  // static findById(id) {
  //   return {
  //     exec: async () => payload
  //   }
  // }
}

const request = {
  payload: {
    name: 'Leo',
    email: 'bolinha@gmail.com',
    password: "123456",
    phone: {
      number: 13123456789,
      ddd: 13
    },
    token: "a1.b2.c3",
  },
  auth: {
    credentials: {
      sub: '5e43fa7a72df0c79086e11b2',
    }
  },
  params: {
    id: '5e43fa7a72df0c79086e11b2'
  }
}

const deps = {
  boom: {},
  hash: {
    make: () => '123456'
  },
  auth: {
    generateTokeToStore: () => '123',
  },
  model: {
    UserModel: {
      exists: async () => false,
      find: () => ({
        exec: async () => (request.payload)
      }),
      findById: id => ({
        exec: async () => (request.payload)
      }),
      findByIdAndUpdate: () => (request.payload),
      findByIdAndDelete: () => (request.payload),
      save: async () => user,
      create: async () => (request.payload)
    },
  }
}

const h = {
  response: data => data,
}

describe('Teste de busca de todos os usuários', () => {
  it('find', async () => {
    const user = await UserController(deps).getPeople(request, h);
    expect(user).to.be.eql(request.payload);
  });
});

describe('Teste de criação de usuário', () => {
  it('store', async () => {
    const user = await UserController(deps).store(request, h);
    expect(user).to.be.eql(request.payload)
  });
});

describe('Teste de find de usuário por id', () => {
  it('findById', async () => {
    const user = await UserController(deps).getUserId(request, h);
    expect(user).to.be.eql(request.payload)
  });
});

describe('Teste de update no usuário', () => {
  it('update', async () => {
    const user = await UserController(deps).update(request, h);
    expect(user).to.be.eql(request.payload);
  });
});

describe('Teste de remoção de usuário', () => {
  it('remove', async () => {
    const user = await UserController(deps).update(request, h);
    expect(user).to.be.eql(request.payload);
  });
});
