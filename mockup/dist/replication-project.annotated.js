(function () {

  'use strict';

  angular
    .module('app', ['ngAudio'])
    .controller('AppController', appController);

    function appController($scope, ProjectInfo, ngAudio) {
      /*
       * Directive that's currently being displayed. Didn't feel like using ng-view or doing any routing
       */
      $scope.active = 'instructions';

      $scope.speakers = _.shuffle(ProjectInfo.speakers);
      $scope.numSpeakers = ProjectInfo.numSpeakers;
      $scope.speakerNumber = 0;
      $scope.scale = ProjectInfo.scale;
      $scope.randomSpeakerSample = _.shuffle(ProjectInfo.allSpeakers).slice(0, ProjectInfo.instructionsSampleSize);

      /*
       * Start button clicked on the instructions screen. Hides the instructions directive and shows the form directive.
       */
      $scope.start = function() {
        $scope.active = 'form';
        initializeQuestions();
      };

      $scope.submit = function() {
        if ($scope.questionGroup === $scope.questionGroups.length - 1) { // On the last question group for current speaker
          getCurrentSpeaker().behaviorScore = scoreQuestions() / $scope.questions.length;
          $scope.sound.stop();
          if ($scope.speakerNumber === $scope.numSpeakers - 1) {  // On the last speaker
            console.log('Study finished!');
            console.log($scope.speakers);
            $scope.active = 'finished';
            return;
          }
          $scope.speakerNumber++;
          initializeQuestions();
        } else {
          $scope.questionGroup++;
        }
      };

      function initializeQuestions() {
        $scope.questions = _.map(ProjectInfo.questions, _.clone);
        $scope.questionGroups = _.chunk(_.shuffle($scope.questions), ProjectInfo.questionsPerPage);
        $scope.questionGroup = 0;
        $scope.sound = ngAudio.load('assets/audio/' + getCurrentSpeaker().voicefil);
        $scope.sound.loop = true;
      }

      /*
       * Returns the current speaker
       */
      function getCurrentSpeaker() {
        return $scope.speakers[$scope.speakerNumber];
      }

      /*
       * Low rank-questions are reverse scored, so their scores need to be inverted
       */
      function invertScores() {
        _.each($scope.questions, function(e) {
          e.score = e.highRank ? e.score : $scope.scale.length + 1 - e.score;
        });
      }

      function scoreQuestions() {
        return _.sumBy($scope.questions, function(e) {
          return e.highRank ? e.score : $scope.scale.length + 1 - e.score;
        });
      }
    }
    appController.$inject = ["$scope", "ProjectInfo", "ngAudio"];
})();

