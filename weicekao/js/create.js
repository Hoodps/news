window.notifyStart = function(text,type,isAutoHide){
  var posX = parseInt($("body").width())/2-40;
  if(type == 'alarm'){
    $("#notify").addClass("alarm");
  }else{
    $("#notify").removeClass();
  }
  $("#notify").css({"left":posX}).html(text).show();
};
window.notifyOver = function(){
  $("#notify").slideUp(200);
};
window.notify = function(text,type){
  notifyStart(text,type);
  setTimeout(function(){
    notifyOver();
  },1000);
};
var examModule = angular.module('exam', ["ngDateTime", 'ui.sortable',  'ngSanitize', 'ngAnimate']);
examModule.service('AppState', function() {
  var getInitExam = function(examType){
    var exam = {
      title: "",
      type: examType,
      cover:{
        style:"poster",
        blur:0.3,
        image:"",
        diyImg:"",
        enter:"slide"
      },
      questions: [],
      fill:{
        deadline:{
          limit: false
        },
        repeat:false,
      },
      score:{
        status:true,
        min:0,
        max:0,
      },
      analysis:{status:false},
      userInfo:{
        need:false,
        fields:[
          {'name':"姓名",'need':false,'default':true},
          {'name':"手机",'need':false,'default':true}
        ],
        desc:""
      },
      tracing:{
        enable:false
      },
      nextQuestionId: 1,
      isCompleted: false,
      readWeixinInfo: false
    };
    if(examType == "test"){
      exam.results = [{min:null,max:null,title:"",content:""}];
    }else{
      exam.fill.eachScore = true;
      exam.fill.time = {
        limit:false,
        hour:null,
        minute:null
      };
      exam.result = {
        score:true,
        rightCounts:true,
        ranking:false
      };
      exam.analysis.every = true;
    }
    return exam;
  };
  var examType = _hook.examType || _hook.exam.type;
  var exam = _hook.exam || getInitExam(examType);
  var modes = [
    {key:"profile",name:"简介设置",seq:1},
    {key:"question",name:"题目设置",seq:2},
    {key:"answer",name:(examType=='test')?"分值设置":"答案设置",seq:3},
    {key:"result",name:"结果设置",seq:4},
  ];
  var config = {
    mode: exam.editMode?exam.editMode:{key:"profile",name:"简介设置",seq:1},
    modes: modes,
    movePos:{},
    clientType:"normal",
    editQuestion: null
  };
  if(examType == "test"){
    config.editResult = exam.results[0];
  }
  return {
    config: config,
    exam: exam
  };
});

