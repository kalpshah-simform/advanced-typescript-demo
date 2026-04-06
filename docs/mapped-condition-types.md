## About this document
This document contains mapped type examples and conditional type examples that you can directly use in your projects.

# Mapped Types (Pure Examples)
## 1. Basic Reusable Wrapper

``` ts
type WrapWithMeta<T> = {
  [K in keyof T]: {
    value: T[K];
    label: string;
  };
};
```

Usage:

``` ts
type User = { id: number; name: string };

const userMeta: WrapWithMeta<User> = {
  id: { value: 1, label: 'User ID' },
  name: { value: 'Kalp', label: 'Full Name' },
};
```

## 2. Make Everything Optional

``` ts
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};
```

Usage:

``` ts
type Todo = { title: string; completed: boolean };

const patch: MyPartial<Todo> = {
  completed: true,
};
```

## 3. Make Everything Required

``` ts
type MyRequired<T> = {
  [K in keyof T]-?: T[K];
};
```

Usage:

``` ts
type User = { name?: string; email?: string };

const user: MyRequired<User> = {
  name: 'Kalp',
  email: 'kalp@example.com',
};
```

## 4. Make Everything Readonly

``` ts
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};
```

Usage:

``` ts
type Settings = { theme: string };

const settings: MyReadonly<Settings> = { theme: 'light' };
// settings.theme = 'dark'; // Error
```

## 5. Remove Readonly

``` ts
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};
```

Usage:

``` ts
type Locked = { readonly count: number };

const state: Mutable<Locked> = { count: 1 };
state.count = 2;
```

## 6. Key Prefixing

``` ts
type PrefixKeys<T, Prefix extends string> = {
  [K in keyof T as `${Prefix}${string & K}`]: T[K];
};
```

Usage:

``` ts
type Fields = { name: string; age: number };
type ApiFields = PrefixKeys<Fields, 'api_'>;

const data: ApiFields = {
  api_name: 'Kalp',
  api_age: 30,
};
```

## 7. Key Suffixing

``` ts
type SuffixKeys<T, Suffix extends string> = {
  [K in keyof T as `${string & K}${Suffix}`]: T[K];
};
```

Usage:

``` ts
type Form = { email: string; password: string };
type ErrorState = SuffixKeys<Form, 'Error'>;

const errors: ErrorState = {
  emailError: 'Invalid email',
  passwordError: 'Too short',
};
```

## 8. Uppercase Keys

``` ts
type UppercaseKeys<T> = {
  [K in keyof T as Uppercase<string & K>]: T[K];
};
```

Usage:

``` ts
type Flags = { darkMode: boolean; beta: boolean };
type ApiFlags = UppercaseKeys<Flags>;

const f: ApiFlags = { DARKMODE: true, BETA: false };
```

## 9. Lowercase Keys

``` ts
type LowercaseKeys<T> = {
  [K in keyof T as Lowercase<string & K>]: T[K];
};
```

Usage:

``` ts
type Env = { API_URL: string; NODE_ENV: string };
type NormalizedEnv = LowercaseKeys<Env>;

const env: NormalizedEnv = {
  api_url: 'https://example.com',
  node_env: 'development',
};
```

## 10. Getters

``` ts
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};
```

Usage:

``` ts
type User = { name: string; age: number };

const getters: Getters<User> = {
  getName: () => 'Kalp',
  getAge: () => 30,
};
```

## 11. Setters

``` ts
type Setters<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};
```

Usage:

``` ts
type User = { name: string; age: number };

const setters: Setters<User> = {
  setName: (value) => console.log(value),
  setAge: (value) => console.log(value),
};
```

## 12. Accessors

``` ts
type Accessors<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
} & {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};
```

Usage:

``` ts
type Counter = { value: number };

const accessors: Accessors<Counter> = {
  getValue: () => 1,
  setValue: (v) => console.log(v),
};
```

## 13. Boolean Map

