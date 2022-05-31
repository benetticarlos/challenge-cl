import { createServer } from 'http';
import { Server } from 'socket.io';
import Client from 'socket.io-client';
import { jest } from '@jest/globals';

// jest.useFakeTimers();

describe('Socket server connection', () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on('connection', (socket) => {
        serverSocket = socket;
      });
      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test('should work', (done) => {
    clientSocket.on('hello', (arg) => {
      expect(arg).toBe('world');
      done();
    });
    serverSocket.emit('hello', 'world');
  });

  test('should work (with ack)', (done) => {
    serverSocket.on('hi', (cb) => {
      cb('hola');
    });
    clientSocket.emit('hi', (arg) => {
      expect(arg).toBe('hola');
      done();
    });
  });

  test('should communicate with waiting for socket.io (with ack)', () => {
    // emit sth from Client to Server
    clientSocket.emit('example', 'some messages');
    // use timeout to wait for the server to receive the message
    jest.advanceTimersByTime(4000);
    serverSocket.on('example', (data) => {
      expect(data).toBe('some messages');
    });
  });
});