examModule.factory('API',['$rootScope', 'AppState', '$http',function(rootScope, AppState, http){
  var service = {
    initApp:function(){
      rootScope.exam = AppState.exam;
      rootScope.initExam = angular.copy(rootScope.exam);
      rootScope.config = AppState.config;
    },
    updateMovePos: function(pos) {
      rootScope.config.movePos = pos;
      rootScope.$apply();
    },
    addQuestion: function(type,idx){
      var questionId = service.getNewQuestionId();
      var question = service.getQuestionByType(type,questionId);
      service.insertQuestion(question, idx);
    },
    insertQuestion: function(question, index) {
      if(index === undefined) {
        rootScope.exam.questions.splice(rootScope.exam.questions.length, 0, question);
      } else {
        rootScope.exam.questions.splice(index, 0,  question);
      }
      service.editQuestion(question);
      service.updateTotalScore();
    },
    editQuestion: function(question) {
      // if(AppState.mode == "editField" && !this.checkFieldSettingErrors()) {
      //   return;
      // }
      // console.log(question);
      rootScope.config.mode = rootScope.config.modes[1];
      rootScope.config.editQuestion = question;
    },
    getQuestionByType: function(type,questionId){
      var question = {
        "id":questionId,
        "type":type,
        "label":"",
      };
      switch(type){
        case 'img':
        case 'imgList':
          angular.extend(question,{
            "options": [{label:'',value:1},{label:'',value:2},{label:'',value:3},{label:'',value:4}]
          });
          break;
        case 'radio':
        case 'checkbox':
          if(rootScope.exam.type == "test"){
            angular.extend(question,{
              "options": [{label:'选项',value:1},{label:'选项',value:2},{label:'选项',value:3},{label:'选项',value:4}]
            });
          }else{
            angular.extend(question,{
              "options": [{label:'',value:1},{label:'',value:2},{label:'',value:3},{label:'',value:4}]
            });
          }
          break;
        case 'blank':
          angular.extend(question,{blanks:[]});
          question.label = "填空题";
          break;
        default : ;
      }
      if(type == "imgList" || type == "checkbox"){
        question.correctMode = "all";
      }
      return question;
    },
    getNewQuestionId: function(){
      var id = rootScope.exam.nextQuestionId ++;
      // console.log(id);
      return id;
    },
    addOption: function(options,index){
      var maxValue = 0;
      options.forEach(function(_opt, k){
        maxValue = _opt.value > maxValue ? _opt.value : maxValue;
      });
      var newOption = {
        label:'选项',
        value:maxValue+1
      }
      options.splice(index+1,0,newOption);
    },
    deleteOption: function(options,index){
      if(options.length < 3){
        return;
      }
      options.splice(index,1);
    },
    insertNewBlank: function(question){
      var maxValue = 0;
      if(question.blanks.length > 0){
        question.blanks.forEach(function(blank, k){
          maxValue = blank.id > maxValue ? blank.id : maxValue;
        });
      }
      var blank = {
        id:maxValue+1,
        answer:null
      };
      question.blanks.push(blank);
      var blankHtml = "<img class='question-blank-img' src='http://wx-static.drip.im/img/member/single/exam/editor-blank.png' id='blank-"+blank.id+"'/>";
      blankHtml = "<input class='question-blank' value='填空符' type='text' readonly='readonly' data-blank='"+JSON.stringify(blank)+"' id='blank-"+blank.id+"'/>";
      return blankHtml;
    },
    saveData: function(){
      rootScope.exam.editMode = rootScope.config.mode;
      return http.post('/member/exam/save',rootScope.exam);
    },
    scrollToBottom: function(){
      $('.display .exam-content').animate({scrollTop: $(".display .exam-content")[0].scrollHeight}, 300);
    },
    checkAllErrors:function(){
      var config = rootScope.config;
      if(!this.checkProfile()){
        config.mode = config.modes[0];
        return false;
      }else if(!this.checkQuestion()){
        config.mode = config.modes[1];
        return false;
      }else if(!this.checkAnswer()){
        config.mode = config.modes[2];
        return false;
      }else if(!this.checkResult()){
        config.mode = config.modes[3];
        return false;
      }else{
        return true;
      }
    },
    checkThisErrors:function(){
      switch(rootScope.config.mode.key){
        case "profile":
          return service.checkProfile();
          break;
        case "question":
          return service.checkQuestion();
          break;
        case "answer":
          return service.checkAnswer();
          break;
        case "result":
          return service.checkResult();
          break;
        default:
          return true;
          break;
      }
    },
    checkProfile:function(){
      var cover = rootScope.exam.cover;
      var userinfo = rootScope.exam.userInfo;
      if(cover.style == "diy" && (cover.diyImg == "" || !cover.diyImg)){
        alert("请上传自定义封面");
        return false;
      }
      if(cover.style == "poster" && (cover.image == "" )){
        alert("请上传背景图");
        return false;
      }
      if(rootScope.exam.title == ""){
        alert("请填写标题");
        return false;
      }
      if(cover.style == "poster" &&　rootScope.exam.desc == ""){
        alert("请填写简介");
        return false;
      }
      if(userinfo.need){
        var status = true;
        userinfo.fields.forEach(function(v, k){
          if(v.need) status = false;
        });
        if(status){
          alert("请至少勾选一个用户信息");
          return false;
        }
      }
      return true;
    },
    checkQuestion:function(){
      var status = true;

      if(!rootScope.exam.questions.length){
        alert("请至少创建一道题目");
        return false;
      }

      $.each(rootScope.exam.questions,function(k,v){
        if(v.label == "" && v.labelImg == undefined){
          service.editQuestion(v);
          alert("题目不能为空");
          status = false;
          return false;
        }
        if(v.type == "blank" && v.blanks.length == 0){
          service.editQuestion(v);
          alert("填空题请至少设置一个填空项");
          status = false;
          return false;
        }
        if(v.type == "img" || v.type == "imgList"){
          $.each(v.options,function(idx,opt){
            if(!opt.img || opt.img == ""){
              service.editQuestion(v);
              alert("请上传图片选择题的图片");
              status = false;
              return false;
            }
          })
        }
      })

      return status;
    },
    checkAnswer:function(){
      if(rootScope.exam.type=="test"){
        return this.checkTestAnswer();
      }else{
        return this.checkExamAnswer();
      }
    },
    checkTestAnswer:function(){
      var status = true;
      $.each(rootScope.exam.questions,function(k,q){
        $.each(q.options,function(idx,opt){
          if(opt.score == undefined){
            status = false;
            alert("第"+(k+1)+"题请设全分数");
            return false;
          }
        });
        if(!status) return false;
      });
      return status;
    },
    checkExamAnswer:function(){
      var status = true;
      $.each(rootScope.exam.questions,function(k,q){
        if(q.type == "blank"){
          $.each(q.blanks,function(idx,blank){
            if(blank.answer==""||blank.answer==undefined){
              status = false;
              alert("第"+(k+1)+"题请设置答案");
              return false;
            }else if(blank.score == undefined){
              status = false;
              alert("第"+(k+1)+"题请设置分数");
              return false;
            }
          });
        }else if((q.type == "imgList" || q.type == "checkbox")&&q.correctMode == "all"){
          var hasAnswer = 0;
          $.each(q.options,function(idx,opt){
            if(opt.correct){
              hasAnswer++;
            }
          });
          if(!hasAnswer){
            status = false;
            alert("第"+(k+1)+"题请设置答案");
            return false;
          }else if(q.correctScore == undefined){
            status = false;
            alert("第"+(k+1)+"题请设置分数");
            return false;
          }
        }else{
          var hasAnswer = 0,hasScore = true;
          $.each(q.options,function(idx,opt){
            if(opt.correct){
              hasAnswer++;
              if(opt.score == undefined){
                hasScore = false;
              }
            }
          });
          if((q.type == "radio" || q.type == "img") && hasAnswer>1){
            status = false;
            alert("第"+(k+1)+"题是单选题，不能设置多个答案，请重新设置");
            return false;
          }
          if(!hasAnswer){
            status = false;
            alert("第"+(k+1)+"题请设置答案");
            return false;
          }else if(!hasScore&&q.correctMode!="all"){
            status = false;
            alert("第"+(k+1)+"题请设置分数");
            return false;
          }
        }
      });
      return status;
    },
    checkResult:function(){
      var status = true;
      var fill = rootScope.exam.fill;
      if(fill.deadline.limit){
        if(fill.deadline.startTime == undefined){
          alert("请设置开始时间");
          return false;
        }else if(fill.deadline.endTime == undefined){
          alert("请设置结束时间");
          return false;
        }
      }
      if(rootScope.exam.type == "exam" && fill.time.limit){
        if(fill.time.hour == null || fill.time.minute == null){
          alert("请设置全答卷时间");
          return false;
        }
        if(fill.time.hour == fill.time.minute){
          alert("答卷时间不能为0分钟");
          return false;
        }
      }
      if(rootScope.exam.type == "test"){
        var results = rootScope.exam.results;
        $.each(results,function(k,r){
          if(r.min > rootScope.exam.score.max){
            r.min = null;
          }
          if(r.max > rootScope.exam.score.max){
            r.max = null;
          }
        });
        $.each(results,function(k,r){
          if(k != results.length-1 && r.max == null){
            status = false;
            rootScope.config.editResult = rootScope.exam.results[k];
            alert("请设置结果分数段");
            return false;
          }else if(!r.title||r.title==""){
            status = false;
            rootScope.config.editResult = rootScope.exam.results[k];
            alert("请设置结果标题");
            return false;
          }
        });
      }
      return status;
    },
    updateTotalScore:function(){
      if(rootScope.exam.type == "test"){
        this.updateTestScore();
      }else{
        this.updateExamScore();
      }
    },
    updateExamScore:function(){
      var maxScore=0;
      var getRadioScore = function(q){
        var max=0;
        q.options.forEach(function(opt, idx){
          if(opt.correct == true){
            max = opt.score || 0;
          }
        });
        return max;
      };
      var getBlankScore = function(q){
        var max=0;
        q.blanks.forEach(function(opt, idx){
          max += opt.score || 0;
        });
        return max;
      };
      var getCheckboxScore = function(q){
        var max=0;
        if(q.correctMode == "all"){
          max = q.correctScore || 0;
        }else{
          q.options.forEach(function(opt, idx){
            if(opt.correct == true){
              max += opt.score || 0;
            }
          });
        }
        return max;
      };
      rootScope.exam.questions.forEach(function(q, k){
        switch(q.type){
          case "radio":
          case "img":
            max = getRadioScore(q);
            break;
          case "blank":
            max = getBlankScore(q);
            break;
          default:
            max = getCheckboxScore(q);
            break;
        }
        maxScore += max;
      });
      rootScope.exam.score.min = 0;
      rootScope.exam.score.max = maxScore;
    },
    updateTestScore:function(){
      var minScore = 0,maxScore=0;
      rootScope.exam.questions.forEach(function(q, k){
        var min=-1,max=0;
        q.options.forEach(function(opt, idx){
          if(opt.score){
            if(q.type == "radio" || q.type == "img"){
              max = opt.score > max ? opt.score : max;
            }else{
              max += opt.score;
            }
            min = (opt.score < min || min == -1) ? opt.score : min;
          }else{
            min = 0;
          }
        });
        minScore += min;
        maxScore += max;
      });
      rootScope.exam.score.min = minScore;
      rootScope.exam.score.max = maxScore
    }
  };
  return service ;
}]);

