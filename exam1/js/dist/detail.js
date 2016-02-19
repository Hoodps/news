define(function(require, exports){
  // console.log(exam);
  var juicer = require("juicer");
  var touch = require("touchJs");
  var fastclick = require('fastclick');
  var cacheExam = false;
  var initApp = function(){
    // delete window.localStorage.dripExam;
    window.swipe = false;
    FastClick.attach(document.body);
    exam.clientWidth = document.body.clientWidth;
    exam.clientHeight = document.body.clientHeight;
    if(window.localStorage.dripExam != undefined){
      cacheExam = JSON.parse(window.localStorage.dripExam);
      // console.log(cacheExam.examId != exam.id);
      //console.log(cacheExam);
      if(cacheExam.examId != exam.id || cacheExam.answers == undefined){
        delete window.localStorage.dripExam;
        cacheExam = false;
      }
    }
    exam.mode = userLastResult&&(window.localStorage.dripExam==undefined)?"result":"answer";

    touch.on('body','touchmove',function(ev){
      ev.preventDefault();
    });
    if(exam.type == "exam" && exam.analysis.status && exam.analysis.every){
      exam.unofficial = true;
    }else{
      exam.unofficial = false;
    }
    juicerInit();
    scrollInit();
    cover.init();

    ques.init();

    loading.init();

    result.control();
    localStorage.init();
    if(cacheExam){
      ques.renderByCache(cacheExam);
    }else if(userLastResult){
      if(exam.type == "test"){
        result.renderTest(userLastResult.testResult)
      }else{
        result.renderExam(userLastResult)
        ques.renderByResult(userLastResult)
      }
    }else if(exam.type == "exam"){
      pop.tip();
    }
    if(exam.userInfo.need && !cacheExam.userinfo) userinfo.init();
    
  };
  var clock = {
    init:function(){
      clearInterval(clock.secondInt);
      this.mCount = 0;
      this.sCount = 0;
      this.startTime = cacheExam?cacheExam.time:new Date().getTime();
      localStorage.update("time");
      if(exam.fill.time.limit){
        clock.countDown();
      }else{
        clock.timing();
      }
    },
    timing:function(){
      var hour=minute=m=h=0;
      if(cacheExam){
        var cacheTime = cacheExam.time;
        var seconds = parseInt((new Date().getTime() - cacheTime)/1000);
        var M = parseInt(seconds/60);
        clock.mCount += M;
        hour += parseInt(M/60);
        minute += M%60;
      }
      h = hour < 10 ? "0"+hour:hour;
      m = minute < 10?"0"+minute:minute;
      $("#time-hour").html(h);
      $("#time-minute").html(m);
      var update = function(){
        m = ++minute < 10?"0"+minute:minute;
        if(minute == 60){
          h = ++hour < 10 ? "0"+hour:hour;
          $("#time-hour").html(h);
          minute = 0;
          m="00";
        }
        $("#time-minute").html(m);
      };
      clock.secondInt = setInterval(function(){
        var nowTime = new Date().getTime();
        var interval = parseInt((nowTime-clock.startTime)/1000);
        if(interval%60 == 0){
          clock.mCount++;
          update();
        }
      },1000);
    },

    countDown:function(){
      var time = exam.fill.time;
      var limitSeconds = time.hour*60*60 + time.minute*60;
      var nowTime = new Date().getTime();
      var interval = parseInt((nowTime-clock.startTime)/1000);

      if(interval >= limitSeconds){
        clock.end();
        return;
      }

      var hour=time.hour,minute=time.minute,h,m;
      if(cacheExam){
        var M = parseInt(interval/60);
        clock.mCount += M;
        hour = hour-parseInt(M/60);
        minute = minute - M%60;
        if(minute<0){
          minute = 60 + minute;
          hour--;
        }
      }
      
      h = hour<10?"0"+hour:hour;
      m = minute<10?"0"+minute:minute;
      $("#time-hour").html(h);$("#time-minute").html(m);
      var update = function(){
        m = --minute < 10?"0"+minute:minute;
        if(minute == -1){
          h = --hour < 10 ? "0"+hour:hour;
          $("#time-hour").html(h);
          m = minute = 59;
        }
        $("#time-minute").html(m);
      };
      clock.secondInt = setInterval(function(){
        var nowTime = new Date().getTime();
        var i = parseInt((nowTime-clock.startTime)/1000);
        var t = limitSeconds - i;
        if(t<=0){
          clock.clear();
          clock.end();
          return;
        }else if(t<=60){
          $(".fill-header .time span").html(t+'s');
        }else if(i%60 == 0){
          clock.mCount++;
          update();
        }
      },1000);
    },
    clear:function(){
      clearInterval(clock.secondInt);
    },
    end:function(){
      clock.endTime = new Date().getTime();
      pop.endClock();
    },
    getTime:function(){
      var time = {};
      var nowTime = new Date().getTime();
      var seconds = parseInt((nowTime-clock.startTime)/1000);
      var minutes = parseInt(seconds/60);
      var hour = Math.floor(minutes/60);
      var minute = minutes%60;
      var second = seconds%60;
      time = {
        startTime:makeRdbDate(clock.startTime),
        endTime:makeRdbDate(nowTime),
        hour:hour<10?"0"+hour:hour,
        minute:minute<10?"0"+minute:minute,
        second:second<10?"0"+second:second,
        allSeconds:seconds
      };
      return time;
    }
  };
  var makeRdbDate = function(timestamp){
    return {"$reql_type$":"TIME","epoch_time":timestamp/1000,"timezone":"+00:00"};
  };
  var pop = {
    alert:function(tip){
      var alert = juicer($("#pop-alert-tpl").html());
      $(".ui-exam").append(alert.render({tip:tip}));
      setTimeout(function(){
        $("#pop-alert").addClass("hidden");
      },500);
      setTimeout(function(){
        $("#pop-alert").remove();
      }, 1100);
    },
    loading:function(tip){
      var alert = juicer($("#pop-loading-tpl").html());
      $(".ui-exam").append(alert.render({tip:tip}));
    },
    endLoad:function(){
      $("#pop-loading").addClass("hidden");
      setTimeout(function(){
        $("#pop-loading").remove();
      }, 600);
    },
    confirm:function(unfinished){
      var confirm = juicer($("#pop-confirm-tpl").html());
      $(".ui-exam").append(confirm.render({unfinished:unfinished}));
    },
    endClock:function(){
      var confirm = juicer($("#pop-end-tpl").html());
      $(".ui-exam").append(confirm.render());
    },
    out:function(){
      $("#pop-confirm").remove();
    },
    tip:function(){
      // delete window.localStorage.dripExamTip;
      if(window.localStorage.dripExamTip != undefined) return;
      window.localStorage.dripExamTip = true;
      var firstTip = juicer($("#pop-tip1-tpl").html());
      var secondTip = juicer($("#pop-tip2-tpl").html());
      $(".questions .question:first-child").append(firstTip.render());
      $(".questions .question:not(.end)").each(function(k,v){
        var _this = $(this);
        if(k >= 1 && !_this.hasClass("radio") && !_this.hasClass("img")){
          _this.append(secondTip.render());
          return false;
        }
      });
      $(".pop-tip").css("width",exam.clientWidth)
    }
  };
  var scrollInit = function(){
    var y = 0,oy=0,dy1=0,dy2=0;
    window.scrolling = false;
    $(".scroll-wrap .scroll").css("transform","translate3d(0px,0px,0)");
    var getOy = function(scroll){
      var array = scroll.css("webkitTransform").split(',');
      if(array != "none"){
        return parseInt(array[array.length-1].replace(')', ''));
      }else{
        return 0;
      }
    };
    var reset = function(scroll,y){
      scroll.removeClass("lazy").addClass("lazy3").css("transform","translate3d(0px,"+y+"px,0)");
      setTimeout(function(){
        scroll.removeClass("lazy3");
      }, 300);
    };
    touch.on('.ui-exam','drag dragstart',".scroll",function(ev){
      if(window.swipe) return;
      if(ev.direction != "up" && ev.direction != "down"){
        return;
      };
      window.scrolling = true;
      var scroll = $(this).hasClass("scroll")?$(this):$(this).parents(".scroll");
      scroll.removeClass("lazy");
      y = y?y:getOy(scroll);
      dy1 = dy2;
      dy2 = ev.distanceY;
      y += dy2-dy1;
      scroll.css("transform","translate3d(0px,"+y+"px,0)");
    });
    touch.on('.ui-exam','dragend pinchend',".scroll",function(ev){
      if(window.swipe || !window.scrolling) return;
      var scroll = $(this).hasClass("scroll")?$(this):$(this).parents(".scroll");

      var height = scroll.parent().height()-scroll.height();
      if(ev.duration < 300){
        var speed = 300/ev.duration * 150;
        var extend = (ev.distanceY > 0)?speed:-speed;
        y += extend;
        scroll.addClass("lazy").css("transform","translate3d(0px,"+y+"px,0)");
        setTimeout(function(){
          scroll.removeClass("lazy");
        }, 400);
      }
      if(y < height && height < 0){
        reset(scroll,height);
      }else if(y > 0 || (height > 0 && y < 0)){
        reset(scroll,0);
      }
      window.scrolling = false;
      
      y=dy2=dy1=0;

    });

  };
  var juicerInit = function(){
    var numberPlus = function(number){
      return parseInt(number) + 1;
    };
    var ceil = function(number){
      return Math.ceil(parseInt(number));
    };
    var character = function(index){
      return String.fromCharCode(65 + parseInt(index,10));
    };
    var blankContent = function(content){
      return content.replace(/readonly="readonly"/g,"").replace(/value="填空符"/g,"placeholder='请填空'");
    };
    var showAnalysis = function(q){
      if("img,radio".indexOf(q.type)<0 && exam.analysis.every == true){
        return "close";
      }else{
        return "hidden";
      }
    };
    var getScore = function(q){
      var type,score=0;
      function getRadioScore(){
        $.each(q.options,function(k,v){
          if(v.correct){
            score = v.score;
            return false;
          }
        })
      };
      function getCheckboxScore(){
        if(q.correctMode == "part"){
          q.options.forEach(function(v, k){
            if(v.correct) score += v.score;
          });
        }else{
          score = q.correctScore;
        }
      };
      function getBlankScore(){
        q.blanks.forEach(function(v, k){
          score += v.score;
        });
      };
      switch(q.type){
        case "radio":
        case "img":
          type="单选题";
          getRadioScore();
          break;
        case "checkbox":
        case "imgList":
          type="多选题";
          getCheckboxScore();
          break;
        case "blank":
          type="填空题";
          getBlankScore();
          break;
        default:
          break;
      };
      var typeTpl = "<span>"+type+"</span>"
      return typeTpl+score;
    };
    function renderScore(content,score){
      return content.replace(/\[总分\]/g,score+'分');
    }
    function stringify(object){
      return JSON.stringify(object);
    }
    function getUserName(data){
      var name = "未知用户";
      $.each(data,function(k,v){
        if(v.name == "姓名"){
          name = v.value;
          return false;
        }
      });
      return name;
    }
    function isSelf(openid){
      if(openid == user.openid){
        return "self";
      }else{
        return "";
      }
    }
    juicer.register("ceil",ceil);
    juicer.register("numberPlus",numberPlus);
    juicer.register("character",character);
    juicer.register("blankContent",blankContent);
    juicer.register("showAnalysis",showAnalysis);
    juicer.register("getScore",getScore);
    juicer.register("renderScore",renderScore);
    juicer.register("stringify",stringify);
    juicer.register("getUserName",getUserName);
    juicer.register("isSelf",isSelf);
  };
  var loading = {
    init:function(){
      var images = $("img");
      $.each(images,function(k,img){
        var src = $(img).data("src");
        if(src) img.src = src;
      });
      //console.log(images);
      if(images.length <= 0) return;
      images[0].onload = function(){
        clearInterval(loadingInt);
        $("#loading-percent").html("100%");
        loading.remove();
      };
      images[0].onerror = function(){
        //alert(1111);
        alert("加载失败，重新刷新页面");
        window.location.reload();
      };
      // clearInterval(loadingInt);
      // loading.remove();
    },
    remove:function(){
      $("#exam-loading").addClass("hidden");
      setTimeout(function(){
        $("#exam-loading").remove();
      }, 500);
    }
  };
  var cover = {
    y:0,
    init:function(){
      this.render();
      this.openTouch();
      // $("#exam-cover").remove();
    },
    render:function(){
      var cover = juicer($("#exam-cover-tpl").html());
      $(".ui-exam").prepend(cover.render(exam));
    },
    openTouch:function(){
      if(exam.cover.style == "diy" && exam.cover.enter == "click"){
        $(document).on("click",'#exam-cover',function(){
          cover.out();
        });
      }else{
        // $("#exam-cover").css("transform","translate3d(0,0px,0)");
        $("#exam-cover").css({
          "-webkit-transform":"translate3d(0,0px,0)",
          "transform":"translate3d(0,0px,0)"
        });
        touch.on('#exam-cover','drag dragstart',function(ev){
          if(ev.direction != "up"){
            return;
          }
          cover.y = ev.distanceY * 0.7;
          // $("#exam-cover").css("transform","translate3d(0,"+cover.y+"px,0)");
          $("#exam-cover").css({
            "transform":"translate3d(0,"+cover.y+"px,0)",
            "-webkit-transform":"translate3d(0,"+cover.y+"px,0)"
          });
        });

        touch.on("#exam-cover","dragend pinchend",function(ev){
          if(Math.abs(cover.y) > 0.4*exam.clientHeight || ev.duration < 300){
            cover.out();
          }else{
            cover.styleReset();
          }
        });
      }
        
    },
    styleReset:function(){
      $("#exam-cover").addClass("lazy").css({
        "transform":"translate3d(0,0px,0)",
        "-webkit-transform":"translate3d(0,0px,0)",
      });
      // $("#exam-cover").addClass("lazy").css("transform","translate3d(0,0px,0)");
      cover.removeLazy();
    },
    removeLazy:function(){
      setTimeout(function(){
        $("#exam-cover").removeClass("lazy");
      }, 500);
    },
    remove:function(){
      setTimeout(function(){
        $("#exam-cover").remove();
      }, 500);
    },
    out:function(){
      // $("#exam-cover").addClass("lazy").css("transform","translate3d(0,"+(-exam.clientHeight)+"px,0)");
      $("#exam-cover").addClass("lazy").css({
        "transform":"translate3d(0,"+(-exam.clientHeight)+"px,0)",
        "-webkit-transform":"translate3d(0,"+(-exam.clientHeight)+"px,0)"
      });
      cover.remove();
      if(!$("#userinfo").length && exam.type == "exam") clock.init();
    }
  };

  var userinfo = {
    init:function(){
      this.render();
      this.control();
      this.fill = false;
    },
    render:function(){
      var tpl = juicer($("#userinfo-tpl").html());
      if($("#exam-cover").length > 0){
        $("#exam-cover").after(tpl.render(exam));
      }else{
        $(".ui-exam").prepend(tpl.render(exam));
      }
    },
    control:function(){
      $(document).on("click","#userinfo button.next",function(){
        $("#userinfo input").each(function(){
          userinfo.checkField($(this));
        });
        if($("#userinfo .invalid").length > 0){
          pop.alert("请正确填写");
        }else{
          userinfo.out();
          localStorage.update("userinfo");
        }
      });
      $(document).on("blur","#userinfo input",function(){
        userinfo.checkField($(this));
      });
    },
    checkField:function(field){
      var value = field.val().trim();
      if(value == "" || value == undefined){
        field.addClass("invalid"); 
      }else{
        field.removeClass("invalid");
      }
      var test = /^\+?[0-9\-]+$/;
      if(field.data("type") == "phone"&&!test.test(value)){
        field.addClass("invalid");
        // pop.alert("请输入正确的手机格式");
      }
    },
    out:function(){
      $("#userinfo").addClass("ease-out3").css("transform","translateX("+(-exam.clientWidth)+"px)");
      if(exam.type == "exam") clock.init();
    },
    get:function(){
      // if(userLastResult) return userLastResult.userinfo;
      var cacheInfo = localStorage.cache.userinfo;
      if(cacheInfo){
        cacheInfo.forEach(function(v, k){
          if(v.name == "姓名") userinfo.username = v.value;
        });
        return localStorage.cache.userinfo;
      }
      var data = [];
      $("#userinfo input").each(function(){
        data.push({
          name:$(this).data("name"),
          value:$(this).val().trim()
        });
        if($(this).data("name") == "姓名") userinfo.username = $(this).val().trim();
      });
      return data;
    }
  };
  var localStorage = {
    init:function(){
      this.cache = cacheExam?cacheExam:{
        examId:exam.id
      };
    },
    clear:function(){
      this.cache = cacheExam = false;
      delete window.localStorage.dripExam;
    },
    save:function(){
      window.localStorage.dripExam = JSON.stringify(this.cache);
    },
    update:function(type){
      if(exam.mode == "result") return;
      switch(type){
        case "answer":
          this.updateAnswers();
          break;
        case "step":
          this.updateQuesIdx();
          break;
        case "userinfo":
          this.updateUserinfo();
          break;
        case "time":
          this.updateTime();
          break;
        default:
          break;
      }
      this.save();
    },
    updateAnswers:function(){
      this.cache.answers = ques.answers;
    },
    updateQuesIdx:function(){
      this.cache.questionIdx = ques.$now.data("index");
    },
    updateUserinfo:function(){
      this.cache.userinfo = userinfo.get();
    },
    updateTime:function(){
      this.cache.time = clock.startTime;
    }
  };
  // var updateLocalStorage = function(){
  //   var cache = {
  //     answers:ques.answers,
  //     examId:exam.id,
  //     questionIdx:ques.$now.data("index")
  //   };
  //   if(exam.userInfo.need == true){
  //     cache.userinfo = cache.userinfo?cache.userinfo:userinfo.get();
  //   } 
  //   if(exam.type == "exam" && !cache.time) cache.time = clock.startTime;
  //   window.localStorage.dripExam = JSON.stringify(cache);
  //   console.log(JSON.parse(window.localStorage.dripExam));
  // };
  var ques = {
    init:function(){
      this.render();
      (exam.type=="exam")?this.examControl():this.testControl();
      this.overviewControl();
      this.touch();
    },
    initData:function(){
      this.x = 0;
      this.ox = 0;
      this.token = false;
      this.$now = $(".question:first-child");
      this.$overview = $(".overview .ques-list li:first-child");
      this.now = exam.questions[0];
      this.initAnswers();
      this.showQue(this.$now);
      ques.result = {};
      this.ovHeight = $(".overview .wrap").height();
    },
    showQue:function($q){
      $(".questions .question").addClass("hidden");
      $q.removeClass("hidden");
      $q.prev().removeClass("hidden");
      $q.next().removeClass("hidden");
    },
    initAnswers:function(){
      var answer = {};
      exam.questions.forEach(function(v, k){
        answer[v.id] = {
          questionId:v.id,
          values:[],
          score:0,
          type:v.type,
          label:v.content||v.label
        };
        if(v.labelImg){
          answer[v.id].labelImg = v.labelImg;
        }
      });
      ques.answers = answer;
    },
    getCacheAnswer:function(answers){
      exam.questions.forEach(function(v, k){
        if(answers[v.id]){
          ques.answers[v.id] = answers[v.id];
        }
      });
    },
    reload:function(){
      ques.render();
      var images = $(".questions img");
      $.each(images,function(k,img){
        var src = $(img).data("src");
        img.src = src;
      });
    },
    render:function(){
      var body = (exam.type=="exam")?juicer($("#exam-body-tpl").html()):juicer($("#test-body-tpl").html());
      $("#exam-body").html(body.render(exam));
      $(".questions .question").css("transform","translate3d(0px,0px,0)");

      ques.initData();

      $(".overview .wrap").css("height",0);
      $(".overview").hide();
    },
    renderByResult:function(rs){
      // console.log('结果:');
      // console.log(rs);
      var second = ":<em>"+rs.time.second+"</em>";
      // $(".fill-header .time span").append(second);
      $("#time-hour").html(rs.time.hour);
      $("#time-minute").html(rs.time.minute);
      rs.answers.forEach(function(a, idx){
        var qId = ".question[data-id=" + a.questionId + "]";
        var oId = ".overview li[data-id=" + a.questionId + "]";
        ques.renderQuestion($(qId),a);
        ques.renderOverview($(oId),a);
      });
    },
    renderByCache:function(cache){
      ques.getCacheAnswer(cache.answers);
      ques.getAnswer().forEach(function(a, k){
        if(a.values.length){
          var qId = ".question[data-id=" + a.questionId + "]";
          var oId = ".overview li[data-id=" + a.questionId + "]";
          ques.renderQuestion($(qId),a);
          var status = false;
          if(a.type == "blank" && ($(qId).find("input.question-blank").length != a.values.length)){
            status = true;
          }
          ques.renderOverview($(oId),a,status);
        }
      });
      if(cache.questionIdx){
        ques.updateNow(cache.questionIdx);
        ques.move();
      }
    },
    renderQuestion:function(q,a){
      if(a.status != undefined) q.find(".analysis").removeClass("close").removeClass("hidden");
      if(cacheExam){
        q.find(".ui-button").removeClass("disable");
      }
      if(q.data("type") == "blank"){
        a.values.forEach(function(v, k){
          var blank = $("#blank-"+v.id);
          blank.val(v.value);
          if(a.status != undefined) v.correct?blank.addClass("right"):blank.addClass("wrong");
        });
        if(a.status == undefined) return;
        q.find(".title .question-blank").each(function(){
          var blank = $(this);
          if(blank.val().trim() == ""){
            blank.val("未填写");
            blank.addClass("wrong");
          }
        });
      }else{
        q.find(".options li.opt").each(function(){
          var opt = $(this);
          if(a.status != undefined) opt.data("correct")?opt.addClass("right"):opt.addClass("wrong");
        });
        a.values.forEach(function(v, k){
          var opt = q.find(".options li.opt").eq(v.idx);
          opt.addClass("checked");
        });
      }
    },
    renderOverview:function(o,a,full){
      switch(a.status){
        case 0:
          o.addClass("wrong");
          break;
        case 1:
          o.addClass("right");
          break;
        case 2:
          o.addClass("part-right");
          break;
        default:
          if(!full) o.addClass("filled");
          break;
      }
    },
    touch:function(){
      $(".questions").css("transform","translate3d('0,0,0')");
      touch.on('.question input','touchmove',function(ev){
        ques.token = true;
      });
      touch.on('.question input','dragend pinchend',function(ev){
        ques.token = false;
      });
      touch.on('.ui-exam','drag dragstart',".question",function(ev){
        if(ques.token || window.scrolling || ques.$now.find(".pop-tip").length) return;
        if(ev.direction != "left" && ev.direction != "right"){
          return;
        }
        window.swipe = true;
        if(exam.type=="test" && ques.isCompleted(ques.now.id) != true && ev.direction == "left"){
          ques.x = ques.ox + ev.distanceX*0.5;
        }else{
          ques.x = ques.ox + ev.distanceX;
        }
        $(".questions").css("transform","translate3d("+ques.x+"px,0,0)");
      });
      
      touch.on('.ui-exam',"dragend pinchend",".question",function(ev){
        if(ques.token || window.scrolling || !window.swipe) return;
        window.swipe = false;
        if(exam.type == "test" && ques.isCompleted(ques.now.id) != true && ev.distanceX<0){
          if(ev.distanceX < -0.5*exam.clientWidth) ques.alertToken = true;
          ques.move();
        }else if((Math.abs(ev.distanceX) > 0.4*exam.clientWidth) || (Math.abs(ev.distanceX) > 0.1*exam.clientWidth && ev.duration < 300)){
          ev.distanceX < 0?ques.go():ques.back();
        }else{
          ques.move();
        }
      });
    },
    getAnswer:function(){
      var answers = [];
      exam.questions.forEach(function(v, k){
        answers.push(ques.answers[v.id]);
      });
      return answers;
    },
    submit:function(){
      ques.result = {
        answers:ques.getAnswer(),
        weixinUserInfo:window.user.info,
        examId:exam.id,
        examType:exam.type,
        openid:window.user.openid
      };
      if(exam.score.status == true) ques.result.maxScore = exam.score.max;
      if(exam.userInfo.need == true) ques.result.userinfo = userinfo.get();
      if(userinfo.username != undefined) ques.result.username = userinfo.username;
      exam.type=="test"?ques.submitTest():ques.submitExam();
    },
    submitExam:function(){
      clock.clear();
      var time = clock.getTime();
      if(exam.unofficial){
        ques.checkQues(exam.questions);
      }else{
        ques.checkQues(exam.questions);
      }
      pop.out();
      var score=0,rights=0;
      $.each(ques.answers,function(k,v){
        score+=v.score;
        if(v.status == 1) rights++; 
      });
      ques.result.rights = rights;
      ques.result.score = score;
      ques.result.time = time;
      // console.log(ques.result);
      pop.loading("提交中");
      var url = "/exam/fill?special="+_hook.domain;
      // pop.endLoad();
      // localStorage.clear();
      // result.renderExam(ques.result);
      // console.log(ques.result);
      $.post(url,JSON.stringify(ques.result)).done(function(r){
        pop.endLoad();
        localStorage.clear();
        if(r.status == "success"){
          result.renderExam(ques.result);
        }else{
          pop.alert(r.result);
        }
      }).fail(function(error){
        pop.endLoad();
        //alert("系统错误，请重试");
      });
    },
    checkQues:function(fullQuestions){
      $(".questions .question:not(.end)").each(function(){
        var $q = $(this);
        var q = exam.questions[$q.data('index')];
        if(ques.isCompleted(q.id)) return;
        var fq = fullQuestions[$q.data('index')];
        if(q.type == "blank"){
          ques.checkBlanks($q,fq);
        }else{
          ques.checkOptions($q,fq);
        }
        $q.find(".analysis.close,.analysis.hidden").removeClass("close").removeClass("hidden");
      });
    },
    submitTest:function(){
      var score = 0;
      $.each(ques.answers,function(k,v){
        score += v.score;
      });
      ques.result.score = score;
      ques.result.testResult = result.getTestResult(score);
      console.log(ques.result);
      var url = "/exam/fill?special="+_hook.domain;
      pop.loading("提交中");
      $.post(url,JSON.stringify(ques.result)).done(function(r){
        pop.endLoad();
        localStorage.clear();
        if(r.status == "success"){
          result.renderTest(ques.result.testResult);
        }else{
          pop.alert(r.result);
        }
      }).fail(function(error){
        pop.endLoad();
        alert("系统错误，请重试");
      });
    },
    countUnfinished:function(){
      var unfinished = 0;
      $(".overview .ques-list li").each(function(){
        if(!$(this).hasClass("filled")&&!$(this).hasClass("wrong")&&!$(this).hasClass("right")){
          unfinished++;
        }
      });
      // if(unfinished == 0){
      //   $(".question.end").removeClass("hide");
      // }else{
      //   $(".question.end").addClass("hide");
      // }
      return unfinished;
    },
    isCompleted:function(id){
      var answer = ques.answers[id];
      if(exam.type == "test"){
        return answer.values.length > 0;
      }else{
        return answer.status != undefined;
      }
    },
    updateNow:function(newIdx){
      var id = "#question-"+ newIdx;
      ques.$now = $(id);
      id = "#overview-btn-" + newIdx;
      ques.$overview = $(id);
      ques.now = exam.questions[newIdx];
      ques.ox = -(exam.clientWidth*newIdx);
      // if(newIdx == exam.questions.length-1){
      //   ques.countUnfinished();
      // }
      ques.showQue(ques.$now);
      localStorage.update("step");
    },
    go:function(){
      if(ques.token) return;
      var limit = exam.questions.length - 1;
      if(exam.type == "exam" && !ques.countUnfinished() && exam.mode=="answer"){
        limit++;
      }
      if(ques.$now.data("index") != limit){
        var newIdx = ques.$now.data("index")+1;
        ques.updateNow(newIdx);
      }
      ques.move();
    },
    back:function(){
      if(ques.token) return;
      if(ques.$now.data("index") != 0){
        var newIdx = ques.$now.data("index")-1;
        ques.updateNow(newIdx);
      }
      ques.move();
    },
    move:function(){
      ques.token = true;
      $(".questions").addClass("lazy").css("transform","translate3d("+ques.ox+"px,0,0)");
      var index = ques.$now.data("index")+1;
      if(index == exam.questions.length+1) index--;
      $("#now-index").html(index);
      ques.removeLazy();
    },
    removeLazy:function(){
      setTimeout(function(){
        $(".questions").removeClass("lazy");
        ques.token = false;
        if(ques.alertToken){
          ques.alertToken = false;
          pop.alert("请先完成本题");
        };
      }, 500);
    },
    overviewControl:function(){
      $(document).on("click",".overview .ques-list li",function(){
        var newIdx = $(this).data("index");
        ques.ox = -(exam.clientWidth*newIdx);
        ques.updateNow(newIdx);
        $(".overview .close").click();
        ques.move();
      });
      function viewOpen(){
        $(".overview").show();
        setTimeout(function(){
          $(".overview .wrap").css("height",ques.ovHeight);
          $(".overview").css("background-color","rgba(0,0,0,0.6)");
        });
      };
      function viewClose(){
        $(".overview .wrap").css("height",0);
        $(".overview").css("background-color","rgba(0,0,0,0)");
        setTimeout(function(){
          $(".overview").hide();
        },200);
      };
      $(document).on("click",".overview .close",function(){
        $(".fill-header .step").removeClass("open");
        viewClose();
      });
      $(document).on("click",".fill-header .step",function(){
        if($(this).hasClass("open")){
          $(this).removeClass("open");
          viewClose();
        }else{
          $(this).addClass("open")
          viewOpen();
        }
      });
    },
    examControl:function(){
      $(document).on("input",".question-blank",function(){
        console.log('aaa');
        var notFull = false;
        ques.$now.find("input.question-blank").each(function(){
          var value = $(this).val().trim();
          if(value == ""){
            notFull = true;
            return false;
          }
        });
        ques.pushAnswer(ques.$now,ques.now);
        if(!notFull){
          ques.$overview.addClass("filled");
        }else{
          ques.$overview.removeClass("filled");
        }
      });

      $(document).on("click",".radio .options li,.img .options li",function(){
        if(exam.mode == "result") return;
        var opt = $(this);
        if(exam.unofficial){
          if(ques.isCompleted(ques.now.id)) return;
          opt.addClass("checked");
          ques.pushAnswer(ques.$now,ques.now);
          ques.checkOptions(ques.$now,ques.now);
          ques.$now.find(".analysis.hidden").removeClass("hidden");
        }else{
          opt.siblings().removeClass("checked");
          opt.addClass("checked");
          ques.$overview.addClass("filled");
          ques.pushAnswer(ques.$now,ques.now);
          setTimeout(ques.go,100);
        }

      });
      $(document).on("click",".checkbox .options li,.imgList .options li",function(){
        if(ques.isCompleted(ques.now.id) || exam.mode == "result") return;
        var opt = $(this);
        opt.hasClass("checked")?opt.removeClass("checked"):opt.addClass("checked");
        ques.pushAnswer(ques.$now,ques.now);
        if(ques.$now.find("li.checked").length > 0){
          ques.$overview.addClass("filled");
        }else{
          ques.$overview.removeClass("filled");
        }
      });

      $(document).on("click",".question .analysis.close",function(){
        if(ques.now.type == "blank"){
          ques.checkBlanks(ques.$now,ques.now);
        }else{
          ques.checkOptions(ques.$now,ques.now);
        }
        $(this).removeClass("close");
      });

      $(document).on("click",".fill-header .submit:not(.disabled)",function(){
        pop.confirm(ques.countUnfinished());
      });

      $(document).on("click",".fill-header .result",function(){
        $("#exam-result").show();
      });

      $(document).on("click","#pop-confirm .control .submit",function(){
        ques.submit();
      });

      $(document).on("click","#pop-confirm .control .cancel",function(){
        pop.out();
      });

      $(document).on("click","#pop-confirm .control .look-for",function(){
        pop.out();
        $(".fill-header .step").click();
      });

      $(document).on("click",".question.end .control .check",function(){
        pop.out();
        $(".fill-header .step").click();
      });

      $(document).on("click",".question.end .control .submit",function(){
        pop.out();
        pop.confirm(ques.countUnfinished());
      });

      // $(document).on("click",".pop.pop-tip button",function(){
      //   $(this).parents(".pop").remove();
      // });
      $(document).on("click",".pop.pop-tip",function(){
        $(this).remove();
      });
      
    },
    pushAnswer:function($q,q){
      var answer = ques.answers[q.id];
      if(q.type == "blank"){
        answer.values = ques.getBlanksAnswer($q,q);
      }else{
        answer.values = ques.getOptionsAnswer($q,q);
      }
      localStorage.update("answer");
    },
    getOptionsAnswer:function($q,q){
      var values = [];
      $q.find(".options li.checked").each(function(){
        var opt = $(this);
        var value = opt.data("value");
        value.idx = opt.data("index");
        values.push(value);
      });
      return values;
    },
    getBlanksAnswer:function($q,q){
      var blanks = {},values = [];
      q.blanks.forEach(function(v, k){
        blanks[v.id] = v;
      });
      $q.find(".title .question-blank").each(function(){
        var _this = $(this);
        var blank = blanks[_this.data('blank').id];
        blank.value = _this.val().trim();
        if(blank.value != "") values.push(blank);
      });
      return values;
    },
    checkOptions:function($q,q){
      if(exam.mode == "result") return;
      var answer = ques.answers[q.id];
      var requireAll = false;
      if((q.type == "imgList" || q.type == "checkbox" ) && q.correctMode=="all"){
        var requireAll = true;
      }
      answer.status = 1; //0:错误;1:完全正确;2:部分正确
      var cNum = rNum = 0;
      $q.find(".options li").each(function(){
        var opt = $(this);
        var correct = ($(this).data("correct") == true);
        if(correct){
          cNum++;
          opt.addClass("right");
          if(opt.hasClass("checked")) rNum++;
        }else{
          if(opt.hasClass("checked")){
            answer.status = 0;
          }
          opt.addClass("wrong");
        }
        if(requireAll && correct && !opt.hasClass("checked")){
          answer.status = 0;
        }
      });
      if($q.find(".options li.checked").length == 0) answer.status = 0;
      if(answer.status !== 0 && rNum>0 && rNum < cNum) answer.status = 2;

      $q.find(".options li.checked").each(function(){
        var opt = $(this);
        if(answer.status != 0) answer.score += opt.data("score");
      });

      if(requireAll && answer.status !== 0) answer.score=q.correctScore;
      ques.checkOverview($q.data("index"),answer.status);
    },
    checkBlanks:function($q,q){
      if(exam.mode == "result") return;
      var answer = ques.answers[q.id];
      var blanks = {};
      answer.status = 0;
      q.blanks.forEach(function(v, k){
        blanks[v.id] = v;
      });
      var cNum = wNum = 0; 
      $q.find(".title .question-blank").each(function(){
        cNum++;
        var _this = $(this);
        var blank = blanks[_this.data('blank').id];
        blank.correct = false;
        blank.value = _this.val().trim();
        if(_this.val().trim() == blank.answer){
          _this.addClass("right");
          blank.correct = true;
          answer.score += blank.score;
        }else if(_this.val().trim() == ""){
          _this.val('('+blank.answer+')');
          _this.addClass("wrong");
          wNum++;
        }else{
          wNum++;
          _this.addClass("wrong");
        }
      });
      if(wNum == cNum){
        answer.status = 0;
      }else if(wNum > 0){
        answer.status = 2;
      }else{
        answer.status = 1;
      }
      ques.checkOverview($q.data("index"),answer.status);
    },
    checkOverview:function(idx,status){
      localStorage.update("answer");
      switch(status){
        case 1:
          status = "right";
          break;
        case 2:
          status = "part-right";
          break;
        default:
          status = "wrong";
          break;
      }
      idx = "#overview-btn-" + idx;
      var $overview = $(idx);
      $overview.addClass(status);
    },
    testControl:function(){
      $(document).on("click",".checkbox .options li,.imgList .options li",function(){
        var opt = $(this);
        var answer = ques.answers[ques.now.id];
        if(opt.hasClass("checked")){
          opt.removeClass("checked");
          answer.values.forEach(function(v, k){
            if(v.value==opt.data("value").value) answer.values.splice(k,1);
          });
          answer.score -= opt.data("score");
        }else{
          opt.addClass("checked");
          var value = opt.data("value");
          value.idx = opt.data("index");
          answer.values.push(value);
          answer.score += opt.data("score");
        }
        if(ques.isCompleted(ques.now.id)){
          ques.$overview.addClass("filled");
          ques.$now.find(".nextQuestion,.submit").removeClass("disable");
        }else{
          ques.$overview.removeClass("filled");
          ques.$now.find(".nextQuestion,.submit").addClass("disable");
        }
        localStorage.update("answer");
      });
      $(document).on("click",".radio .options li,.img .options li",function(){
        var opt = $(this);
        if(opt.hasClass("checked")) return;
        var answer = ques.answers[ques.now.id];
        opt.siblings().removeClass("checked");
        opt.addClass("checked");
        answer.score = opt.data("score")||0;
        var value = opt.data("value");
        value.idx = opt.data("index");
        answer.values = [value];
        ques.$overview.addClass("filled");
        ques.$now.find(".submit").removeClass("disable");
        setTimeout(ques.go,100);

        localStorage.update("answer");
      });
      $(document).on("click",".nextQuestion:not(.disable)",function(){
        setTimeout(ques.go,100);
      });
      $(document).on("click",".submit:not(.disable)",function(){
        setTimeout(ques.submit,100);
      });
    }
  };

  var result = {
    init:function(score){
      this.score = score;
      if(exam.type == "test"){
        this.checkTest();
      }
    },
    getTestResult:function(score){
      var testResult = {};
      $.each(exam.results,function(k,v){
        if(k==0) v.min = exam.score.min;
        if(k==exam.results.length-1) v.max = exam.score.max;
        if(score >= v.min && score <= v.max){
          testResult = v;
          return false;
        }
      });
      testResult.content = testResult.content.replace(/\[总分\]/g,score+'分');
      testResult.title = testResult.title.replace(/\[总分\]/g,score+'分');
      return testResult;
    },
    checkTest:function(){
      $.each(exam.results,function(k,v){
        if(k==0) v.min = exam.score.min;
        if(k==exam.results.length-1) v.max = exam.score.max;
        if(result.score >= v.min && result.score <= v.max){
          v.score = result.score;
          result.renderTest(v);
          return false;
        }
      });
    },
    renderTest:function(r){
      r.repeat = exam.fill.repeat;
      var tpl = juicer($("#test-result-tpl").html());
      $(".ui-exam").append(tpl.render(r));

      shareData.desc = '我的测试结果是“'+r.title+'”';
      wx.onMenuShareTimeline(shareData);
      wx.onMenuShareAppMessage(shareData);
    },
    renderExam:function(rs){
      var showScore = exam.result.score&&exam.score.status;
      var r = {
        score:showScore?rs.score:false,
        maxScore:showScore?exam.score.max:false,
        rights:exam.result.rightCounts?rs.rights:false,
        wrongs:exam.questions.length-rs.rights,
        ranking:exam.result.ranking,
        analysis:exam.analysis.status,
        repeat:exam.fill.repeat,
        time:rs.time
      };
      var tpl = juicer($("#exam-result-tpl").html());
      $(".ui-exam").append(tpl.render(r));

      if(showScore){
        if(r.score == 0){
          shareData.desc = "我只得了0分，你也来试试吧~";
        }else{
          shareData.desc = "我得了"+r.score+"分，你也来试试~";
        }
      }else{
        if(r.rights == 0){
          shareData.desc = "我竟然一题都没答对，你也来试试吧~";
        }else{
          shareData.desc = "我答对了"+r.rights+"题，你也来试试~";
        }
      }
      wx.onMenuShareTimeline(shareData);
      wx.onMenuShareAppMessage(shareData);
    },
    control:function(){
      $(document).on("click","#exam-result .footer .reload",function(){
        exam.mode = "answer";
        ques.reload();
        if(exam.type == "exam") clock.init();
        $("#exam-result").remove();
      });
      $(document).on("click","#exam-result .footer .analysis",function(){
        $("#exam-cover").remove();
        $("#userinfo").remove();
        var idx = 0;
        $.each(exam.questions,function(k,v){
          var oid = "#overview-btn-" + k;
          if(!$(oid).hasClass("right")){
            var id = "#question-" + k;
            idx = $(id).data("index");
            return false;
          }
        });
        $(".fill-header .submit span").html("结果");
        $(".fill-header .submit").addClass("result").removeClass("submit");
        $("#exam-result").hide();
        exam.mode = "result";
        ques.ox = -(exam.clientWidth*idx);
        ques.updateNow(idx);
        ques.move();
      });
      $(document).on("click","#ranking .footer button",function(){
        $("#ranking").remove();
      });
      $(document).on("click","#exam-result div.ranking",function(){
        pop.loading("正在加载数据");
        ranking.getRankingData().done(function(rs){
          pop.endLoad();
          var data  = rs.result;
          if(data.length > 0){
            ranking.render(data);
          }else{
            pop.alert("暂无数据");
          }
        });
      });
      $(document).on("click","#exam-result .follow",function(){
        $(".qrcode-pop").show();
      });
      $(document).on("click",".qrcode-pop .qrcode-cover",function(){
        $(".qrcode-pop").hide();
      });
    }
  };

  var ranking = {
    getRankingData:function(){
      var url = "/exam/get-ranking/"+exam.id+"?special="+_hook.domain;
      return $.get(url);
    },
    render:function(rs){
      var tpl = juicer($("#ranking-tpl").html());
      $(".ui-exam").append(tpl.render({ranks:rs}));
    }
  };
  exports.init = function(){
    initApp();
  };
});
