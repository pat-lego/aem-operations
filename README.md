# AEM Operation Framework 

A simple framework built on Typescript to perform HTTP operations in AEM.

# Use Case

Content that needs to be operated on can leverage this framework to perform a delete/modify/read based on node traversal via HTTP. 

## Example

Let's say you need to delete content but you can't for a given reason we can use this framework, to do that work. We simply implement the `IteratorA` class and implement the necessary functions

- `shouldContinue`
- `shouldOperate`
- `operate `
- `getName`

# YAML Config

The `iterator` value needs to be the same as the `getName` return value used in the implementation of the `IteratorA` abstract class.

```
name: launch delete
operation:
  root: /content/launches
  iterator: NAME
authentication:
  server:
    host: https://author-pXYZ-eABCD.adobeaemcloud.com
  credentials:
    username: "admin"
    password: "PASSWORD"
```

# How to run

  node target/index.js PATH_TO_CONFIG.yml
