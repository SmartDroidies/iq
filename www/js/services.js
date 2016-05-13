angular.module('iq.services', [])

/* Managing a questionnaire  */
.service("Questionnaire", function($http, Cache) {

	return {
		getCasualQuestions:function() {
			console.log('Get Casual Questions');
			var self = this;
			var uri = encodeURI(C_URL);
			console.log("Download URL : " + uri);

			//FIXME - Send async response 
			$http.get(uri)
    			.then(function(response) {
    				console.log("Questionnaire - " + JSON.stringify(response.data));
    			}, function(response) {
    				//window.analytics.trackException('Data Sync Exception - ' + response, false);
					console.log("Failed to collect questionnaire - " + response);
    			});			

			/*
			var recipies = this.getCacheRecipie();
			var catArr = null;
			var pirivuRecipie = null;

			//Filter Pirivu Recipie
			if(pirivu > 0) {
				 pirivuRecipie = _.filter(recipies, function(item) {  
					var bCtgryMatch = false;
					for (var j = 0, length = item.category.length; j < length; j++) {
						//console.log("Category for recipie : " + item.category[j]);
						if(pirivu == item.category[j]) {
							bCtgryMatch = true;
						}
					}
					return bCtgryMatch; 
				});
			} else {
				pirivuRecipie = recipies;
			} 
			
			//Mark Favourites 
			var arrFavourites = Favourite.getFavourites();
			//console.log("User Favourites : " + arrFavourites);
			if(_.size(arrFavourites) > 0) {
				_.each(pirivuRecipie, function(item) {  
					//console.log("Compare for Favourite : " + item.id + " - " + arrFavourites);	
					if(_.contains(arrFavourites, "" + item.id)) {
						item.fav = true;
						//console.log("Favourite Found : " + item.title);	
					}
				});
			} 

			//Sort Recipies by post date
			if(_.size(arrFavourites) > 0) {
				pirivuRecipie = _.sortBy(pirivuRecipie, function(item) {
					return -item.post_date; 
				})
			}
				 
			return pirivuRecipie;
			*/

		}
		/*
		,
		getRecipie:function(recid) {
			//FIXME - Later collect it from cache
			var data =  window.localStorage.getItem(C_KEY_KURIPPU);
			var jsonData = JSON.parse(data);
			//console.log("Recipie Count : " + _.size(jsonData));
			var recipie = _.find(jsonData,function(rw, rwIdx) { 
				if(rw.id == recid) { 
					//console.log ("Recipie found for : " + recid); 
					return true;
				}; 
			});
			//console.log('Collect Recipie Detail : ' + recipie);
			return recipie;
		},
		getStorageRecipie:function() {
			//console.log("Collecting Recipie from Local Storage");		
			var data =  window.localStorage.getItem(C_KEY_KURIPPU);
			if(!data) {
				//FIXME - Try to capture device id
				window.analytics.trackException('Empty Storage Exception', false);
			}
			return JSON.parse(data);
		},
		getCacheRecipie:function() {
			var cacheRecipie = Cache.get(C_CACHE_SAMAYAL);
			if(!cacheRecipie) {
				cacheRecipie = this.getStorageRecipie();
				if(cacheRecipie) {
					Cache.put(C_CACHE_SAMAYAL, cacheRecipie);
				}
			} else {
				//console.log("Returning Recipie from cache");
			}
			return cacheRecipie;
		}
		*/
	};

})


