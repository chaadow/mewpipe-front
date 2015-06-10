
(function() {
  'use strict';

  function videoService($http, Upload) {
    return {
      get: function (companyId) {
        return $http.get(CONFIG.api_url + 'videos');
      },
      getLastPosted: function (nbItemsToLoad, companyId) {
        return $http.get(CONFIG.api_url + 'videos/getLastPostedItems?limit=' + nbItemsToLoad + '&company_id=' +  companyId);
      },
      getMostViewed: function (nbVideo) {
        return $http.get(CONFIG.api_url + 'videos/?property=view_count&order=desc&per_page='+nbVideo);
      },
      getBestRanked: function (nbItemsToLoad, companyId) {
        return $http.get(CONFIG.api_url + 'videos/getBestRankedItems?limit=' + nbItemsToLoad + '&company_id=' +  companyId);
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
      getByTags: function (companyId, tag) {
        return $http.get(CONFIG.api_url + 'items/getItemsByTags?company_id=' + companyId + '&tag=' + tag);
      },
      set: function(toSend, videoFile, callback) {


        var videoUpload = Upload.upload({
          url: CONFIG.api_url + 'videos/upload/',
          method: 'POST',
          fields: toSend,
          file: videoFile
        })
          .progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //callback(progressPercentage);
            console.log('progress: ' + progressPercentage + '% ' +
            evt.config.file.name);
          }).success(function (data, status, headers, config) {
            console.log('file ' + config.file.name + 'uploaded. Response: ' +
            JSON.stringify(data));

            //callbackResult(data, null);
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
            callback(data, null);
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
