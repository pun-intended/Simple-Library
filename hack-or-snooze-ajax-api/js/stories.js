"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  let star = ""
  if (currentUser){
    star = '<i class="fa-regular fa-star favorite"></i>'
    for (let fave of currentUser.favorites){
      if (fave.storyId == story.storyId){
        star = '<i class="fa-solid fa-star favorite"></i>'
      } 
    }
  }

  return $(`
      <li id="${story.storyId}">
        ${star} 
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small><br>
        <small class="story-author">by ${story.author}</small><br>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}


async function submitStory() {
  const story = {
    "title": $("#submission-title").val(),
    "author": $("#submission-author").val(),
    "url": $("#submission-url").val()
  }
  await storyList.addStory(currentUser, story);
  await updateUser();
}

$submissionForm.on("submit", async () => {
  await submitStory();
  await updateUser();
  putStoriesOnPage();
  $submissionForm.hide();
})

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");
  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

function showOwnStories(){
  $myStoriesList.empty();
  let ownList = StoryList.getOwnStories()
  
  markupStoryList(ownList, $myStoriesList)
  
  $myStoriesList.show()
}

function showFaveStories() {
  $faveStoriesList.empty();
  let faveList = StoryList.getFaveStories()
  
  markupStoryList(faveList, $faveStoriesList)
  
  $faveStoriesList.show()
}

function markupStoryList(list, location){
  for (let story of list.stories) {
    const $story = generateStoryMarkup(story);
    location.append($story);
    console.debug($story);
  }
}