/* Perform Operation for Storage Sync */
/*
.service("Storage", function($http) {

	return {
		sync:function() {
			//console.log('Data Sync or Update');

			var self = this;
			var uri = encodeURI(C_URL);
			var lastSyncTime = window.localStorage.getItem(C_KEY_SYNCTIME);
			if(lastSyncTime) {
				lastSyncTime = lastSyncTime - 18000;
				uri = encodeURI(C_URL + "&ts=" + lastSyncTime);
			} 
			//console.log("Download URL : " + uri);

			//FIXME - Send async response 
			$http.get(uri)
    			.then(function(response) {
    				//console.log("Fresh Data - " + JSON.stringify(response.data));
    				self.updateStorage(response.data);
    			}, function(response) {
    				window.analytics.trackException('Data Sync Exception - ' + response, false);
					console.log("Sync Kuripugal Failed - " + response);
    			});			
		},
		updateStorage:function(data) {
			//console.log('Update Local Storage');
			var localKuripugal =  window.localStorage.getItem(C_KEY_KURIPPU);
			//var localJSON = JSON.parse(localTips);
			if(localKuripugal) {
				this.syncStorage(data);
				//window.analytics.trackEvent('Local Storage', 'Synced');
			} else {
				window.localStorage.setItem(C_KEY_KURIPPU, JSON.stringify(data.recipie));
				window.localStorage.setItem(C_KEY_SYNCTIME, data.time);
				window.analytics.trackEvent('Local Storage', 'Initialized');
				//console.log('Stored Kuripugal');
			}
		},		
		syncStorage:function(data) {
			console.log('Sync Local Storage');
			var localKuripugal =  window.localStorage.getItem(C_KEY_KURIPPU);
			var localKurippuJSON = JSON.parse(localKuripugal);
			var initialKurippuSize = _.size(localKurippuJSON);
			//console.log("Modified Array Size : " + _.size(data.recipie));		
			//console.log("Local Array Initial Size : " + initialKurippuSize);		

			if(_.size(data.recipie) >  0) {
				$.each(data.recipie, function(key, item) {
					var newKurippu = true;
					_.find(localKurippuJSON,function(rw, rwIdx) { 
						if(rw.id == item.id) { 
							//console.log ("Replace Existing Object for : " + item.id); 
							localKurippuJSON[rwIdx] = item;
							newKurippu = false; 
							return true;
						}; 
					});
					//If new tip
					if(newKurippu) {
						//console.log("New Object for : " + key + " - " + JSON.stringify(item));
						//console.log("New Object for : " + key + " - " + item.id);
						item.new = true;
						localKurippuJSON.push(item);
					} 
				});
				var finalKurippuSize = _.size(localKurippuJSON);
				//console.log("Local Array Final Size : " + finalKurippuSize);		
				//Update Local storage only if new array is bigger or equal to current array size
				if(finalKurippuSize >= initialKurippuSize) {
					window.localStorage.setItem(C_KEY_KURIPPU, JSON.stringify(localKurippuJSON));
					var modifiedTime = data.time;
					if(typeof modifiedTime != 'undefined') {
						window.localStorage.setItem(C_KEY_SYNCTIME, modifiedTime);
					}
				}
			}
		}
	};

})
*

/* Perform Operaton for Managing Favourite */
/*
.service("Favourite", function() {
	return {
		markFavourite:function(recipieId) {
			//console.log('Mark this recipie as favourite : ' + recipieId);
			//FIXME - Handle Duplicate of Favourites
			var favourite = null;
			var favouriteStored = window.localStorage.getItem(C_KEY_FAVOURITE); 
			if(favouriteStored == null) {
				favourite = new Array();
				favourite.push(recipieId);
			} else {
				//console.log("Favourite Stored : " + favouriteStored);	
				favourite = new Array(favouriteStored);
				favourite.push(recipieId);
			}
			//console.log("Favourite : " + favourite);	
			if(favourite != null) {
				window.localStorage.setItem(C_KEY_FAVOURITE, favourite);	
				window.analytics.trackEvent('Favourites', 'Recipie Added', 'Recipie', recipieId);
			}

		},
		unmarkFavourite:function(recipieId) {
			//console.log('Unmark this recipie from favourite : ' + recipieId);
			var favourite = null;
			var favouriteStored = window.localStorage.getItem(C_KEY_FAVOURITE); 
			if(favouriteStored != null) {
				favourite = favouriteStored.split(",");
				var favourite = _.filter(favourite, function(item) {  
					var bRetain = true;
					//console.log("Compare : " + item + " - " + recipieId);
					if(item == recipieId) {
						//console.log("Item identified for removal  - " + item);
						bRetain = false;
					}
					return bRetain; 
				});
			} else {
				window.analytics.trackException('No favourites found when trying to remove recipie from favourite', false);	
			}
			//console.log("Favourite : " + favourite);	
			if(favourite != null) {
				window.localStorage.setItem(C_KEY_FAVOURITE, favourite);	
			}
		},
		getFavourites:function() {
			//console.log('Collecting the list of favourites');
			var favourite = null;
			var favouriteStored = window.localStorage.getItem(C_KEY_FAVOURITE); 
			if(favouriteStored != null) {
				favourite = favouriteStored.split(",");
			}
			return favourite;
		}		
	};
})
*/ 

/* Managing an active list for navigation */
/*
.service("RecipieList", function(Cache) {

	return {
		update:function(data) {
			//console.log("Store the active list of Recipie for navigation");
			Cache.put(C_CACHE_LIST, data);
		},
		get:function() {
			//console.log("Get the active list of Recipie for navigation");
			return Cache.get(C_CACHE_LIST);
		},
		getRecipie:function(indexId) {
			var cacheRecipies = Cache.get(C_CACHE_LIST);
			var recipie;
			var listSize = _.size(cacheRecipies);
			if(listSize > 0) {
				recipie = cacheRecipies[indexId];
				//console.log("Recipie collected from cache :  " + recipie.title);					
			}
			if(recipie) {
				if(listSize > (indexId + 1)) {
					recipie.nxt = true;	
				}
				if(indexId > 0) {
					recipie.prv = true;		
				}
			}	
			return recipie;
		}
	};
})
*/

/* Manage Category */
/*
.service("Category", function($http, $q, Cache) {
	return {

		loadCategories: function() {
			//console.log('Load Categories From Filesystem');
			return $http.get('files/category.json');
		},
		getCategories: function() {
			var deferred = $q.defer();
			var key = C_CACHE_CATEGORY;
			var categories = Cache.get(key);
			if(!categories) {
				var promise = this.loadCategories();
	       		promise.then(
	          		function(payload) { 
	              		categories = payload.data;
						if(categories) {
							Cache.put(key, categories);
						}
	              		deferred.resolve({categories: categories});
						//console.log('Categories ' + JSON.stringify(categories));
	          		},
	          		function(errorPayload) {
	          			console.log('Failure loading categories ' + errorPayload);
	          			deferred.reject(errorPayload);
	          		});
			} else {
				deferred.resolve({categories: categories});
			}
			return deferred.promise;
		}
	};
})
*/
; 

/* Cache Services */
var cacheServices = angular.module('iq.cache', []);
cacheServices.factory('Cache', function ($cacheFactory) {
	return $cacheFactory('cache-iq');
});