(function () {

  'use strict';

  angular
    .module('app')
    .factory('MaleData', maleData);

    function maleData() {
      var data = [
        {
          'id':1,
          'voice':16,
          'voicefil':'m16_power.wav',
          'plev':1,
          'pitch_smeanMD':1.070878948,
          'intense_smeanMD':2.883110379,
          'form_smeanMD':-32.18579315
        },
        {
          'id':2,
          'voice':77,
          'voicefil':'m77_power.wav',
          'plev':-1,
          'pitch_smeanMD':-22.60790468,
          'intense_smeanMD':-0.694575491,
          'form_smeanMD':-25.17862031
        },
        {
          'id':3,
          'voice':69,
          'voicefil':'m69_power.wav',
          'plev':1,
          'pitch_smeanMD':-24.68252622,
          'intense_smeanMD':0.777070788,
          'form_smeanMD':-33.81499526
        },
        {
          'id':4,
          'voice':53,
          'voicefil':'m53_power.wav',
          'plev':1,
          'pitch_smeanMD':-23.54477504,
          'intense_smeanMD':1.18463605,
          'form_smeanMD':-47.52740953
        },
        {
          'id':5,
          'voice':5,
          'voicefil':'m05_power.wav',
          'plev':1,
          'pitch_smeanMD':-33.43120241,
          'intense_smeanMD':1.29169084,
          'form_smeanMD':-51.79217249
        },
        {
          'id':6,
          'voice':75,
          'voicefil':'m75_power.wav',
          'plev':-1,
          'pitch_smeanMD':-13.86927377,
          'intense_smeanMD':-2.762196833,
          'form_smeanMD':-71.29410994
        },
        {
          'id':7,
          'voice':52,
          'voicefil':'m52_power.wav',
          'plev':-1,
          'pitch_smeanMD':-55.00307897,
          'intense_smeanMD':1.594488922,
          'form_smeanMD':-37.18509741
        },
        {
          'id':8,
          'voice':68,
          'voicefil':'m68_power.wav',
          'plev':1,
          'pitch_smeanMD':-45.54309603,
          'intense_smeanMD':-0.153930797,
          'form_smeanMD':-49.24369315
        },
        {
          'id':9,
          'voice':24,
          'voicefil':'m24_power.wav',
          'plev':-1,
          'pitch_smeanMD':-46.67851048,
          'intense_smeanMD':-1.339460118,
          'form_smeanMD':-47.30422358
        },
        {
          'id':10,
          'voice':37,
          'voicefil':'m37_power.wav',
          'plev':1,
          'pitch_smeanMD':-51.73112472,
          'intense_smeanMD':6.85368342,
          'form_smeanMD':-52.91175048
        },
        {
          'id':11,
          'voice':45,
          'voicefil':'m45_power.wav',
          'plev':-1,
          'pitch_smeanMD':-59.25449845,
          'intense_smeanMD':-7.214613373,
          'form_smeanMD':-48.63153825
        },
        {
          'id':12,
          'voice':40,
          'voicefil':'m40_power.wav',
          'plev':1,
          'pitch_smeanMD':-38.10005569,
          'intense_smeanMD':4.190558733,
          'form_smeanMD':-72.93700058
        },
        {
          'id':13,
          'voice':29,
          'voicefil':'m29_power.wav',
          'plev':-1,
          'pitch_smeanMD':-60.97079943,
          'intense_smeanMD':-10.54984768,
          'form_smeanMD':-49.68190061
        },
        {
          'id':14,
          'voice':48,
          'voicefil':'m48_power.wav',
          'plev':-1,
          'pitch_smeanMD':-24.08126192,
          'intense_smeanMD':-10.74284725,
          'form_smeanMD':-87.38800633
        },
        {
          'id':15,
          'voice':74,
          'voicefil':'m74_power.wav',
          'plev':-1,
          'pitch_smeanMD':-55.9149508,
          'intense_smeanMD':-1.246213837,
          'form_smeanMD':-65.21366067
        },
        {
          'id':16,
          'voice':66,
          'voicefil':'m66_power.wav',
          'plev':1,
          'pitch_smeanMD':-28.42126728,
          'intense_smeanMD':6.315673606,
          'form_smeanMD':-89.96945133
        },
        {
          'id':17,
          'voice':8,
          'voicefil':'m08_power.wav',
          'plev':-1,
          'pitch_smeanMD':-51.23349522,
          'intense_smeanMD':-1.522640638,
          'form_smeanMD':-72.26076404
        },
        {
          'id':18,
          'voice':57,
          'voicefil':'m57_power.wav',
          'plev':1,
          'pitch_smeanMD':-50.7140218,
          'intense_smeanMD':-1.994515665,
          'form_smeanMD':-74.09858586
        },
        {
          'id':19,
          'voice':41,
          'voicefil':'m41_power.wav',
          'plev':-1,
          'pitch_smeanMD':-35.55247482,
          'intense_smeanMD':1.151793187,
          'form_smeanMD':-102.3590167
        },
        {
          'id':20,
          'voice':81,
          'voicefil':'m81_power.wav',
          'plev':1,
          'pitch_smeanMD':-52.91861978,
          'intense_smeanMD':1.603788418,
          'form_smeanMD':87.7263841
        },
        {
          'id':21,
          'voice':14,
          'voicefil':'m14_power.wav',
          'plev':-1,
          'pitch_smeanMD':-53.91970532,
          'intense_smeanMD':-2.711320599,
          'form_smeanMD':-86.46027791
        },
        {
          'id':22,
          'voice':32,
          'voicefil':'m32_power.wav',
          'plev':1,
          'pitch_smeanMD':-49.30869254,
          'intense_smeanMD':7.050704364,
          'form_smeanMD':-87.57022024
        },
        {
          'id':23,
          'voice':71,
          'voicefil':'m71_power.wav',
          'plev':1,
          'pitch_smeanMD':-61.14116751,
          'intense_smeanMD':-0.838822813,
          'form_smeanMD':-84.38816064
        },
        {
          'id':24,
          'voice':47,
          'voicefil':'m47_power.wav',
          'plev':1,
          'pitch_smeanMD':-40.19516918,
          'intense_smeanMD':4.103040844,
          'form_smeanMD':-103.9698268
        },
        {
          'id':25,
          'voice':50,
          'voicefil':'m50_power.wav',
          'plev':-1,
          'pitch_smeanMD':-66.19555106,
          'intense_smeanMD':-4.323644849,
          'form_smeanMD':-79.60351156
        },
        {
          'id':26,
          'voice':55,
          'voicefil':'m55_power.wav',
          'plev':1,
          'pitch_smeanMD':-43.34882756,
          'intense_smeanMD':-3.576351805,
          'form_smeanMD':-110.717872
        },
        {
          'id':27,
          'voice':54,
          'voicefil':'m54_power.wav',
          'plev':-1,
          'pitch_smeanMD':-26.66974407,
          'intense_smeanMD':1.416978737,
          'form_smeanMD':144.5983159
        },
        {
          'id':28,
          'voice':61,
          'voicefil':'m61_power.wav',
          'plev':1,
          'pitch_smeanMD':-35.90787639,
          'intense_smeanMD':8.746527252,
          'form_smeanMD':150.0255111
        },
        {
          'id':29,
          'voice':26,
          'voicefil':'m26_power.wav',
          'plev':-1,
          'pitch_smeanMD':-44.26466596,
          'intense_smeanMD':-0.639935505,
          'form_smeanMD':167.9272014
        },
        {
          'id':30,
          'voice':15,
          'voicefil':'m15_power.wav',
          'plev':-1,
          'pitch_smeanMD':-50.01409381,
          'intense_smeanMD':-0.52755697,
          'form_smeanMD':164.2790612
        }
      ];

      return {
        data: _.map(data, function(e) {
          return {
            speakerId: e.voice,
            voicefil: e.voicefil,
            plev: e.plev,
            sex: -1
          };
        })
      };
    }

})();

