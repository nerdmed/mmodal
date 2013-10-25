Package.describe({
  summary: "Empowering Meteor with nice modal windows"
});

Package.on_use(function (api, where) {
	api.use([
	  'templating',
	  'handlebars',
	  'universal-events'
	], 'client');

	api.use(['less'], 'client');
	api.add_files(['mmodal.html', 'mmodal.js', 'mmodal.less'], 'client');
	// api.use('zEvent', 'client');
  // api.add_files(['core.js'], 'client');

  if (api.export) 
    api.export('MModal');
});