
(function() {
  'use strict';

  function videoService($http, Upload) {
    return {
      get: function (companyId) {
        return $http.get(CONFIG.api_url + 'video');
      },
      getLastPosted: function (nbItemsToLoad, companyId) {
        return $http.get(CONFIG.api_url + 'items/getLastPostedItems?limit=' + nbItemsToLoad + '&company_id=' +  companyId);
      },
      getBestRanked: function (nbItemsToLoad, companyId) {
        return $http.get(CONFIG.api_url + 'items/getBestRankedItems?limit=' + nbItemsToLoad + '&company_id=' +  companyId);
      },
      getByUser: function (userId) {
        return $http.get(CONFIG.api_url + 'items?user_id=' + userId);
      },
      getOne: function(itemId) {
        var item = $http.get(CONFIG.api_url + 'items/' + itemId);

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
        });

        videoUpload.success(function(data, status, headers, config) {
          callback(null, data);
        })
          .error(function(data, error) {
            callback(data, null);
          });


      },
      like: function(toSend) {

        return $http.post(CONFIG.api_url + 'likes/create', toSend);

      },
      checkItemIsLiked: function(toSend) {

        return $http.post(CONFIG.api_url + 'likes/find', toSend);

      },
      //TODO
      update: function(toSend) {

      },
      //TODO
      destroy: function() {

      }
    };
  }

  angular.module('common.services.video', ['ngFileUpload'])
    .factory('VideoService', ['$http', 'Upload',  videoService]);
})();
