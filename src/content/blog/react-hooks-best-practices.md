---
title: "React Hooks Best Practices"
description: "Write better React components with these hook patterns"
pubDate: 2024-09-20
author: "Dev Writer"
tags: ["react", "hooks", "best-practices"]
---

React Hooks changed how we write components. Here are patterns I've learned from building production apps.

## Custom Hooks for Reusability

Extract common logic into custom hooks:

```jsx
// useFetch.js
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const response = await fetch(url);
        const json = await response.json();
        
        if (!cancelled) {
          setData(json);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}

// Usage
function UserProfile({ userId }) {
  const { data, loading, error } = useFetch(`/api/users/${userId}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{data.name}</div>;
}
```

## useCallback for Performance

Memoize callbacks to prevent unnecessary re-renders:

```jsx
import { useState, useCallback } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);

  // Without useCallback, this creates a new function on every render
  const addTodo = useCallback((text) => {
    setTodos(prev => [...prev, { id: Date.now(), text }]);
  }, []);

  const removeTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  return (
    <div>
      <TodoForm onAdd={addTodo} />
      <TodoItems todos={todos} onRemove={removeTodo} />
    </div>
  );
}
```

## useMemo for Expensive Calculations

Cache computed values:

```jsx
import { useMemo } from 'react';

function DataTable({ data, filters }) {
  const filteredData = useMemo(() => {
    return data.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        return item[key] === value;
      });
    });
  }, [data, filters]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredData]);

  return (
    <table>
      {sortedData.map(item => (
        <tr key={item.id}>
          <td>{item.name}</td>
        </tr>
      ))}
    </table>
  );
}
```

## useReducer for Complex State

When state logic gets complex, use useReducer:

```jsx
import { useReducer } from 'react';

const initialState = {
  items: [],
  loading: false,
  error: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, items: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return { 
        ...state, 
        items: state.items.filter(item => item.id !== action.payload) 
      };
    default:
      return state;
  }
}

function ItemManager() {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function fetchItems() {
    dispatch({ type: 'FETCH_START' });
    try {
      const response = await fetch('/api/items');
      const data = await response.json();
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  }

  return (
    <div>
      {state.loading && <div>Loading...</div>}
      {state.error && <div>Error: {state.error}</div>}
      {state.items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

## Cleanup in useEffect

Always clean up side effects:

```jsx
import { useEffect } from 'react';

function WebSocketComponent() {
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
      console.log('Message:', event.data);
    };

    // Cleanup function
    return () => {
      ws.close();
    };
  }, []);

  return <div>WebSocket Connected</div>;
}
```

## Conclusion

These patterns have saved me countless hours of debugging. Use custom hooks for reusability, memoization for performance, and always clean up your effects.