examModule.controller('examController',['$rootScope', "$scope",'AppState','API',
  function(rootScope,scope,AppState,api){
  api.initApp();

  scope.popupSuccessWind = false;
  scope.selectMode = function(mode){
    rootScope.config.mode = mode;
  }
  scope.nextSetting = function(){
    var config = rootScope.config;
    config.mode = config.modes[config.mode.seq];
  }
  scope.prevSetting = function(){
    var config = rootScope.config;
    config.mode = config.modes[config.mode.seq-2];
  }
  scope.saveSetting = function(){
    if(rootScope.exam.isCompleted){
      if(api.checkAllErrors()) scope.completeSetting();
    }else{
      if(!api.checkThisErrors()){
        return;
      }
      api.saveData().success(function(rs){
        console.log(rs);
        if(rs.status == "success") {
          if(rootScope.exam.id == undefined) {
            rootScope.exam.id = rs.result.id;
          }
          rootScope.initExam = angular.copy(rootScope.exam);
          notify("保存成功，请继续编辑");
        }
      });
    }
  }
  scope.completeSetting = function(){
    if(!api.checkAllErrors()) return;
    rootScope.exam.isCompleted = true;
    api.saveData().success(function(rs){
      if(rs.status == "success" && rootScope.exam.id == undefined) {
        rootScope.exam.id = rs.result.id;
      }
      rootScope.initExam = angular.copy(rootScope.exam);
      scope.popupSuccessWind = true;
    });
  }
  window.onbeforeunload = function() {
    if(!angular.equals(rootScope.initExam, rootScope.exam)) {
      return "您输入的内容尚未保存，确定要离开？";
    } else {
      return undefined;
    }
  }
}]);

