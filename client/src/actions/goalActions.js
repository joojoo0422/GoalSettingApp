export const addGoalJSON = (formValues, currUser) => {

    const newGoal = formValues.props;

    const title = newGoal.goalTitle;
    const description = newGoal.goalDescription;
    const duration = newGoal.goalDuration;

    //console.log('title: '+title+', description: '+description+', duration'+duration)

    const url = '/goals'

    const request = new Request(url, {
        method: 'post',
        body: JSON.stringify({
            title: title,
            description: description,
            duration: duration,
            comments: [],
            kudos: 0,
            flagged: false,
            creator: currUser
            // if you need to add attributes to Goal Schema
            // ** ADD ATTRIBUTE HERE **
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            if (res.status === 200) {
                return res.json()
            }
        })
        .catch(error => {
            console.log(error)
        })

}

export const getGoals = (goalList) => {
    // the URL for the request
    const url = "/goals";

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get goals");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            goalList.setState({ goals: json.goals });
        })
        .catch(error => {
            console.log(error);
        });
};

export const deleteGoal = (goal) => {

  const link = '/goals/';
  const url = link.concat(goal._id);

  const request = new Request(url, {
      method: 'DELETE',
  })

  fetch(request)
      .then(res => {
          if (res.status === 200) {
              return res.json();
          }
      })
      .catch(error => {
          console.log(error);
      });
}

export const flagGoal = (goal) => {

  const link = '/goals/';
  const url = link.concat(goal._id);

  const request = new Request(url, {
      method: 'PATCH',
  })

  fetch(request)
      .then(res => {
          if (res.status === 200) {
              return res.json();
          }
      })
      .catch(error => {
          console.log(error);
      });
};


export const setOwner = (app, goalForm) => {
// 5f2b2e87e920607eb31129c4 -> user1
    // get currentUsername
    const currUser = app.state.currentUser;
    const currUsername = currUser.username;

    // info of new goal
    const newGoal = goalForm.props;
    const newTitle = newGoal.goalTitle;
    const newDescription = newGoal.goalDescription;
    const newDuration = newGoal.goalDuration;
    //console.log('title: '+newTitle+', description: '+newDescription+', duration'+newDuration)

    //create link to user w/ id
    const link = '/users/';
    const url = link.concat(currUsername);

    // make new patch request
    const request = new Request(url, {
        method: 'PATCH',
        body: JSON.stringify({
            title: newTitle,
            description: newDescription,
            duration: newDuration
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export async function updateGoals(goalList, goalForm, app) {
    const currUser = app.state.currentUser;
    //console.log('updateGoals currUser: '+currUser.username)
    addGoalJSON(goalForm, currUser.username);
    getGoals(goalList);
    setOwner(app, goalForm);
}
