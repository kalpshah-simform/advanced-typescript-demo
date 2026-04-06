# What are Generics?

Generics allow you to write reusable, type-safe code that works with multiple types instead of just one specific type.

Without generics, you either:

- lose type safety (`any`), or
- duplicate code for each type.

With generics, you create flexible components, functions, and classes that preserve type information.

## 1. Problem without generics

```ts
function identity(value: any): any {
  return value;
}

const result = identity("Hello");
```

Problem:

- TypeScript doesn't know `result` is a string.
- You lose autocomplete and type safety.

```ts
result.toUpperCase(); // ❌ No safety, could crash at runtime
```

## 2. Solution with Generics

```ts
function identity<T>(value: T): T {
  return value;
}

const result = identity<string>("Hello");

result.toUpperCase(); // ✅ Safe
```

## 3. Generic Functions

```ts
function getFirstElement<T>(arr: T[]): T {
  return arr[0];
}

getFirstElement<string>(["a", "b"]); // returns string
getFirstElement<number>([1, 2, 3]); // returns number
```

## 4. Generic Interfaces

```ts
interface Box<T> {
  content: T;
}

const stringBox: Box<string> = { content: "hello" };
const numberBox: Box<number> = { content: 123 };
```

## 5. Generic Types / Aliases

```ts
type Nullable<T> = T | null;

const age: Nullable<number> = 23;
const name: Nullable<string> = null;
```

## 6. Generics with React

Example: `useState`

```ts
type User = {
  id: string;
  name: string;
};

const [user, setUser] = useState<User | null>(null);
```

`User` is the generic type.

Definition:

```ts
function useState<T>(initial: T): [T, Function]
```

## 7. Generics with Custom Hook
```ts
function useFetch<T>(url: string): T | null {
  const [data, setData] = useState<T | null>(null);
  return data;
}
```

Usage:

```ts
const user = useFetch<User>("/api/user");
```

## 8. Generics with Constraints (Advanced)
You can restrict types.
```ts
function getLength<T extends { length: number }>(item: T) {
  return item.length;
}

getLength("Hello"); // ✅
getLength([1,2,3]); // ✅
getLength(123); // ❌ error
```

## 9. Multiple Generics
```ts
function merge<A, B>(a: A, b: B): A & B {
  return { ...a, ...b };
}

const user = merge({ name: 'Bhavik' }, { age: 25 });
// type: { name: string } & { age: number }
```

## 10. Generic Classes
```ts
class State<T> {
  private value: T;
  constructor(initial: T) {
    this.value = initial;
  }
  get(): T {
    return this.value;
  }
  set(val: T): void {
    this.value = val;
  }
}

const counter = new State<number>(0);
counter.set(5); // ✅
```

## 11. Why Generics are IMPORTANT (especially for you)

In React / Next.js, generics are used in:
- useState
- useReducer
- useRef
- custom hooks
- API calls
- reusable components
- TanStack Query
- Zustand
- Redux Toolkit