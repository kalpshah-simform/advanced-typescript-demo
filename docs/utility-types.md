# Utility Types
## What Are Utility Types?

Utility types are predefined generic types in TypeScript that help you transform existing types.

They are built using:

- keyof
- mapped types
- conditional types
- infer
- extends

## Built-in Utility Types
These are core Typescript helpers that are foundational.
### 1. `Partial<T>`
- **Purpose**: Makes all properties of a type optional.
- **Syntax**: `Partial<T>`
```ts
type User = {
  name: string;
  age: number;
};

const updateUser = (user: Partial<User>) => {
  // Can update name or age or both or neither
};

updateUser({ name: 'John' });
```
**React Example**:

```ts
type Props = {
  onClick: () => void;
  style: React.CSSProperties;
};

const Button = (props: Partial<Props>) => {
  return <button style={props.style} onClick={props.onClick}>Click</button>;
};
```

### 2. `Required<Type>`

- **Purpose**: Opposite of `Partial`, makes all optional properties required.

```ts
type User = {
  name?: string;
  age?: number;
};

const user: Required<User> = {
  name: 'Kalp',
  age: 30,
};
```

### 3. `Readonly<Type>`

- **Purpose**: Makes all properties read only (immutable).

```ts
type User = {
  name: string;
};

const user: Readonly<User> = {
  name: 'Kalp',
};

// user.name = "New" // ❌ Error: cannot assign to 'name'
```

### 4. `Record<Keys, Type>`

- **Purpose**: Constructs a type with a set of keys of type `Keys`, with values of type `Type`.

```ts
type Role = 'admin' | 'user' | 'guest';
type Permissions = 'read' | 'write';

const access: Record<Role, Permissions[]> = {
  admin: ['read', 'write'],
  user: ['read'],
  guest: [],
};

```
**React Example** (Component map):

```ts
type ComponentMap = Record<'home' | 'about', React.FC>;

const pages: ComponentMap = {
  home: () => <div>Home</div>,
  about: () => <div>About</div>,
};
```

### 5. `Pick<Type, Keys>`

- **Purpose**: Creates a new type by picking only specific properties.

```ts
type User = {
  id: number;
  name: string;
  age: number;
};

type PublicUser = Pick<User, 'id' | 'name'>;

const user: PublicUser = {
  id: 1,
  name: 'Kalp',
};
```
### 6. `Omit<Type, Keys>`

- **Purpose**: Opposite of `Pick`, removes the specified keys.

```ts
type User = {
  id: number;
  name: string;
  age: number;
};
type PrivateUser = Omit<User, 'age'>;
const user: PrivateUser = {
 age:100
};
```

### 7. `Exclude<UnionType, ExcludedMembers>`

- **Purpose**: Removes members from a union.

```ts
type Roles = 'admin' | 'user' | 'guest';
type AdminFree = Exclude<Roles, 'admin'>;
// 'user' | 'guest'
```

### 8. `Extract<UnionType, Members>`

- **Purpose**: Keeps only specified members from a union.

```ts
type OnlyGuests = Extract<Roles, 'guest'>;
// 'guest'
```

### 9. `NonNullable<Type>`

- **Purpose**: Removes `null` and `undefined` from a type.

```ts
type Input = string | null | undefined;
type CleanInput = NonNullable<Input>; // string
```

### 10. `ReturnType<Function>`

- **Purpose**: Gets the return type of a function.

```ts
const getUser = () => ({ name: 'Bhavik', age: 30 });
type User = ReturnType<typeof getUser>;
```

### 11. `InstanceType<Class>`

- **Purpose**: Gets the instance type of a class constructor.

```tsx
class Person {
  name = 'Kalp';
}

type PersonInstance = InstanceType<typeof Person>;
```

### 12. `Parameters<T>`

- **Purpose**: Extracts the parameter types of a function as a tuple.

```ts
const createTodo = (title: string, completed: boolean, priority: number) => {
  return { title, completed, priority };
};

type CreateTodoParams = Parameters<typeof createTodo>;
// [title: string, completed: boolean, priority: number]

const args: CreateTodoParams = ['Learn TypeScript', false, 1];
```

**React Example** (Reusing callback argument types):

```ts
type SaveHandler = (id: number, value: string) => void;
type SaveArgs = Parameters<SaveHandler>;

const handleSave = (...args: SaveArgs) => {
  const [id, value] = args;
  console.log(id, value);
};
```

### 13. `Awaited<T>`

- **Purpose**: Recursively unwraps the resolved type of a `Promise`.

```ts
type ApiResponse = Promise<Promise<{ ok: boolean; message: string }>>;

type ResolvedApiResponse = Awaited<ApiResponse>;
// { ok: boolean; message: string }

const result: ResolvedApiResponse = {
  ok: true,
  message: 'Saved successfully',
};
```

### 14. `ConstructorParameters<Type>`

- **Purpose**: Extracts the parameter types of a class constructor as a tuple.

```ts
class Todo {
  constructor(public id: number, public title: string, public completed: boolean) {}
}

type TodoCtorArgs = ConstructorParameters<typeof Todo>;
// [id: number, title: string, completed: boolean]

const todoArgs: TodoCtorArgs = [1, 'Learn utility types', false];
const todo = new Todo(...todoArgs);
```

