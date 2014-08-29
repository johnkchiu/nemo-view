/*───────────────────────────────────────────────────────────────────────────*\
│  Copyright (C) 2014 eBay Software Foundation                                │
│                                                                             │
│                                                                             │
│   Licensed under the Apache License, Version 2.0 (the "License"); you may   │
│   not use this file except in compliance with the License. You may obtain   │
│   a copy of the License at http://www.apache.org/licenses/LICENSE-2.0       │
│                                                                             │
│   Unless required by applicable law or agreed to in writing, software       │
│   distributed under the License is distributed on an "AS IS" BASIS,         │
│   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  │
│   See the License for the specific language governing permissions and       │
│   limitations under the License.                                            │
\*───────────────────────────────────────────────────────────────────────────*/
/* global require: true, module: true */
"use strict";
var view = require("./lib/view");

function addView(nemo) {
	return function(config) {
		//dedupe
		var viewName = view.resolveViewName(config);
		if (nemo.view && nemo.view[viewName]) {
			return;
		}

		var _view = (new view.View());
		_view.config = config;
		_view.init(_view, nemo);
		return _view;
	}
};
module.exports.setup = function(config, nemo, callback) {
	//slap the addView method onto the view namespace
	nemo.view.addView = addView(nemo);
	//move along
	callback(null, config, nemo);
};