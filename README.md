![Blog-BuildCustom-NPX-Script-2000x840px](https://github.com/user-attachments/assets/44cb4b5f-dff1-4313-b06e-45ca287deff9)

# NPX Script for a Next.js application powered by Stream Chat

This repository contains the code for an `npx` script that creates a new [Next.js](https://nextjs.org/) application. 
It then configures [Stream Chat](https://getstream.io/chat/) with the [React SDK](https://getstream.io/chat/docs/sdk/react/). 
You can find a written tutorial in the form of a blog post [here](https://getstream.io/blog/npx-script-project-setup/).

The steps that the script takes are:

1. Request user info for a project name
2. Clone the [template repository](https://github.com/GetStream/nextjs-chat-template), install its dependencies and initialize a new `git` project locally
3. Customize the repository files with custom information that the user can obtain from the [Stream Dashboard](https://dashboard.getstream.io/)

# Running the project

## Prerequisites

First, a machine running [Node.js](https://nodejs.org/en) and the option to clone the repository. To do a proper setup we will also need a Stream account (which we can get for free [here](https://http://getstream.io/try-for-free/)). With that we can create a project on the [Stream Dashboard](https://dashboard.getstream.io/), that we can get the necessary credentials from (see the [blog post](https://getstream.io/blog/npx-script-project-setup/) for more details on that).

## Running locally

The first thing to do is install dependencies:

```bash
npm install
# or
yarn
```

Then, we have two options to run the project. The first is by simply calling the script. We can do this with the following command:

```bash
node ./setup-script.js
```

However, we can also register the script in our local `npm` environment and make it available as an `npx` command there. For this we first need to link the package locally like this (we need to make sure we are in the root folder of the project for this):

```bash
npm link
```

And then we can run it from anywhere:

```bash
npx react-chat
```

## Use the Stream SDKs yourself

You can get started with the Stream SDKs today [for free](https://http://getstream.io/try-for-free/).

Find our React documentation here:

- [Chat SDK](https://getstream.io/chat/sdk/react/)
- [Video and Audio SDK](https://getstream.io/video/docs/react/)
- [Chat Low-level JS client](https://getstream.io/chat/docs/javascript/?language=javascript)
- [Video Low-level JS client](https://getstream.io/video/docs/javascript/)