examModule.controller('profileController',['$rootScope',"$scope",'API',
  function(rootScope,scope,api){
  scope.addUserInfo = {};
  scope.addUserInfoField = function(){
    var fieldName = scope.addUserInfo.name;
    if(fieldName == "" || fieldName == undefined){
      alert("不能添加空字段");
      return;
    }
    rootScope.exam.userInfo.fields.push({
      'name':fieldName,
      'need':true,
      'default':false
    });
    scope.addUserInfo.name = "";
    scope.addUserInfo.token = false;
  };

  scope.deleteUserInfoFiled = function(index){
    rootScope.exam.userInfo.fields.splice(index,1);
  }

}]);

examModule.controller('questionController',['$rootScope', "$scope",'API',
  function(rootScope,scope,api){
  scope.blankLength = 0;

  scope.selectQuestion = function(question){
    api.editQuestion(question);
  }

  scope.addOption = function(options,index){
    api.addOption(options,index);
  }

  scope.deleteOption = function(options,index){
    api.deleteOption(options,index);
  }

  scope.insertBlank = function(question){
    var ueId = "question-content-" + question.id;
    var ue = UE.getEditor(ueId);
    var blank = api.insertNewBlank(question);
    ue.execCommand('inserthtml',blank);
  }

  scope.deleteQuestionLabelImg = function(question){
    var target = ".question-label-img-" + question.id;
    $(target).removeClass("set").html("");
    delete question.labelImg;
  }

  scope.copyQuestion = function(question,idx){
    var newQuestion = angular.copy(question);
    newQuestion.id = api.getNewQuestionId();
    api.insertQuestion(newQuestion, idx);
  }
  scope.deleteQuestion = function(question,idx){
    rootScope.exam.questions.splice(idx,1);
    if(rootScope.exam.questions.length > 0){
      api.editQuestion(rootScope.exam.questions[idx] || rootScope.exam.questions[idx-1]);
    }else{
      api.editQuestion(null);
    }
    api.updateTotalScore();
  }
  scope.changeQuestionType = function(){
    api.updateTotalScore();
  }
}]);

