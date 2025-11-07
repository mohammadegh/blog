---
title: "Getting Started with TypeScript"
description: "A practical guide to TypeScript for JavaScript developers"
pubDate: 2024-11-01
author: "Dev Writer"
tags: ["typescript", "javascript", "tutorial"]
---

TypeScript has become essential for modern web development. Here's what you need to know to get started.

## Why TypeScript?

TypeScript adds static typing to JavaScript, catching errors before runtime and improving code quality.

```typescript
// JavaScript - no type safety
function greet(name) {
  return `Hello, ${name}!`;
}

// TypeScript - with type safety
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

## Basic Types

TypeScript provides several basic types:

```typescript
let isDone: boolean = false;
let count: number = 42;
let username: string = "developer";
let items: number[] = [1, 2, 3];
let tuple: [string, number] = ["age", 25];
```

## Interfaces

Interfaces define the shape of objects:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  isActive?: boolean; // optional property
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
};
```

## Type Inference

TypeScript is smart about inferring types:

```typescript
// Type is inferred as number
let count = 10;

// Type is inferred as string[]
let names = ["Alice", "Bob", "Charlie"];

// Return type is inferred as number
function add(a: number, b: number) {
  return a + b;
}
```

## Conclusion

TypeScript improves code quality and developer experience. Start small and gradually adopt more features as you get comfortable.