(function () {

  'use strict';

  angular
    .module('app')
    .factory('FemaleData', femaleData);

    function femaleData() {
      var data = [
        {
          'id': 1,
          'voice': 154,
          'voicefil': 'f154_power.wav',
          'plev': 1,
          'pitch_smeanMD': 36.80909606,
          'intense_smeanMD': 2.231806477,
          'form_smeanMD': 5.44609162
        },
        {
          'id': 2,
          'voice': 167,
          'voicefil': 'f167_power.wav',
          'plev': -1,
          'pitch_smeanMD': 5.818983822,
          'intense_smeanMD': 3.008391088,
          'form_smeanMD': -36.88477854
        },
        {
          'id': 3,
          'voice': 144,
          'voicefil': 'f144_power.wav',
          'plev': -1,
          'pitch_smeanMD': 23.83980288,
          'intense_smeanMD': -0.804354214,
          'form_smeanMD': 22.01659668
        },
        {
          'id': 4,
          'voice': 178,
          'voicefil': 'f178_power.wav',
          'plev': -1,
          'pitch_smeanMD': 40.01124794,
          'intense_smeanMD': 0.382486843,
          'form_smeanMD': -7.015490781
        },
        {
          'id': 5,
          'voice': 165,
          'voicefil': 'f165_power.wav',
          'plev': 1,
          'pitch_smeanMD': 40.29790105,
          'intense_smeanMD': -6.096255932,
          'form_smeanMD': 3.775443863
        },
        {
          'id': 6,
          'voice': 163,
          'voicefil': 'f163_power.wav',
          'plev': -1,
          'pitch_smeanMD': 37.90443796,
          'intense_smeanMD': 1.511616015,
          'form_smeanMD': -13.46252917
        },
        {
          'id': 7,
          'voice': 131,
          'voicefil': 'f131_power.wav',
          'plev': -1,
          'pitch_smeanMD': 17.03243323,
          'intense_smeanMD': -0.682695417,
          'form_smeanMD': -38.85985939
        },
        {
          'id': 8,
          'voice': 114,
          'voicefil': 'f114_power.wav',
          'plev': 1,
          'pitch_smeanMD': 29.87535774,
          'intense_smeanMD': -2.404029852,
          'form_smeanMD': -31.07975873
        },
        {
          'id': 9,
          'voice': 170,
          'voicefil': 'f170_power.wav',
          'plev': 1,
          'pitch_smeanMD': 54.36738872,
          'intense_smeanMD': -4.539434162,
          'form_smeanMD': -9.841547373
        },
        {
          'id': 10,
          'voice': 119,
          'voicefil': 'f119_power.wav',
          'plev': 1,
          'pitch_smeanMD': 33.83185305,
          'intense_smeanMD': -1.431068645,
          'form_smeanMD': -33.51323633
        },
        {
          'id': 11,
          'voice': 136,
          'voicefil': 'f136_power.wav',
          'plev': -1,
          'pitch_smeanMD': 60.02990112,
          'intense_smeanMD': 3.720723061,
          'form_smeanMD': -5.347838759
        },
        {
          'id': 12,
          'voice': 155,
          'voicefil': 'f155_power.wav',
          'plev': -1,
          'pitch_smeanMD': 9.819287762,
          'intense_smeanMD': -3.059724842,
          'form_smeanMD': 61.20300292
        },
        {
          'id': 13,
          'voice': 140,
          'voicefil': 'f140_power.wav',
          'plev': 1,
          'pitch_smeanMD': 40.7412398,
          'intense_smeanMD': -2.990620419,
          'form_smeanMD': 37.38493591
        },
        {
          'id': 14,
          'voice': 177,
          'voicefil': 'f177_power.wav',
          'plev': 1,
          'pitch_smeanMD': 57.52598445,
          'intense_smeanMD': -6.863572396,
          'form_smeanMD': -17.09294241
        },
        {
          'id': 15,
          'voice': 139,
          'voicefil': 'f139_power.wav',
          'plev': -1,
          'pitch_smeanMD': 63.25923701,
          'intense_smeanMD': 5.928626273,
          'form_smeanMD': -12.47712932
        },
        {
          'id': 16,
          'voice': 161,
          'voicefil': 'f161_power.wav',
          'plev': -1,
          'pitch_smeanMD': 52.75432303,
          'intense_smeanMD': -2.554627166,
          'form_smeanMD': -27.15949349
        },
        {
          'id': 17,
          'voice': 174,
          'voicefil': 'f174_power.wav',
          'plev': -1,
          'pitch_smeanMD': 37.16066576,
          'intense_smeanMD': 2.197876721,
          'form_smeanMD': -43.49894056
        },
        {
          'id': 18,
          'voice': 145,
          'voicefil': 'f145_power.wav',
          'plev': -1,
          'pitch_smeanMD': 62.04123773,
          'intense_smeanMD': 3.213311583,
          'form_smeanMD': 29.19987783
        },
        {
          'id': 19,
          'voice': 111,
          'voicefil': 'f111_power.wav',
          'plev': 1,
          'pitch_smeanMD': 43.2096304,
          'intense_smeanMD': 0.042278973,
          'form_smeanMD': 51.97347238
        },
        {
          'id': 20,
          'voice': 148,
          'voicefil': 'f148_power.wav',
          'plev': -1,
          'pitch_smeanMD': 70.2403293,
          'intense_smeanMD': 1.262640151,
          'form_smeanMD': -25.11126833
        },
        {
          'id': 21,
          'voice': 116,
          'voicefil': 'f116_power.wav',
          'plev': -1,
          'pitch_smeanMD': 57.00054512,
          'intense_smeanMD': 2.2935455,
          'form_smeanMD': 38.38236379
        },
        {
          'id': 22,
          'voice': 130,
          'voicefil': 'f130_power.wav',
          'plev': 1,
          'pitch_smeanMD': 58.85639946,
          'intense_smeanMD': 2.368446936,
          'form_smeanMD': 36.65703917
        },
        {
          'id': 23,
          'voice': 126,
          'voicefil': 'f126_power.wav',
          'plev': 1,
          'pitch_smeanMD': 56.38350429,
          'intense_smeanMD': 3.742799732,
          'form_smeanMD': -42.70427889
        },
        {
          'id': 24,
          'voice': 146,
          'voicefil': 'f146_power.wav',
          'plev': 1,
          'pitch_smeanMD': 60.14507323,
          'intense_smeanMD': -2.51907108,
          'form_smeanMD': 63.33106666
        },
        {
          'id': 25,
          'voice': 105,
          'voicefil': 'f105_power.wav',
          'plev': 1,
          'pitch_smeanMD': 12.04294003,
          'intense_smeanMD': 1.25963436,
          'form_smeanMD': 155.6235982
        },
        {
          'id': 26,
          'voice': 125,
          'voicefil': 'f125_power.wav',
          'plev': 1,
          'pitch_smeanMD': 20.60497469,
          'intense_smeanMD': 1.235431493,
          'form_smeanMD': 180.6128624
        },
        {
          'id': 27,
          'voice': 128,
          'voicefil': 'f128_power.wav',
          'plev': -1,
          'pitch_smeanMD': 21.11817451,
          'intense_smeanMD': -7.855017941,
          'form_smeanMD': 200.2487623
        },
        {
          'id': 28,
          'voice': 110,
          'voicefil': 'f110_power.wav',
          'plev': 1,
          'pitch_smeanMD': 51.46281732,
          'intense_smeanMD': 5.306230905,
          'form_smeanMD': 182.3075518
        },
        {
          'id': 29,
          'voice': 104,
          'voicefil': 'f104_power.wav',
          'plev': -1,
          'pitch_smeanMD': 53.20115577,
          'intense_smeanMD': 1.701664905,
          'form_smeanMD': 211.3108303
        },
        {
          'id': 30,
          'voice': 180,
          'voicefil': 'f180_power.wav',
          'plev': 1,
          'pitch_smeanMD': 'NA',
          'intense_smeanMD': 'NA',
          'form_smeanMD': 'NA'
        }
      ];

      return {
        data: _.map(data, function(e) {
          return {
            speakerId: e.voice,
            voicefil: e.voicefil,
            plev: e.plev,
            sex: 1,
          };
        })
      };
    }

})();

