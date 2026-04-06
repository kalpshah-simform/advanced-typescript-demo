# Union Types (|)

A Union Type means a value can be one of multiple types.

Syntax:
```ts
type AorB = A | B;
```

Meaning:

Value can be A OR B

## 1. Basic union
```ts
let value: string | number;

value = "Hello"; // ✅ valid
value = 42;      // ✅ valid
value = true;    // ❌ error
```

## 2. Function with Union
```ts
function printId(id: string | number) {
  console.log(id);
}

printId("abc"); // ✅
printId(123);   // ✅
```

## 3. Union with Objects
```ts
type Admin = {
  role: "admin";
  permissions: string[];
};

type User = {
  role: "user";
};

type Person = Admin | User;
```

Now Person can be either Admin or User.

### Real-world example (API response)
```ts
type SuccessResponse = {
  status: "success";
  data: string;
};

type ErrorResponse = {
  status: "error";
  message: string;
};

type ApiResponse = SuccessResponse | ErrorResponse;
```

Usage:

```ts
function handleResponse(res: ApiResponse) {
  if (res.status === "success") {
    console.log(res.data);
  } else {
    console.log(res.message);
  }
}
```

# Intersection Types (&)
Intersection means combining multiple types into one.

**Syntax:**
```ts
type AB = A & B;
```
**Meaning:**

Value must be **A AND B**
## 1. Basic Intersection
```ts
type Person = {
  name: string;
};

type Employee = {
  employeeId: number;
};

type Staff = Person & Employee;
```
Now Staff must have BOTH:
```ts
const staff: Staff = {
  name: "John",
  employeeId: 123
};
```

## 2. Real-world example
```ts
type Timestamp = {
  createdAt: Date;
  updatedAt: Date;
};

type User = {
  id: string;
  name: string;
};

type UserWithTimestamp = User & Timestamp;
```
Result:
```ts
{
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## 3. Key Difference (CRITICAL)

| Feature | Union (\|) | Intersection (&) |
|---------|------------|------------------|
| Meaning | OR | AND |
| Value must satisfy | One of the types | All types |
| Flexibility | Less strict | More strict |
| Common use | API responses, input types | Combining objects |

## 4. Real-world Sidebar Architecture Example
This is real scalable architecture.
### Step 1: Base type
```ts
type BaseItem = {
  id: string;
  label: string;
  icon?: string;
};
```

### Step 2: Specific types
```ts
type LinkItem = BaseItem & {
  type: "link";
  href: string;
};

type CollapseItem = BaseItem & {
  type: "collapse";
  children: MenuItem[];
};

type SectionItem = BaseItem & {
  type: "section";
};
```

### Step 3: Union type
```ts
type MenuItem =
  | LinkItem
  | CollapseItem
  | SectionItem;
```

### Step 4: Sidebar data
```ts
const sidebar: MenuItem[] = [
  {
    type: "link",
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    type: "collapse",
    id: "settings",
    label: "Settings",
    children: [
      {
        type: "link",
        id: "profile",
        label: "Profile",
        href: "/profile",
      },
    ],
  },
];
```

### Step 5: Rendering Logic
```ts
function renderItem(item: MenuItem) {
  switch (item.type) {
    case "link":
      return <a href={item.href}>{item.label}</a>;

    case "collapse":
      return (
        <div>
          {item.label}
          {item.children.map(renderItem)}
        </div>
      );

    case "section":
      return <h3>{item.label}</h3>;
  }
}
```

## 5.Add Common Props with Intersection
Real apps need shared props:
```ts
type BaseProps = {
  children: React.ReactNode;
  className?: string;
};
```
Combine:
```ts
type ButtonProps = BaseProps &
  (
    | { variant: "button"; onClick: () => void }
    | { variant: "link"; href: string }
  );
```

## 6. Flexible Input Component (Real-world)
```ts
type InputProps =
  | {
      type: "text";
      value: string;
      onChange: (v: string) => void;
    }
  | {
      type: "number";
      value: number;
      onChange: (v: number) => void;
    };
```
**Usage:**
```ts
function Input(props: InputProps) {
  if (props.type === "text") {
    props.value.toUpperCase(); // ✅ string
  } else {
    props.value.toFixed(2); // ✅ number
  }
}
```

## 7. Type Guards in Components

Sometimes props are complex:
```ts
type Props =
  | { type: "image"; src: string }
  | { type: "video"; url: string };
```

Custom Guard
```ts
function isImage(props: Props): props is Extract<Props, { type: "image" }> {
  return props.type === "image";
}
```

**Usage**
```ts
if (isImage(props)) {
  return <img src={props.src} />;
}
```

## 8. Loose Autocomplete with Union + Intersection

Sometimes we want IntelliSense suggestions for known values, while still allowing any custom string.

```ts
// Loose autocomplete
type Autocomplete<T extends string> = T | (string & {});

type Color = Autocomplete<"red" | "green" | "blue">;

const color1: Color = "red"; // valid
const color2: Color = "yellow"; // valid, but not in the original union
```

Why this works:

- `T` keeps literal suggestions (`"red"`, `"green"`, `"blue"`).
- `string & {}` is effectively still a `string`, so custom values are also accepted.
- Combining both with `|` gives a developer-friendly type: suggested known literals + flexible input.

Use this pattern when strict validation is not required, but autocomplete ergonomics are important.