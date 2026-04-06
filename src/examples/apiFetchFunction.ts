export async function fetchPostsSuccess() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "Post 1", description: "Description 1" },
        { id: 2, title: "Post 2", description: "Description 2" },
        { id: 3, title: "Post 3", description: "Description 3" },
      ]);
    }, 1000);
  });
}

export async function fetchPostsFailure() {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Failed to fetch posts"));
    }, 1000);
  });
}

export function parseError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "Something went wrong";
}
