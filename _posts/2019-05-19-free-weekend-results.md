---
layout: post
author: Antti
title: Free Weekend Results
---

This weekend was a [free weekend]({{ site.baseurl }}{% post_url 2019-05-17-free-weekend %}) for me and I had a lot of time to spend on game development. Here are the biggest changes I did to MA:

1/4: Previously there was only one person trying to get to the orange exit. Now there is an endless stream of people entering all the time.

2/4: The player can edit the map with a few tools using the toolbar. The player can place a concrete floor or walls into the map, and also entry and exit gates through which people must travel.

3/4: People must pass through an entry gate before they can move into the orange exit.

4/4: People cannot pass through each other or walls.

<div class="blog__embed">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/MTB0Iel2awM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

I also started to improve the navigation system. As is visible in the video, people get stuck in the beginning due to the current navigation system that is too simple. Unity's [built in navigation system](https://docs.unity3d.com/Manual/Navigation.html) would work, but it does not support 2D games. I investigated using a [Navigation 2D](https://assetstore.unity.com/packages/tools/ai/navigation2d-pathfinding-for-2d-games-35803) package from Unity's Asset Store, but it is not suited for my needs. I think the next step is to investigate creating a navigation mesh system manually for MA's needs.   