``` ts
type BooleanMap<T> = {
  [K in keyof T]: boolean;
};
```

Usage:

``` ts
type FormFields = { name: string; email: string };

const touched: BooleanMap<FormFields> = {
  name: true,
  email: false,
};
```

## 14. Constant Value Mapping

``` ts
type ConstantValue<T, Value> = {
  [K in keyof T]: Value;
};
```

Usage:

``` ts
type FeatureKeys = { search: unknown; exportCsv: unknown };

const featureStatus: ConstantValue<FeatureKeys, 'enabled' | 'disabled'> = {
  search: 'enabled',
  exportCsv: 'disabled',
};
```

## 15. Box Wrapper

``` ts
type Box<T> = {
  [K in keyof T]: {
    data: T[K];
  };
};
```

Usage:

``` ts
type Profile = { name: string; age: number };

const boxedProfile: Box<Profile> = {
  name: { data: 'Kalp' },
  age: { data: 30 },
};
```

## 16. Key Mirror

``` ts
type KeyMirror<T> = {
  [K in keyof T]: K;
};
```

Usage:

``` ts
type ActionKeys = { create: unknown; update: unknown };

const actionNames: KeyMirror<ActionKeys> = {
  create: 'create',
  update: 'update',
};
```

## 17. Pick Keys

``` ts
type PickKeys<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

Usage:

``` ts
type User = { id: number; name: string; email: string };
type PublicUser = PickKeys<User, 'id' | 'name'>;

const publicUser: PublicUser = {
  id: 1,
  name: 'Kalp',
};
```

## 18. Omit Keys

``` ts
type OmitKeys<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};
```

Usage:

``` ts
type User = { id: number; name: string; password: string };
type SafeUser = OmitKeys<User, 'password'>;

const safeUser: SafeUser = {
  id: 1,
  name: 'Kalp',
};
```

## 19. Map to Arrays

``` ts
type ToArray<T> = {
  [K in keyof T]: T[K][];
};
```

Usage:

``` ts
type Filters = { tags: string; scores: number };

const filterState: ToArray<Filters> = {
  tags: ['ts', 'react'],
  scores: [1, 2, 3],
};
```

## 20. Config Generator

``` ts
type Config<T> = {
  [K in keyof T]: {
    key: K;
    defaultValue: T[K];
    description?: string;
  };
};
```

Usage:

``` ts
type AppSettings = { retries: number; endpoint: string };

const config: Config<AppSettings> = {
  retries: { key: 'retries', defaultValue: 3, description: 'Retry count' },
  endpoint: { key: 'endpoint', defaultValue: '/api', description: 'API path' },
};
```

## 21. Immediately Indexed Mapped Type

``` ts
type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type Actions = {
  login: {
    username: string;
    password: string;
  };
  logout: {
    reason: string;
  };
  update: {
    id: number;
    data: string;
  };
};

type ActionPayload = Prettify<
  {
    [K in keyof Actions]: {
      type: K;
    } & Actions[K];
  }[keyof Actions]
>;
```

Usage:

``` ts
const loginAction: ActionPayload = {
  type: 'login',
  username: 'kalp',
  password: 'secret123',
};

const logoutAction: ActionPayload = {
  type: 'logout',
  reason: 'Session expired',
};
```

# Conditional Types (Pure Examples)
## 1. Basic Conditional Type

``` ts
type IsString<T> = T extends string ? true : false;
```

Usage:

``` ts
type A = IsString<'hello'>; // true
type B = IsString<123>; // false
```

## 2. Type Selection

``` ts
type IfString<T> = T extends string ? T : never;
```

Usage:

``` ts
type A = IfString<'title'>; // 'title'
type B = IfString<number>; // never
```

## 3. Exclude Type

``` ts
type MyExclude<T, U> = T extends U ? never : T;
```

Usage:

``` ts
type Roles = 'admin' | 'user' | 'guest';
type NonAdmin = MyExclude<Roles, 'admin'>; // 'user' | 'guest'
```

## 4. Extract Type

``` ts
type MyExtract<T, U> = T extends U ? T : never;
```

Usage:

``` ts
type Roles = 'admin' | 'user' | 'guest';
type StaffRole = MyExtract<Roles, 'admin' | 'user'>; // 'admin' | 'user'
```

## 5. NonNullable

``` ts
type MyNonNullable<T> = T extends null | undefined ? never : T;
```

Usage:

``` ts
type Input = string | null | undefined;
type SafeInput = MyNonNullable<Input>; // string
```

## 6. Return Type

``` ts
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

