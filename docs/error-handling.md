# Safe Error Handling & Typed API Clients in TypeScript

> Always type caught errors as `unknown`, and always type what comes back from an API — TypeScript cannot infer either.

---

## Table of Contents

### Error Handling

1. [Basic try/catch with unknown](#1-basic-trycatch-with-unknown)
2. [Custom Type Guard for API Errors](#2-custom-type-guard-for-api-errors)
3. [Safe Fetch Wrapper](#3-safe-fetch-wrapper)
4. [React useEffect Error Handling](#4-react-useeffect-error-handling)
5. [Async Event Handler](#5-async-event-handler)
6. [Narrowing with typeof / in](#6-narrowing-with-typeof--in)
7. [Exhaustive Error Handling](#7-exhaustive-error-handling)
8. [Axios Error Handling](#8-axios-error-handling)
9. [Typed Error State in React](#9-typed-error-state-in-react)
10. [Error Normalizer](#10-error-normalizer)

### Typed API Clients

11. [Basic Generic API Response](#11-basic-generic-api-response)
12. [Generic Fetch Function](#12-generic-fetch-function)
13. [Typed API Result (Success/Failure)](#13-typed-api-result-successfailure)
14. [API Client Class](#14-api-client-class)
15. [Endpoint-Based Typed API](#15-endpoint-based-typed-api)
16. [React Hook with Generics](#16-react-hook-with-generics)
17. [Axios Typed Example](#17-axios-typed-example)
18. [Runtime Validation with Zod](#18-runtime-validation-with-zod)

---

## 1. Basic try/catch with unknown

The catch variable is typed as `unknown`, requiring explicit narrowing before use.

```ts
try {
  riskyOperation();
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  } else {
    console.log("Unknown error", error);
  }
}
```

---

## 2. Custom Type Guard for API Errors

Define a shape for the expected error, then use a type predicate to narrow safely.

```ts
type ApiError = {
  message: string;
  status: number;
};
```

```ts
function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "status" in error
  );
}
```

**Usage:**

```ts
catch (error: unknown) {
  if (isApiError(error)) {
    console.log(error.status, error.message); // fully typed
  }
}
```

---

## 3. Safe Fetch Wrapper

A generic wrapper that re-throws normalized `Error` instances regardless of what fails.

```ts
async function safeFetch<T>(url: string): Promise<T> {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw { message: "API failed", status: res.status };
    }

    return await res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Fetch failed: ${error.message}`);
    }

    throw new Error("Unknown fetch error");
  }
}
```

**Usage:**

```ts
const data = await safeFetch<User[]>("/api/users");
```

---

## 4. React useEffect Error Handling

Handle async errors inside `useEffect` by wrapping the call in an inner async function.

```tsx
useEffect(() => {
  const loadData = async () => {
    try {
      const res = await fetch("/api/data");
      const json = await res.json();
      setData(json);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  loadData();
}, []);
```

---

## 5. Async Event Handler

Async handlers must catch their own errors since React won't surface them automatically.

```tsx
const handleSubmit = async () => {
  try {
    await submitForm();
  } catch (err: unknown) {
    if (err instanceof Error) {
      alert(err.message);
    } else {
      alert("Unexpected error");
    }
  }
};
```

---

## 6. Narrowing with `typeof` / `in`

Use `typeof` and `in` checks when the error may not be an `Error` instance.

```ts
catch (error: unknown) {
  if (typeof error === "string") {
    console.log("String error:", error);
  } else if (typeof error === "object" && error !== null && "code" in error) {
    console.log("Error with code:", (error as { code: unknown }).code);
  } else {
    console.log("Unknown error type");
  }
}
```

---

## 7. Exhaustive Error Handling

A utility that handles all possible thrown value shapes and always returns a string.

```ts
function handleError(error: unknown): string {
  if (error instanceof Error) return error.message;

  if (typeof error === "string") return error;

  if (typeof error === "object" && error !== null) {
    return JSON.stringify(error);
  }

  return "Unknown error occurred";
}
```

**Usage:**

```ts
catch (err: unknown) {
  setErrorMessage(handleError(err));
}
```

---

## 8. Axios Error Handling

Axios provides `isAxiosError()` as a type-safe narrowing helper for its error shape.

```ts
import axios from "axios";

try {
  await axios.get("/api");
} catch (error: unknown) {
  if (axios.isAxiosError(error)) {
    console.log(error.response?.data);
  } else if (error instanceof Error) {
    console.log(error.message);
  } else {
    console.log("Unknown error");
  }
}
```

---

## 9. Typed Error State in React

Use a discriminated union to represent distinct failure modes in component state.

```ts
type ErrorState =
  | { type: "network"; message: string }
  | { type: "unknown"; message: string };
```

```tsx
const [error, setError] = useState<ErrorState | null>(null);
```

**Usage:**

```ts
catch (err: unknown) {
  if (err instanceof Error) {
    setError({ type: "network", message: err.message });
  } else {
    setError({ type: "unknown", message: "Something failed" });
  }
}
```

---

## 10. Error Normalizer

Converts any thrown value into a standard `Error` object for uniform downstream handling.

```ts
function normalizeError(error: unknown): Error {
  if (error instanceof Error) return error;

  if (typeof error === "string") return new Error(error);

  return new Error("Unknown error");
}
```

**Usage:**

```ts
catch (err: unknown) {
  throw normalizeError(err); // always an Error instance
}
```

## Typed API Clients

## 11. Basic Generic API Response

Wrap every API response in a generic envelope so consumers always get a consistent shape.

```ts
type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};
```

**Usage:**

```ts
const res: ApiResponse<User> = await fetchApi<ApiResponse<User>>("/api/user");
console.log(res.data.name, res.status);
```

---

## 12. Generic Fetch Function

A lightweight typed wrapper around `fetch` that infers the response type from the call site.

```ts
async function fetchApi<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json() as Promise<T>;
}
```

**Usage:**

```ts
const user = await fetchApi<User>("/api/user");
const posts = await fetchApi<Post[]>("/api/posts");
```

---

## 13. Typed API Result (Success/Failure)

A discriminated union that makes the success/failure distinction explicit at the type level — no exceptions needed.

```ts
type ApiSuccess<T> = {
  success: true;
  data: T;
};

type ApiFailure = {
  success: false;
  error: string;
};

type ApiResult<T> = ApiSuccess<T> | ApiFailure;
```

**Usage:**

```ts
const result: ApiResult<User> = await getUser();

if (result.success) {
  console.log(result.data.name); // data is User
} else {
  console.log(result.error);    // error is string
}
```

---

## 14. API Client Class

Encapsulate HTTP methods in a class so the base URL and headers are configured once.

```ts
class ApiClient {
  constructor(private baseUrl: string) {}

  async get<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`);

    if (!res.ok) {
      throw new Error(`GET ${endpoint} failed: ${res.status}`);
    }

    return res.json() as Promise<T>;
  }

  async post<TResponse, TBody>(endpoint: string, body: TBody): Promise<TResponse> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`POST ${endpoint} failed: ${res.status}`);
    }

    return res.json() as Promise<TResponse>;
  }
}
```

**Usage:**

```ts
const client = new ApiClient("https://api.example.com");

const user = await client.get<User>("/user");
const created = await client.post<User, NewUserPayload>("/user", { name: "Alice" });
```

---

## 15. Endpoint-Based Typed API

Encode your entire API surface into a single type map — one source of truth for every route's request and response shapes.

```ts
type ApiEndpoints = {
  "/user": {
    GET: { response: User };
    POST: { body: { name: string }; response: User };
  };
  "/posts": {
    GET: { response: Post[] };
  };
};
```

**Usage:**

```ts
// Consumed by the TypedApiClient in the next section
const client = new TypedApiClient<ApiEndpoints>("https://api.example.com");
```

---

## 16. React Hook with Generics

A reusable data-fetching hook that infers its return type from the call site.

```ts
function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json() as Promise<T>;
      })
      .then(setData)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Unknown error");
      });
  }, [url]);

  return { data, error };
}
```

**Usage:**

```tsx
const { data, error } = useApi<User[]>("/api/users");
// data is User[] | null, error is string | null
```

---

## 17. Axios Typed Example

Axios accepts a generic on `.get<T>()` and surfaces the parsed body at `res.data` — already typed.

```ts
import axios from "axios";

const api = axios.create({ baseURL: "/api" });

async function getUser(): Promise<User> {
  const res = await api.get<User>("/user");
  return res.data; // User — no cast needed
}

async function createUser(payload: NewUserPayload): Promise<User> {
  const res = await api.post<User>("/user", payload);
  return res.data;
}
```

**Usage:**

```ts
const user = await getUser();               // User
const created = await createUser({ name: "Alice" }); // User
```

---

## 18. Runtime Validation with Zod

TypeScript types disappear at runtime — use Zod to validate API responses at the boundary so your types stay trustworthy.

```ts
import { z } from "zod";

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});

type User = z.infer<typeof UserSchema>;
```

```ts
async function getUser(): Promise<User> {
  const res = await fetch("/api/user");
  const json = await res.json();

  return UserSchema.parse(json); // throws ZodError if shape is wrong
}
```

**Usage:**

```ts
try {
  const user = await getUser(); // guaranteed to match User shape
} catch (err: unknown) {
  if (err instanceof z.ZodError) {
    console.error("Unexpected API shape:", err.errors);
  }
}
```

---

## Key Takeaways

### Error Handling

| Rule | Why |
|---|---|
| Use `unknown` in catch blocks | Forces explicit narrowing; `any` silently skips checks |
| Narrow with `instanceof`, `typeof`, or type guards | Ensures type-safe access to error properties |
| Normalize errors to `Error` instances | Consistent `.message` and `.stack` across the codebase |
| Never trust external data | Thrown values can be strings, objects, `null`, or anything |

### Typed API Clients

| Rule | Why |
|---|---|
| Use generics to type API responses | Catches shape mismatches at compile time, not runtime |
| Prefer typed API clients over raw `fetch` | Centralizes error handling and base URL config |
| Use discriminated unions for results | Makes success/failure explicit without exceptions |
| Encode your API surface in a type map | One change propagates correctly through all call sites |
| Validate API responses at runtime with Zod | TypeScript types are erased — `parse()` keeps them honest |