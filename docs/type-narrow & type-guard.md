### What is Type Narrowing?

> Type narrowing means refining the type of a variable based on logic so Typescript can infer the specific type.
### 1. Basic Type Narrowing with `typeof`

```tsx
function printValue(val: string | number) {
  if (typeof val === 'string') {
    console.log(val.toUpperCase());
  } else {
    console.log(val.toFixed(2));
  }
}
```

---

### 2. Narrowing with `in`

```tsx
type Dog = { bark: () => void };
type Cat = { meow: () => void };

function makeSound(pet: Dog | Cat) {
  if ('bark' in pet) {
    pet.bark();
  } else {
    pet.meow();
  }
}
```
---

### 3. Narrowing with `instanceof`

```tsx
class Car { drive() {} }
class Bike { pedal() {} }

function move(vehicle: Car | Bike) {
  if (vehicle instanceof Car) {
    vehicle.drive();
  } else {
    vehicle.pedal();
  }
}
```

---

### 4. Narrowing with Discriminated Unions

```tsx
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; side: number };

function area(shape: Shape) {
  if (shape.kind === 'circle') {
    return Math.PI * shape.radius ** 2;
  } else {
    return shape.side ** 2;
  }
}
```

---

### 5. Custom Type Predicates

```tsx
type Admin = { role: 'admin'; level: number };
type User = { role: 'user'; username: string };

function isAdmin(account: Admin | User): account is Admin {
  return account.role === 'admin';
}

function printAccount(account: Admin | User) {
  if (isAdmin(account)) {
    console.log(account.level);
  } else {
    console.log(account.username);
  }
}
```

---

### 6. Control Flow-Based Narrowing

```tsx
function handle(val: string | undefined) {
  if (!val) {
    console.log("No value");
    return;
  }
  console.log(val.toUpperCase()); // val is string now
}
```
---

## 7. Using Array.isArray
```ts
function log(input: string | string[]) {
  if (Array.isArray(input)) {
    input.forEach(console.log);
  } else {
    console.log(input);
  }
}
```
---

## 8. Discriminated unions for safe runtime type checking in React logic

Discriminated unions let you:

- Model different states using a shared key (discriminator)
- Safely check that key at runtime
- Get perfect type inference inside each branch

👉 So your UI logic becomes:

- type-safe
- impossible to misuse
- self-documenting

This is very close to real-world usage
```ts
type FetchState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };
```

Hook Example
```ts
const [state, setState] = useState<FetchState<User>>({
  status: "idle",
});
```
Usage in UI
```ts
switch (state.status) {
  case "loading":
    return <Spinner />;

  case "success":
    return <UserCard user={state.data} />;

  case "error":
    return <ErrorMessage msg={state.error} />;

  default:
    return null;
}
```
No `undefined` checks needed. Fully safe.

# Type Widening
**Type widening** is when TypeScript automatically converts a **narrow literal type** into a more general type.

It usually happens when TypeScript thinks the value might change later.

---
```ts
let name = "Kalp";
```
For above exaple, you think that type name is `kalp`. Right?

No. You're thinking wrong. The correct type is string

This is **type widening**.

## Example: let vs const vs Object widening
### 1. With `let` (Widening happens)
```ts
let count = 10;
```

Type: `number`

Not: `10`

Because:
```ts
count = 20; // allowed
```

### 2. With `const` (No widening)
```ts
const count = 10;
```
Type: `10`

Literal type is preserved.

Because:
```ts
count = 20; // ❌ Error
```

### 3. Widening in Objects
```ts
const user = {
  role: "admin"
};
```
What is the type of role?
```ts
{
  role: string
}
```
❗ Not "admin".

Why?

Because object properties are still mutable:
```ts
user.role = "user"; // allowed
```
So TypeScript widens "admin" → string.

## How to Prevent Widening
### 1. Use `as const`
```ts
const user = {
  role: "admin"
} as const;
```

Now the type is:
```ts
{
  readonly role: "admin"
}
```
Literal is preserved.

### 2. Explicit Literal Annotation
```ts
let role: "admin" = "admin";
```
Now it stays literal.

# Type Guards
### What Type Guards really are

Type guards are **runtime predicates that inform the compiler about control flow narrowing.**

They bridge:

- runtime uncertainty
- with compile-time guarantees

At scale, they become:

- validation layer
- API boundary safety net
- domain modeling tool

Most types of type guards are covered above, below is remaining:
### Assertion Guards (asserts value is T)
These are **underused but extremely powerful.**
```ts
function assertUser(value: unknown): asserts value is User {
  if (!isUser(value)) {
    throw new Error("Invalid user");
  }
}
```
**Usage**
```ts
const data: unknown = await fetchData();

assertUser(data);

// Now fully typed as User
data.id;
```
### Narrowing unknown safely (API layer)

Instead of:
```ts
const data = await res.json() as User; // ❌ unsafe
```
Do:
```ts
const data: unknown = await res.json();

if (!isUser(data)) {
  throw new Error("Invalid API response");
}
```
👉 This eliminates a whole class of runtime bugs.

### Common Mistakes (even seniors make)
#### 1. Overusing as
```ts
const user = data as User; // ❌ defeats type safety
```
#### 2. Weak guards
```ts
"id" in obj // ❌ not enough
```
#### 3. Forgetting null check
```ts
typeof val === "object" // ❌ includes null
```