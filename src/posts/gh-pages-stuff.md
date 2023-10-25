---
title: Github Pages pitfall
date: 2023-10-25
---
When you select a branch for your Github Pages build, just save a github actions file under `.github/workflows/` and push it to your repo. Github will automatically build your site and deploy it to the branch you selected.

> The important thing is to remember which branch is the build pulling from. It should always be `gh-pages`

I spent considerable time last night trying to figure out where the hell my build artefacts were going
