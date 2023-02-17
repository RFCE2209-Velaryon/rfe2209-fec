# rfe2209-fec

> Project description

## Related Projects

  - https://github.com/dchong1999
  - https://github.com/fuller2580
  - https://github.com/jakejet64

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Constructing a Git Workflow

1. To begin with each feature should be worked on in a seperate branch
1. To do so first grab the latest pushed code
1. ***git checkout main*** (jumping to main branch)
1. ***git fetch origin*** (Pull latest commits)
1. ***git reset --hard origin/main*** (throws away all staged/unstaged changes resets to origin/master)
1. ***git checkout -b BRANCH_NAME*** (creates a new branch for a feature to be worked on)
1. ***git status | add | commit*** (within this branch to update and write code for it)
1. ***git push -u origin BRANCH_NAME*** (pushes completed feature to origin/main)
1. Now the information must be pulled again when you start to keep up with others who have created features

## Opening Day Work with Git
1. Start with ***git fetch*** (to see whether there is any new commits to pull)
1. Then ***git checkout main*** (to get the main branch locally up to date)
1. ***git pull*** (will pull all the commited information back to the local main branch)
1. ***git checkout BRANCH_NAME*** (takes us back to the fetature branch)
1. ***git merge origin*** (merge the information from main to the branch)
1. fix merge conflicts in VSC by keeping the stuff you want from the previous commit and getting rid of everything else
1. Once Complete and features ready to commit ***git checkout -b BRANCH_NAME*** (to send it back to main)

## Testing Branch

1. Start with ***git checkout test*** (Takes you to the testing branch)
1. Create a new subTesting branch for your component ***git checkout -b BRANCH_NAME***
1. For each Feature either work on it within this subbranch or create another subbranch from there
1. ***git fetch*** then ***git merge origin*** to get main branch info to Test Branch
1. Do the same to the subBranch before sending a push request to the Github
1. ***git push -u origin BRANCH_NAME*** (Sending info to Git Repo)
1. ***ONLY SEND PULL REQUEST TO TEST BRANCH***
1. Test branch has all the tests while main branch is clear of tests

## Requirements



## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

Rename & Fill in API Keys within each of the following:

1. api.example.js  ->  api.js
1. imagekit.example.js  ->  imagekit.js
1. src/config.example.js -> src/config.js

imagekit sample API key:
1. Receive values from imagekit developer settings tool
var imagekit = new ImageKit({
  publicKey: "public_#################=",
  privateKey: "private_###################=",
  urlEndpoint: "https://ik.imagekit.io/id"
});

## Demos

### Product Overview

![giphy](https://user-images.githubusercontent.com/70343256/219582305-bd84cd6c-7fd6-432f-a54e-091192c4f537.gif)

### Related Items

![giphy (1)](https://user-images.githubusercontent.com/70343256/219582313-727d8460-4aaa-44ee-ab68-3a3379c649d1.gif)

### Q&A

![giphy (2)](https://user-images.githubusercontent.com/70343256/219582364-58943822-1ff6-4bd4-b935-e5f68eeee74e.gif)

### Reviews

![giphy (3)](https://user-images.githubusercontent.com/70343256/219582386-6c29344e-f34f-4abd-a4e9-95186b0bb6e0.gif)
