import * as karma from 'karma';
//import { Server } from 'gulp-karma';
import { join } from 'path';

export = function karmaStart() {
  return function(done) {
    new (<any>karma).Server({
      configFile: join(process.cwd(), 'karma.conf.js'),
      singleRun: true
    }, function() { done(); } ).start();
    /*
    new Server({
      configFile: join(process.cwd(), 'karma.conf.js'),
      singleRun: true
    }, done).start();
    */
  };
};
