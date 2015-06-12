
(function() {
  'use strict';

  function videoService($http, Upload) {
    return {
      get: function () {
        return $http.get(CONFIG.api_url + 'videos/?sort[property]=created_at');
      },
      getPublic: function () {
        return $http.get(CONFIG.api_url + 'videos/?scopes[listed]=true&sort[property]=created_at');
      },
      getMostViewed: function (nbVideo, confidentiality) {
        return $http.get(CONFIG.api_url + 'videos/?scopes[' + confidentiality + ']=true&sort[property]=view_count&order=desc&per_page='+nbVideo);
      },
      getBestShared: function (nbVideo, confidentiality) {
        return $http.get(CONFIG.api_url + 'videos/?scopes[' + confidentiality + ']=true&sort[property]=impressions_count&per_page='+nbVideo);
      },
      getByUser: function (userId) {
        return $http.get(CONFIG.api_url + 'videos?user_id=' + userId);
      },
      getOne: function(itemId) {
        var item = $http.get(CONFIG.api_url + 'videos/' + itemId);

        item.error(function (data, err) {
          console.log('ITEM ERROR: ', err);
        });

        return item;
      },
      getByTags: function (tag) {
        return $http.get(CONFIG.api_url + 'videos?tag_list='+tag);
      },
      set: function(toSend, videoFile, callback, progressCallback) {


        var videoUpload = Upload.upload({
          url: CONFIG.api_url + 'videos/upload/',
          method: 'POST',
          fields: toSend,
          file: videoFile
        })
          .progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            progressCallback(progressPercentage);
            console.log('progress: ' + progressPercentage + '% ' +
            evt.config.file.name);
          }).success(function (data, status, headers, config) {
            console.log('file ' + config.file.name + 'uploaded. Response: ' +
            JSON.stringify(data));
          });

        videoUpload.success(function(data, status, headers, config) {
          callback(null, data);
        })
          .error(function(data, error) {
            callback(data, null);
          });


      },
      update: function(toSend, videoId) {
        return $http.put(CONFIG.api_url + 'videos/' + videoId, toSend);
      },
      viewed: function(videoId, callback) {
        var view = $http.put(CONFIG.api_url + 'videos/' + videoId + '/increment_view');
        view.success(function(data) {
          callback(null, data);
        })
          .error(function(data, error) {
            callback(error, null);
          });
      },
      //TODO
      destroy: function() {

      }
    };
  }

  angular.module('common.services.video', ['ngFileUpload'])
    .factory('VideoService', ['$http', 'Upload',  videoService]);
})();
