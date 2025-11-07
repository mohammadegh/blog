---
title: "Async/Await Patterns in JavaScript"
description: "Master asynchronous JavaScript with practical patterns and examples"
pubDate: 2024-10-15
author: "Dev Writer"
tags: ["javascript", "async", "promises"]
---

Understanding async/await is crucial for modern JavaScript development. Let's explore common patterns.

## Basic Async/Await

The simplest pattern for handling asynchronous operations:

```javascript
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}
```

## Parallel Execution

When operations don't depend on each other, run them in parallel:

```javascript
async function fetchUserData(userId) {
  // Sequential - slow
  const user = await fetchUser(userId);
  const posts = await fetchPosts(userId);
  const comments = await fetchComments(userId);

  // Parallel - fast
  const [user, posts, comments] = await Promise.all([
    fetchUser(userId),
    fetchPosts(userId),
    fetchComments(userId)
  ]);

  return { user, posts, comments };
}
```

## Error Handling

Handle errors gracefully with try/catch:

```javascript
async function processData() {
  try {
    const data = await fetchData();
    const processed = await processItem(data);
    return processed;
  } catch (error) {
    if (error.code === 'NETWORK_ERROR') {
      // Retry logic
      return await retryFetch();
    }
    throw error;
  }
}
```

## Promise.allSettled

When you want all promises to complete regardless of failures:

```javascript
async function fetchMultipleResources() {
  const results = await Promise.allSettled([
    fetch('/api/users'),
    fetch('/api/posts'),
    fetch('/api/comments')
  ]);

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`Request ${index} succeeded:`, result.value);
    } else {
      console.log(`Request ${index} failed:`, result.reason);
    }
  });
}
```

## Async Iteration

Process items one at a time with async iteration:

```javascript
async function processItems(items) {
  for (const item of items) {
    await processItem(item);
    console.log(`Processed: ${item.id}`);
  }
}

// Or use for-await-of for async iterables
async function* generateData() {
  yield await fetchBatch(1);
  yield await fetchBatch(2);
  yield await fetchBatch(3);
}

async function consumeData() {
  for await (const batch of generateData()) {
    console.log('Processing batch:', batch);
  }
}
```

## Conclusion

Mastering these patterns will make your async code cleaner and more maintainable. Remember to handle errors properly and choose the right pattern for your use case.
