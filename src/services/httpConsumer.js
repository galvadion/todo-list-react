const url = "http://localhost:3001/tasks";

export const getTasks = (onSuccess,onFinish) =>
    fetch(url)
    .then(response => response.json())
    .then(onSuccess)
    .finally(onFinish);

export const addTask = (task,onSuccess,onFinish) => 
fetch(url,{
    method: 'POST',
    headers:{ 
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
    body: JSON.stringify(task),
  }).then((data) => data.json())
  .then(onSuccess)
  .finally(onFinish)

export const editTask = (id,task,onSuccess,onFinish) => 
  fetch(`${url}/${id}`,{
            method: 'PUT',
            headers:{ 
                'Accept': 'application/json',
                'Content-Type':'application/json'
              },
            body: JSON.stringify(task),
          }).then((data) => data.json())
          .then(onSuccess)
          .finally(onFinish)

export const httpDeleteTask = (id) =>
fetch(`${url}/${id}`,{
        method: 'DELETE',
    }).then((data) => data.json())