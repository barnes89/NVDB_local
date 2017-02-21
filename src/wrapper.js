/*
  wrapper.js: file wich contains methods used in fetching data from server
*/
var fetch_finished = false; //bool used to keep information about fetching state

//fetches from api given url. When result is availiable-> calls callback function given as param
function fetchFromAPI_all(callback, url){
  console.log('#wrapper.fetchFromAPI');
  var objects = [];
  fetchData(url).then(function(firstObject){
    var flere = firstObject.metadata.returnert;
    if(flere > 0){
      console.log('--> flere objekter finnes');
      recursiveFetch(firstObject, objects, callback);
    }
    else{
      console.log('--> ingen flere objekter');
    }
  })
}

//recursively fetches if result from api contains many object, data "paginert" by NVDB
function recursiveFetch(object, objects, callback){
  console.log('#wrapper.recursiveFetch: ');
  var currentObject = object;
  //finds adresse of next object in array
  var nextObjectRef = object.metadata.neste.href;
  //calls fetch on next object in array
  fetchData(nextObjectRef).then(function(nextObject){
    var flere = nextObject.metadata.returnert;
    if(flere > 0){
      this.fetch_finished = false;
      console.log('--> flere objekter finnes');
      callback(objects, false);
      recursiveFetch(nextObject, objects, callback);
    }
    else{
      console.log('--> ingen flere objekter');
      callback(objects, true);
    }
  })
  for(var i = 0; i < currentObject.objekter.length; i++){
    objects.push(currentObject.objekter[i]);
  }
  return objects;
}

// the function wich handels all communication with NVDB
// _path is url of data to be fetched
async function fetchData(_path) {
  console.log('#wrapper.fetchdata');
  try {
    const response = await fetch(_path);
    const data = await response.json();
    return data;
  } catch(error) {
    console.log('ERROR: wrapper.fetchData');
  }
}

export {fetchFromAPI_all};
