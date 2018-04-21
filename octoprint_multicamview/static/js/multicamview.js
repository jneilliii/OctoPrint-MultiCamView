/*
 * View model for OctoPrint-MultiCamView
 *
 * Author: jneilliii
 * License: AGPLv3
 */
$(function() {
    function MulticamviewViewModel(parameters) {
        var self = this;

        self.loginStateViewModel = parameters[0];
        self.settingsViewModel = parameters[1];
		
		self.webcams = ko.observableArray();
		self.cam_types = ko.observableArray(['mjpg','mp4','iframe']);
		
		self.onBeforeBinding = function() {
			self.webcams(self.settingsViewModel.settings.plugins.multicamview.webcams());
		}
		
		self.onEventSettingsUpdated = function(payload) {
			self.webcams(self.settingsViewModel.settings.plugins.multicamview.webcams());
		}

		self.addCamera = function(data) {
			self.settingsViewModel.settings.plugins.multicamview.webcams.push({'cam_url':ko.observable(''),'cam_type':ko.observable(''),'cam_width':ko.observable(''),'cam_height':ko.observable('')});
		}
		
		self.removeCamera = function(data) {
			self.settingsViewModel.settings.plugins.multicamview.webcams.remove(data);
		}
		
		self.move = function(amount, $index) {
			var index = $index();
			var item = self.settingsViewModel.settings.plugins.multicamview.webcams.splice(index, 1)[0];
			var newIndex = Math.max(index + amount, 0);
			self.settingsViewModel.settings.plugins.multicamview.webcams.splice(newIndex, 0, item);
            self.webcams(self.settingsViewModel.settings.plugins.multicamview.webcams());
		};
    
		self.moveUp = self.move.bind(self, -1);
		self.moveDown = self.move.bind(self, 1);
		
		self.resize = function(){
			$('#tab_plugin_multicamview').toggleClass('fullscreen');
		}
    }
	
    OCTOPRINT_VIEWMODELS.push({
        construct: MulticamviewViewModel,
        dependencies: [  "loginStateViewModel", "settingsViewModel"  ],
        elements: [ "#settings_plugin_multicamview", "#tab_plugin_multicamview" ]
    });
});
