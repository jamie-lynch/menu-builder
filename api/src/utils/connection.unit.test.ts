import { normalizePort, onError, onListening } from "./connection";

describe("The normalizePort function", () => {
  test("returns the port number if valid", () => {
    expect(normalizePort("3000")).toBe(3000);
  });

  test("returns 80 if the port number is NaN", () => {
    expect(normalizePort("test")).toBe(80);
  });

  test("returns 80 if the port number is less than zero", () => {
    expect(normalizePort("-1")).toBe(80);
  });

  test("returns 80 if the port number is falsy than zero", () => {
    expect(normalizePort("0")).toBe(80);
  });
});

describe("The onError function", () => {
  let mockExit: jest.SpyInstance;
  let logger: {
    error: jest.Mock;
  };

  beforeAll(() => {
    mockExit = jest.spyOn(process, "exit").mockImplementation(() => {
      return undefined as never;
    });

    logger = {
      error: jest.fn(),
    };
  });

  beforeEach(() => {
    logger.error.mockReset();
  });

  afterAll(() => {
    mockExit.mockRestore();
  });

  test("throws the error if the syscall value is not listen", () => {
    const err = {
      syscall: "test",
      id: "not listen",
    };

    expect.assertions(1);

    try {
      onError(err, 80, logger as any);
    } catch (e) {
      expect(e.id).toBe("not listen");
    }
  });

  test("prints the correct message if the code is EACCES", () => {
    const err = {
      syscall: "listen",
      code: "EACCES",
    };

    onError(err, 80, logger as any);

    expect(mockExit).toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalledWith(
      "Port 80 requires elevated privileges"
    );
  });

  test("prints the correct message if the code is EADDRINUSE", () => {
    const err = {
      syscall: "listen",
      code: "EADDRINUSE",
    };

    onError(err, 80, logger as any);

    expect(mockExit).toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalledWith("Port 80 is already in use");
  });

  test("thows the error if the code is any different", () => {
    const err = {
      syscall: "listen",
      code: "test",
      id: "unknown code",
    };

    expect.assertions(1);

    try {
      onError(err, 80, logger as any);
    } catch (e) {
      expect(e.id).toBe("unknown code");
    }
  });
});

describe("The onListening function", () => {
  let logger: {
    info: jest.Mock;
  };

  beforeAll(() => {
    logger = {
      info: jest.fn(),
    };
  });

  test("Logs the correct message", () => {
    const server: any = {
      address: () => ({ port: 80 }),
    };

    onListening(server, logger as any);

    expect(logger.info).toHaveBeenCalledWith("Listening on port 80");
  });
});
