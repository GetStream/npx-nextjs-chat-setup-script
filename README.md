# NPX Script for a Next.js application powered by Stream Chat

This repository contains the code for an `npx` script that creates a new [Next.js](https://nextjs.org/) application. 
It then configures [Stream Chat](https://getstream.io/chat/) with the [React SDK](https://getstream.io/chat/docs/sdk/react/). 
You can find a written tutorial in the form of a blog post [here](https://getstream.io/blog/npx-script-chat-setup/).

The steps that the script takes are:

1. Request user info for a project name
2. Clone the [template repository](https://github.com/GetStream/nextjs-chat-template), install its dependencies and initialize a new `git` project locally
3. Customize the repository files with custom information that the user can obtain from the [Stream Dashboard](https://dashboard.getstream.io/)


## How to use it

```
npx @stream-io/create-app react-chat
```