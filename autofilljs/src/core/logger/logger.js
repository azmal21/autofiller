// core/logger/Logger.js

export class Logger {
  constructor(context = "APP") {
    this.context = context;
  }

  format(level, message, data) {
    return {
      caller: this.getCaller(),
      data,
      message,
    };
  }

  info(message, data = null) {
    console.log(
      `%c[INFO] ${this.context}: ${message}`,
      "color: #2563eb; font-weight: bold;",
      this.format("info", message, data),
    );
  }

  warn(message, data = null) {
    console.warn(
      `%c[WARN] ${this.context}: ${message}`,
      "color: #d97706; font-weight: bold;",
      this.format("warn", message, data),
    );
  }

  error(message, data = null) {
    console.error(
      `%c[ERROR] ${this.context}: ${message}`,
      "color: #dc2626; font-weight: bold;",
      this.format("error", message, data),
    );
  }

  success(message, data = null) {
    console.log(
      `%c[SUCCESS] ${this.context}: ${message}`,
      "color: #16a34a; font-weight: bold;",
      this.format("success", message, data),
    );
  }

  skip(message, data = null) {
    console.log(
      `%c[SKIP] ${this.context}: ${message}`,
      "color: #6b7280; font-weight: bold;",
      this.format("skip", message, data),
    );
  }

  debug(message, data = null) {
    console.debug(
      `%c[DEBUG] ${this.context}: ${message}`,
      "color: #9333ea; font-weight: bold;",
      this.format("debug", message, data),
    );
  }

  getCaller() {
    const stack = new Error().stack.split("\n");

    if (!stack) return "unknown";

    const caller = stack?.[4].trim();
    const parts = caller?.split("/");
    const lastPart = parts[parts.length - 1].replace(")", "").trim();
    return lastPart;
  }
}
