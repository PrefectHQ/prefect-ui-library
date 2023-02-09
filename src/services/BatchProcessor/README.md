# BatchProcessor
The `BatchProcessor` can be used to queue and batch the processing of values using a single callback. This is useful for repetitive tasks but also useful for combining tasks for efficiency. A common use case for this is batching individual calls to an api endpoint into a single api request. 

A `BatchProcessor` can be created by passing a callback to be used for processing multiple values. The `BatchProcessor` will execute the callback automatically, passing one or more values in to be processed. 

A callback can return either `Map<Value, Response>` or `(value: Value) => Response`. If a map is returned from a callback, it assumes that every value will exist as a key in the map and the response can be found using that key. If a lookup function is returned it will call the lookup function for each value being processed to get the response for each value

## Example 
```typescript
const batcher = new BatchProcessor<string, User>(async userIds => {
  const users: User[] = await getUsersArray(userIds)

  // this is using a lookup function
  return userId => users.find(user => user.id === userId)
})

const user1: Promise<User> = batcher.batch('userId1')
const user2: Promise<User> = batcher.batch('userId2')
const user3: Promise<User> = batcher.batch('userId3')
```

## Public Methods

### Batch

```typescript
public batch(value: V): Promise<R>
```
This method adds a value to the queue to be processed later. 


### Process
```typescript
public process(): void
```
This method immediately processes the queue. 