### 15. `NoInfer<Type>`

- **Purpose**: Prevents a value from participating in generic type inference.

```ts
function chooseValue<T>(value: T, fallback: NoInfer<T>): T {
  return value ?? fallback;
}

const status = chooseValue<'success' | 'error'>('success', 'error'); // OK
// const invalid = chooseValue<'success' | 'error'>('success', 'pending');
// Error: 'pending' is not assignable to 'success' | 'error'
```

### 16. `ThisParameterType<Type>`

- **Purpose**: Extracts the type of the `this` parameter from a function type.

```ts
function printTodo(this: { id: number; title: string }, prefix: string) {
  console.log(prefix, this.id, this.title);
}

type TodoThis = ThisParameterType<typeof printTodo>;
// { id: number; title: string }

const todoContext: TodoThis = { id: 1, title: 'Write docs' };
printTodo.call(todoContext, 'Todo:');
```

### 17. `OmitThisParameter<Type>`

- **Purpose**: Removes the `this` parameter from a function type.

```ts
function formatTodo(this: { id: number; title: string }, prefix: string) {
  return `${prefix} ${this.id} - ${this.title}`;
}

type FormatTodoWithoutThis = OmitThisParameter<typeof formatTodo>;
// (prefix: string) => string

const boundFormat: FormatTodoWithoutThis = formatTodo.bind({
  id: 2,
  title: 'Practice utility types',
});

const text = boundFormat('Todo:');
```

### 18. `ThisType<Type>`

- **Purpose**: Defines the contextual type of `this` inside object literal methods.

```ts
type TodoData = {
  id: number;
  title: string;
  completed: boolean;
};

type TodoMethods = {
  markDone(): void;
  rename(newTitle: string): void;
} & ThisType<TodoData & TodoMethods>;

const todoModel: { data: TodoData; methods: TodoMethods } = {
  data: { id: 1, title: 'Read docs', completed: false },
  methods: {
    markDone() {
      this.completed = true;
    },
    rename(newTitle) {
      this.title = newTitle;
    },
  },
};
```

### 19. Intrinsic String Manipulation Types

- **Purpose**: Transform string literal types at the type level.

#### `Uppercase<StringType>`

```ts
type Role = 'admin' | 'editor';
type RoleUpper = Uppercase<Role>;
// 'ADMIN' | 'EDITOR'
```

#### `Lowercase<StringType>`

```ts
type ApiStatus = 'SUCCESS' | 'FAILED';
type ApiStatusLower = Lowercase<ApiStatus>;
// 'success' | 'failed'
```

#### `Capitalize<StringType>`

```ts
type EventName = 'click' | 'submit';
type EventLabel = Capitalize<EventName>;
// 'Click' | 'Submit'
```

#### `Uncapitalize<StringType>`

```ts
type RouteName = 'Home' | 'About';
type RoutePathKey = Uncapitalize<RouteName>;
// 'home' | 'about'
```

### 20. `Array<T>` and Tuple Types

- **Purpose**: Built-in generic type for arrays and fixed-length tuples.

#### `Array<T>`

```ts
type StringArray = Array<string>;
// Equivalent to: string[]

const names: StringArray = ['Alice', 'Bob'];
```

#### Tuple Types

```ts
type Point = [number, number];
const origin: Point = [0, 0];

type NameAndAge = [string, number];
const user: NameAndAge = ['Kalp', 30];
```

## TypeScript Custom Utility Types (Day-to-Day Usage)

### Nullable / Optional
```ts
type Nullable<T> = T | null;
type Optional<T> = T | undefined;
```

### ValueOf
```ts
type ValueOf<T> = T[keyof T];
```

### Prettify
```ts
type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
```

### DeepPartial
```ts
type DeepPartial<T> =
  T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;
```

### DeepRequired
```ts
type DeepRequired<T> =
  T extends object
    ? { [K in keyof T]-?: DeepRequired<T[K]> }
    : T;
```

### NonEmptyArray
```ts
type NonEmptyArray<T> = [T, ...T[]];
```

### ArrayElement
```ts
type ArrayElement<T> =
  T extends readonly (infer U)[] ? U : never;
```

### RequireAtLeastOne
```ts
type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
  Keys extends keyof T
    ? { [K in Keys]-?: T[K] } & Partial<Omit<T, Keys>>
    : never;
```

### RequireOnlyOne
```ts
type RequireOnlyOne<T, Keys extends keyof T = keyof T> =
  {
    [K in Keys]:
      Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, never>>
  }[Keys] & Omit<T, Keys>;
```

### Merge
```ts
type Merge<T, U> = Prettify<Omit<T, keyof U> & U>;
```

### KeysOfType
```ts
type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];
```

### Filter
```ts
type Filter<T, U> =
  T extends U ? T : never;
```

### Exact
```ts
type Exact<T, Shape> =
  T extends Shape
    ? Exclude<keyof T, keyof Shape> extends never
      ? T
      : never
    : never;
```

### AsyncReturnType
```ts
type AsyncReturnType<T extends (...args: any) => any> =
  Awaited<ReturnType<T>>;
```