(function () {

  'use strict';

  angular
    .module('app')
    .directive('instructions', instructions);

    function instructions() {
      return {
        restrict: 'E',
        templateUrl: 'instructions/instructions.html',
        controller: ['$scope', function($scope) {
          $scope.activeInstructions = 'instructions';

          $scope.setActive = function(active) {
            $scope.activeInstructions = active;
          };
        }]
      };
    }

})();
(function () {

  'use strict';

  angular
    .module('app')
    .directive('projectForm', form);

    function form() {
      return {
        restrict: 'E',
        templateUrl: 'form/form.html'
      };
    }

})();
(function () {

  'use strict';

  angular
    .module('app')
    .factory('ProjectInfo', projectInfo);

    function projectInfo(MaleData, FemaleData) {
      var maleData = MaleData.data;
      var femaleData = FemaleData.data;
      var numSpeakersPerSex = 1;

      var highRankQuestions = [
        'How likely is it that this person is in a position to reward others?',
        'How focused do you imagine this person to be?',
        'How effective do you imagine this person is at getting people to pay attention?',
        'Do you imagine this person as someone who frequently interrupts others?',
        'How demanding do you imagine this person to be?',
        'Do you imagine this person as someone who expects to have his/her way with things?'
      ];

      var lowRankQuestions = [
        'Do you imagine this person as someone who works well in groups?',
        'How good at following instructions do you imagine this person to be?',
        'Do you imagine this person as someone who is attentive to the needs of others?',
        'How uncomfortable at making direct eye contact do you imagine this person to be?',
        'Do you imagine this person as someone who has trouble speaking his/her mind?',
        'Do you imagine this person as someone who is easily swayed by others?'
      ];

      var scale = _.map(Array(7), function(e, i) {
        e = { index: i + 1 };
        if (i === 0) { e.anchor = 'not at all'; }
        if (i === 6) { e.anchor = 'very much'; }
        return e;
      });

      function labelQuestions(questions, label) {
        return questions.map(function(e) { return { question: e, highRank: label }; });
      }

      var allSpeakers = _.concat(maleData, femaleData);
      var speakers = _.concat(maleData.slice(0, numSpeakersPerSex), femaleData.slice(0, numSpeakersPerSex));

      return {
        questions: _.concat(labelQuestions(highRankQuestions, true), labelQuestions(lowRankQuestions, false)),
        scale: scale,
        questionsPerPage: 4,
        speakers: speakers,
        numSpeakers: speakers.length,
        allSpeakers: allSpeakers,
        instructionsSampleSize: 10
      };
    }
    projectInfo.$inject = ["MaleData", "FemaleData"];

})();
(function(module) {
try {
  module = angular.module('replication-project');
} catch (e) {
  module = angular.module('replication-project', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/replication-project/form/form.html',
    '<div class="form-wrapper"><div class="form-header"><h1>Speaker # {{ speakerNumber + 1 }}</h1><button ng-click="sound.play()">Click to play speaker</button></div><form class="question-form" ng-submit="submit()"><div class="labels"><div class="scale-item" ng-repeat="item in scale"><p>{{ item.anchor }}</p><p>{{ item.index }}</p></div></div><div class="questions"><div class="question" ng-repeat="question in questionGroups[questionGroup]"><div class="question-text"><p>{{ question.question }}</p></div><div class="scale"><div class="scale-item" ng-repeat="item in scale"><input type="radio" name="scale{{ $parent.$index }}" ng-model="question.score" ng-value="item.index" required></div></div></div></div><div class="question-form-submit"><input type="submit" ng-value="questionGroup === questionGroups.length - 1 ? (speakerNumber === numSpeakers - 1 ? \'Finish\' : \'Next speaker\') : \'Next\'"></div></form></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('replication-project');
} catch (e) {
  module = angular.module('replication-project', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/replication-project/instructions/instructions.html',
    '<div class="instructions"><div ng-if="activeInstructions === \'instructions\'"><div class="stanford-logo"><img src="assets/images/stanford.png" height="46" width="360" alt="Stanford University"></div><p class="block-text">Many of the interactions you have everyday involve listening to other people\'s voices -- e.g., on the phone, in face-to-face conversations -- yet we know very little about how voices differ from one another. In this experiment you will be listening to and rating clips of {{ numSpeakers }} speakers reading a short passage.</p><p class="block-text">The speakers were asked to say a standard passage as part of a role-playing exercise. Hence, they will all read the same passage so that you may focus on the difference in their voices and NOT on what they are saying. The following is the passage that the speakers will say:</p><p class="block-text italics">"I\'m glad that we are able to meet today and I am looking forward to our negotiation. I know that you and I have different perspectives on some of the key issues and that these differences would need to be resolved for us to come to an agreement"</p><p class="block-text">The experiment is divided into 2 parts, described in general below.</p><p class="block-text">PART 1: The computer will play just a subset of the voices, one after the other, to give you an idea of the variety of the voices. During this time you will just listen to the voices without making any ratings.</p><p class="block-text">PART 2: You will be asked to rate each speaker on what you think the person is like. You will get specific instructions about the ratings before you start this part.</p><p class="block-text">Please remember that it is important for you to listen carefully to the quality of each voice to make your ratings. However, it is NOT necessary for you to think too long or too deeply about the voices. Your first impression is usually best.</p><button type="button" ng-click="setActive(\'instructions1\')">Start</button><p class="block-text legal">Legal information: By answering the following questions, you are participating in a study being performed by cognitive scientists in the Stanford Department of Psychology. If you have questions about this research, please contact us at <a href="mailto://stanfordpysch254@gmail.com">stanfordpysch254@gmail.com</a>. You must be at least 18 years old to participate. Your participation in this research is voluntary. You may decline further participation, at any time, without adverse consequences. Your anonymity is assured; the researchers who have requested your participation will not receive any personal information about you. Note however that we have recently been made aware that your public Amazon.com profile can be accessed via your worker ID if you do not choose to opt out. If you would like to opt out of this feature, you may follow instructions available <a href="https://www.amazon.com/gp/help/customer/display.html?nodeId=16465241">here</a>.</p></div><div ng-if="activeInstructions === \'instructions1\'"><h1>Part 1</h1><p class="block-text">Click on the controls below to hear a subset of the voices. During this time you will just listen to the voices without making any ratings. Use this time to adjust your volume level such that you can hear clearly all of the voices, and during Part 2 leave your volume at this level.</p><div ng-repeat="voice in randomSpeakerSample" class="speaker-sample"><div class="speaker-sample-label"><span>Sample voice # {{ $index + 1 }}</span></div><audio controls><source ng-src="{{ \'assets/audio/\' + voice.voicefil }}" type="audio/wav">Your browser does not support the audio tag.</source></audio></div><button type="button" ng-click="setActive(\'instructions2\')">Next</button></div><div ng-if="activeInstructions === \'instructions2\'"><h1>Part 2</h1><p class="block-text">You will now hear all {{ numSpeakers }} speakers’ voices, in random order. For each, you will rate what you think the speaker is like on 12 personality characteristics. You may make your ratings anytime, even while the person is still speaking. Each speaker’s voice clip will loop until you have completed all the ratings for that speaker.</p><p class="block-text">In making your ratings, please choose a button that best represents your impressions of what you think the speaker may be like as a person. We would urge you not to think too long or too deeply about your ratings, as your first impressions are usually the best. There are no right or wrong answers, we are simply interested in finding out about your impressions of the voices.</p><button type="button" ng-click="setActive(null); start()">Next</button></div></div>');
}]);
})();