examModule.controller('answerController',['$rootScope', "$scope",'API',
  function(rootScope,scope,api){

  scope.updateTotalScore = function(question){
    api.updateTotalScore();
  }
  scope.setCorrectOption = function(question,option){
    if(question.type == "radio" || question.type == "img"){
      question.options.forEach(function(opt, k){
        opt.correct = false;
      });
      option.correct = true;
      scope.updateTotalScore();
    }else{
      option.correct = (option.correct == true)?false:true;
      if(!option.correct) scope.updateTotalScore();
    }
  }
}]);


examModule.controller('resultController',['$rootScope', "$scope",'API',
  function(rootScope,scope,api){

  scope.addResult = function(r,idx){
    var results = rootScope.exam.results;
    var score = rootScope.exam.score;
    var token = true;
    var min = r.max?r.max+1:null;
    results.splice(idx+1,0,{min:min,max:null,title:"",content:""});
    if(results[idx+2]){
      results[idx+2].min = null;
    }
    var tempMin=0,tempMax=0,minK=0,maxK=0;
    $.each(results,function(k,v){
      if(k < idx+2 && v.min){
        tempMin = v.min;
        minK = k;
      }
      if(k > idx && v.max){
        tempMax = v.max;
        maxK = k;
        return false;
      }
      if(k == (results.length-1)){
        tempMax = score.max;
        maxK = k;
      }
    });
    if((tempMax-tempMin) < (maxK-minK)){
      scope.deleteResult(idx+1);
      alert("抱歉，这个区间段不能添加更多的分段结果了");
    }
  }

  scope.editResult = function(idx){
    rootScope.config.editResult = rootScope.exam.results[idx];
  }
  scope.deleteResult = function(idx){
    rootScope.exam.results.splice(idx,1);
    var results = rootScope.exam.results;
    if(results[idx-1].max && results[idx]){
      results[idx].min = results[idx-1].max+1;
    }
  }

  scope.updateResultSub = function(idx){
    var results = rootScope.exam.results;
    var score = rootScope.exam.score;
    var r = results[idx];
    var next = results[idx+1];
    var prev = results[idx-1];
    var max = score.max-results.length+idx+1;
    if(r.max == null){
      next.min = null;
      return;
    };

    if(r.max < (r.min || score.min)){
      r.max = next.min?(next.min-1):null;
      alert("抱歉，不能小于"+(r.min||score.min)+"分");
    }else if(next.max && r.max >= next.max){
      r.max = next.min?(next.min-1):null;
      if(r.max < (r.min || score.min)) r.max = null;
      alert("抱歉，不能大于"+(next.max-1)+"分");
    }else if(!next.max && r.max > max){
      r.max = next.min?(next.min-1):max;
      if(r.max < (r.min || score.min)) r.max = null;
      alert("抱歉，不能大于"+max+"分");
    }else if(!next.max){
      $.each(results,function(k,v){
        if(k > idx && v.max){
          max = v.max-k+idx;
          if(r.max > max){
            r.max = next.min?(next.min-1):max;
            alert("抱歉，不能大于"+max+"分");
          }
          return false;
        }
      });
    }
    if(r.max != null){
      next.min = r.max + 1;
    }
  }

  scope.insertScoreToTitle = function(result){
    result.title += "[总分]";
  }

  scope.insertScoreToContent = function(result){
    var ue = UE.getEditor("result-content");
    ue.execCommand('inserthtml',"<span>[总分]</span>");
  }
}]);