Usage:

``` ts
type Fn = (id: number) => { ok: boolean };
type Result = MyReturnType<Fn>; // { ok: boolean }
```

## 7. Parameters

``` ts
type MyParameters<T> = T extends (...args: infer P) => any ? P : never;
```

Usage:

``` ts
type Fn = (name: string, age: number) => void;
type Args = MyParameters<Fn>; // [name: string, age: number]
```

## 8. Unwrap Promise

``` ts
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
```

Usage:

``` ts
type ApiResult = UnwrapPromise<Promise<{ id: number }>>; // { id: number }
```

## 9. Deep Unwrap Promise

``` ts
type DeepUnwrapPromise<T> = T extends Promise<infer U>
  ? DeepUnwrapPromise<U>
  : T;
```

Usage:

``` ts
type Final = DeepUnwrapPromise<Promise<Promise<string>>>; // string
```

## 10. Array Element Type

``` ts
type ElementType<T> = T extends (infer U)[] ? U : T;
```

Usage:

``` ts
type Item = ElementType<number[]>; // number
type Same = ElementType<boolean>; // boolean
```

## 11. First Tuple Element

``` ts
type First<T> = T extends [infer F, ...any[]] ? F : never;
```

Usage:

``` ts
type A = First<[string, number, boolean]>; // string
```

## 12. Last Tuple Element

``` ts
type Last<T> = T extends [...any[], infer L] ? L : never;
```

Usage:

``` ts
type Z = Last<[string, number, boolean]>; // boolean
```

## 13. Function Check

``` ts
type IsFunction<T> = T extends (...args: any[]) => any ? true : false;
```

Usage:

``` ts
type A = IsFunction<() => void>; // true
type B = IsFunction<string>; // false
```

## 14. Primitive Check

``` ts
type IsPrimitive<T> =
  T extends string | number | boolean | bigint | symbol | null | undefined
    ? true
    : false;
```

Usage:

``` ts
type A = IsPrimitive<number>; // true
type B = IsPrimitive<{ id: number }>; // false
```

## 15. Assignability Check

``` ts
type IsAssignable<T, U> = T extends U ? true : false;
```

Usage:

``` ts
type A = IsAssignable<'admin', string>; // true
type B = IsAssignable<number, string>; // false
```

## 16. Union Distribution

``` ts
type ToArray<T> = T extends any ? T[] : never;
```

Here `T` is used directly in the conditional type, so if `T` is a union, TypeScript applies the condition to each member separately.

Usage:

``` ts
type Mixed = ToArray<string | number>; // string[] | number[]
```

## 17. Prevent Distribution

``` ts
type NoDistribute<T> = [T] extends [any] ? T[] : never;
```

Here `T` is wrapped in a tuple, so TypeScript treats the union as a single whole type instead of splitting it member by member.

Usage:

``` ts
type Mixed = NoDistribute<string | number>; // (string | number)[]
```

## Any and Never Checks

``` ts
type IsNeverNaive<T> = T extends never ? true : false;
type IsNever<T> = [T] extends [never] ? true : false;

type IsAny<T> = 0 extends 1 & T ? true : false;

type Test<T> = T extends any ? true : false;
```

Usage:

``` ts
type A = IsNeverNaive<never>; // never (distributes and collapses)
type B = IsNever<never>; // true
type C = IsNever<string>; // false

type D = IsAny<any>; // true
type E = IsAny<string>; // false

type F = Test<never>; // never
```

## 18. Brand Type

``` ts
type Brand<T, B> = T & { __brand: B };
```

Usage:

``` ts
type UserId = Brand<number, 'UserId'>;
type ProductId = Brand<number, 'ProductId'>;

const createUserId = (id: number) => id as UserId;
const createProductId = (id: number) => id as ProductId;

const getUserById = (id: UserId) => `Fetching user ${id}`;

const userId = createUserId(101);
const productId = createProductId(101);

getUserById(userId); // OK
// getUserById(productId); // Error: ProductId is not assignable to UserId
// getUserById(101); // Error: number is not assignable to UserId
```

## 19. Narrow Literal

``` ts
type Narrow<T> =
  T extends string ? string :
  T extends number ? number :
  T;
```

Usage:

``` ts
type A = Narrow<'hello'>; // string
type B = Narrow<42>; // number
type C = Narrow<boolean>; // boolean
```

## 20. Default Type

``` ts
type Default<T, Fallback> = T extends undefined ? Fallback : T;
```

Usage:

``` ts
type ApiPort = Default<undefined, 3000>; // 3000
type FixedPort = Default<8080, 3000>; // 8080
```

## 21. Value or Return

``` ts
type ValueOrReturn<T> =
  T extends (...args: any[]) => infer R ? R : T;
```

Usage:

``` ts
type A = ValueOrReturn<() => number>; // number
type B = ValueOrReturn<string>; // string
```

## 22. Flatten Arrays

``` ts
type Flatten<T> = T extends (infer U)[] ? Flatten<U> : T;
```

Usage:

``` ts
type A = Flatten<number[][][]>; // number
type B = Flatten<string[]>; // string
```

## 23. Is Tuple

``` ts
type IsTuple<T> = T extends [any, ...any[]] ? true : false;
```

Usage:

``` ts
type A = IsTuple<[string, number]>; // true
type B = IsTuple<string[]>; // false
```

## 24. Values of Object

``` ts
type Values<T> = T[keyof T];
```

Usage:

``` ts
type User = { id: number; name: string; active: boolean };
type UserValues = Values<User>; // number | string | boolean
```

## 25. Type Name

``` ts
type TypeName<T> =
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  "other";
```

Usage:

``` ts
type A = TypeName<'hello'>; // "string"
type B = TypeName<123>; // "number"
type C = TypeName<Date>; // "other"
```

# Mixed Mapped + Conditional Types (Production-Grade)

## 1. DeepMerge

``` ts
type DeepMerge<A, B> =
  A extends object
    ? B extends object
      ? {
          [K in keyof A | keyof B]:
            K extends keyof B
              ? K extends keyof A
                ? DeepMerge<A[K], B[K]>
                : B[K]
              : K extends keyof A
                ? A[K]
                : never;
        }
      : B
    : B;
```

Usage:

``` ts
type Base = { user: { id: number; name: string }; active: boolean };
type Override = { user: { name: string; role: 'admin' | 'user' } };

type Merged = DeepMerge<Base, Override>;
// { user: { id: number; name: string; role: 'admin' | 'user' }; active: boolean }
```

## 2. SmartPartial

``` ts
type SmartPartial<T> =
  T extends object
    ? { [K in keyof T]?: SmartPartial<T[K]> }
    : T;
```

Usage:

``` ts
type Settings = {
  api: { url: string; timeout: number };
  features: { darkMode: boolean };
};

const update: SmartPartial<Settings> = {
  api: { timeout: 5000 },
};
```

## 3. DeepNonNullable

``` ts
type DeepNonNullable<T> =
  T extends object
    ? { [K in keyof T]: DeepNonNullable<NonNullable<T[K]>> }
    : NonNullable<T>;
```

