class HttpError extends Error {
  status: number;
  data: Record<string, any> | null;
  statusText: string;

  constructor(
    status = 500,
    data: Record<string, any> | null = null,
    message = "something went wrong",
    statusText = "BAD_REQUEST"
  ) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.data = data;
    this.statusText = statusText;
    Object.defineProperty(this, "message", {
      configurable: true,
      enumerable: false,
      value: message,
      writable: true,
    });
  }
}

module.exports = HttpError;