/* filter */
examModule.filter("showOccupy", function($rootScope) {
  return function(config, index) {
    var getPos = function(id) {
      return document.querySelector("#question_" + id).getBoundingClientRect();
    };
    var movePos = config.movePos;
    if(!movePos.left) {
      return false;
    }
    var prev = $rootScope.exam.questions[index];
    var next = $rootScope.exam.questions[index + 1];
    if(prev == undefined && next == undefined) {
      return false;
    } else if(prev == undefined) {
      //first element
      var nextPos = getPos(next.id);
      var isXMatch = movePos.right > nextPos.left;
      var isBeforeNext = (movePos.bottom > 162) && (movePos.bottom < nextPos.top + (nextPos.height / 2));
      return isBeforeNext;
    } else if(next == undefined) {
      var prevPos = getPos(prev.id);
      var isXMatch = movePos.right > prevPos.left;
      var isAfterPrev = (movePos.bottom > 162) && (movePos.top > prevPos.top + (prevPos.height / 2));
      return isAfterPrev;
    } else {
      var prevPos = getPos(prev.id);
      var nextPos = getPos(next.id);
      var isXMatch = movePos.right > prevPos.left;
      var isAfterPrev = movePos.top > prevPos.top + (prevPos.height / 2);
      var isBeforeNext = movePos.bottom < nextPos.top + (nextPos.height / 2);
      return isAfterPrev && isBeforeNext && (movePos.bottom > 162);
    }
  };
});
examModule.filter("showInitOccupy", function($rootScope) {
  return function(config) {
    var movePos = config.movePos;
    var exam = $rootScope.exam;
    var elementPos = document.querySelector('.exam-body').getBoundingClientRect();
    var isYMatch = movePos.top > elementPos.top;
    var hasFields =  exam && exam.questions && exam.questions.length > 0;
    return !hasFields && isYMatch;
  };
});
// examModule.filter("showMoveTips", function() {
//   return function(length) {
//     if(length > 0){
//       return false;
//     }else{
//       return true;
//     }
//   };
// });
examModule.filter("character", function() {
  return function(index) {
    return String.fromCharCode(65 + parseInt(index,10));
  };
});

examModule.filter("getBlanks", function() {
  return function(question) {
    var $blanks = $(question.content).find("input.question-blank");
    var temp = {},blanks=[];
    question.blanks.forEach(function(b, idx){
      temp[b.id] = b;
    });
    $.each($blanks,function(k,v){
      blanks.push(temp[$(v).data("blank").id]);
    });
    return blanks;
  };
});