Usage:

``` ts
type ApiUser = {
  id: number | null;
  profile: { email: string | null } | null;
};

type SafeApiUser = DeepNonNullable<ApiUser>;
// { id: number; profile: { email: string } }
```

## 4. DeepMutable

``` ts
type DeepMutable<T> =
  T extends object
    ? { -readonly [K in keyof T]: DeepMutable<T[K]> }
    : T;
```

Usage:

``` ts
type ReadonlyState = {
  readonly user: {
    readonly name: string;
  };
};

const state: DeepMutable<ReadonlyState> = {
  user: { name: 'Kalp' },
};

state.user.name = 'Updated';
```

## 5. DeepFreeze

``` ts
type DeepFreeze<T> =
  T extends object
    ? { readonly [K in keyof T]: DeepFreeze<T[K]> }
    : T;
```

Usage:

``` ts
type Draft = {
  user: { name: string; preferences: { theme: string } };
};

const frozen: DeepFreeze<Draft> = {
  user: { name: 'Kalp', preferences: { theme: 'light' } },
};

// frozen.user.preferences.theme = 'dark'; // Error
```

## 6. DeepReplace

``` ts
type DeepReplace<T, From, To> =
  T extends From
    ? To
    : T extends object
      ? { [K in keyof T]: DeepReplace<T[K], From, To> }
      : T;
```

Usage:

``` ts
type RawApi = {
  id: string;
  nested: { createdAt: string; count: number };
};

type ParsedApi = DeepReplace<RawApi, string, Date>;
// { id: Date; nested: { createdAt: Date; count: number } }
```

## 7. PathValue

``` ts
type PathValue<T, Path extends string> =
  Path extends `${infer Key}.${infer Rest}`
    ? Key extends keyof T
      ? PathValue<T[Key], Rest>
      : never
    : Path extends keyof T
      ? T[Path]
      : never;
```

Usage:

``` ts
type Store = {
  user: {
    profile: {
      email: string;
    };
  };
};

type EmailType = PathValue<Store, 'user.profile.email'>; // string
```

## 8. DeepPick

``` ts
type DeepPick<T, Path extends string> =
  Path extends `${infer Key}.${infer Rest}`
    ? Key extends keyof T
      ? { [K in Key]: DeepPick<T[K], Rest> }
      : never
    : Path extends keyof T
      ? { [K in Path]: T[Path] }
      : never;
```

Usage:

``` ts
type User = {
  id: number;
  profile: {
    email: string;
    phone: string;
  };
};

type EmailOnly = DeepPick<User, 'profile.email'>;
// { profile: { email: string } }
```

## 9. UnionToIntersection

``` ts
type UnionToIntersection<U> =
  (U extends any ? (arg: U) => void : never) extends
  (arg: infer I) => void
    ? I
    : never;
```

Usage:

``` ts
type A = { a: number };
type B = { b: string };
type C = { c: boolean };

type Combined = UnionToIntersection<A | B | C>;
// { a: number } & { b: string } & { c: boolean }
```

## 10. FunctionKeys

``` ts
type FunctionKeys<T> = {
  [K in keyof T]:
    T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];
```

Usage:

``` ts
type Service = {
  id: string;
  start: () => void;
  stop: () => void;
  retryCount: number;
};

type ServiceMethods = FunctionKeys<Service>; // 'start' | 'stop'
```

## 11. NonFunctionKeys

``` ts
type NonFunctionKeys<T> = {
  [K in keyof T]:
    T[K] extends (...args: any[]) => any ? never : K;
}[keyof T];
```

Usage:

``` ts
type Service = {
  id: string;
  start: () => void;
  stop: () => void;
  retryCount: number;
};

type ServiceProperties = NonFunctionKeys<Service>; // 'id' | 'retryCount'

const config: Record<ServiceProperties, any> = {
  id: 'service-1',
  retryCount: 5,
};
```
