export default async function request(url, options = {}) {
  const defaultHeaders = {
    Accept: "application/json",
  };
  if (["POST", "PATCH", "PUT"].includes(options.method)) {
    defaultHeaders["Content-Type"] = "application/json";
  }
  const headers = { ...defaultHeaders, ...options.headers };

  if (options.body !== undefined && typeof options.body !== "string") {
    options = {
      ...options,
      body: JSON.stringify(options.body),
    };
  }

  options = {
    ...options,
    headers,
  };

  const response = await fetch(url, options);

  const isJson =
    response.headers.get("Content-Type") &&
    response.headers.get("Content-Type").startsWith("application/json");

  return {
    ok: response.ok,
    status: response.status,
    body: isJson ? await response.json() : await response.text(),
  };
}
