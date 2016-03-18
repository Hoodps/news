function getTplHtml(id){
  var obj = document.getElementById(id);
  return obj.innerHTML;
}
$(document).on("mouseover","form",function(){
  var target = ".pic-uploader."+$(this).data("target")+":not(.small)";
  if($(target).find("img").length == 1){
    $(target).append('<span class="reupload ui-upload-load">重选</span>');
  }
});
$(document).on("mouseleave","form",function(){
  var target = ".pic-uploader."+$(this).data("target");
  $(target).find(".reupload").remove();
});
examModule.directive("settingGroup", function() {
  return {
    restrict: "EA",
    scope: {
      label: '@',
      tip: '@',
      star: '@'
    },
    link:function(scope,ele){
      ele.addClass("setting-group");
    },
    transclude: true,
    template: getTplHtml("setting-group-tpl"),
  };
});

examModule.directive("picUploader", function() {
  return {
    restrict: "EA",
    scope: {
      name:'@',
      index: '@',
      ngModel: '='
    },
    link:function(scope,ele){
      if(scope.ngModel && scope.ngModel != ""){
        ele.addClass("set");
        var img = '<img src="'+scope.ngModel+'" height="50" width="50" />';
        ele.append(img);
      }
      var target = scope.name+(scope.index?scope.index:"");
      ele.addClass("pic-uploader").addClass(target);
      setTimeout(function(){
        // if(!$(ele).is(":visible")){
        //   return;
        // }
        var trigger = ele;
        var uploader = new Uploader({
          trigger: trigger,
          name: target,
          action: '/member/exam/upload?type='+scope.name,
          accept: 'image/png,image/gif,image/jpeg,image/jpg',
          change: function(files){
            uploader.submit();
          },
          success: function(response){
            uploadToken = true;
            var jsonData = $.parseJSON(response);
            var picUrl,picObj ;
            if(jsonData['status'] == 'success'){
              var rusult = jsonData['result'][0];
              picUrl = rusult['savepath'] + rusult['savename'];
              picObj = '<img src="'+_hook.resource+'/'+picUrl+'" height="50" width="50" />';
              scope.ngModel = _hook.resource+'/'+picUrl;
              scope.$apply();
              trigger.html(picObj).addClass("set").removeClass("uploading");
              uploadFinishAct(trigger);
            }else{
              alert(jsonData['result']);
              uploadFinishAct(trigger,false);
            }
          },
          error: function(){
            alert('上传的文件过大或系统异常');
            uploadFinishAct(trigger,false);
          },
          progress: function(event, position, total, percent, files) {
            uploadToken = false;
            renderUploadProgress(percent,trigger);
          }
        });
        var inputSelector = 'input[name='+target+']';
        $(inputSelector).parents('form').attr('data-target',target);
      });
      var renderUploadProgress = function(percent,trigger){
        if(trigger.find(".ui-upload-load").length < 1) {
          var html = $('<span class="ui-upload-load"></span>');
          html.append('<span class="status">上传中</span><br />');
          html.append('<span class="prg"><span class="percent">'+percent+'</span>% </span>');
          html.append('<em class="bar" style="width:'+percent+'%;"></em>');
          trigger.append(html).addClass("uploading");
        }
      };
      var uploadFinishAct = function(trigger,isDelayed){
        var container = trigger;
        var delayTime = isDelayed !== false ? 500 : 0;
        setTimeout(function(){
          container.removeClass("uploading").find(".ui-upload-load").remove();
        },delayTime);
      };
    }
  };
});

examModule.directive("progressDrag", function($rootScope) {
  return function(scope,ele,attr){
    var status = false;
    var ox = 0;
    var btn = ele.children(".progress-button");
    var progress = ele.children(".progress-bar-bg");
    var max = parseInt(ele.children(".progress-bar-bg").css("width"));
    var left = 0;
    btn.mousedown(function(e){
      left = parseInt(btn.css("left"));
      ox = e.pageX - left;
      status = true;
    })
    $(document).mouseup(function(){
      status = false;
    });
    ele.mousemove(function(e){
      if(status){
        var left = e.pageX - ox;
        if(left <= 5) left = 5;
        if(left >= max+5) left = max+5;
        scope.btnLeft = left;
        $rootScope.exam.cover.blur = (scope.btnLeft-5)/max;
        scope.$apply();
      }
    });
    progress.click(function(e){
      var left = parseInt(e.pageX - progress.offset().left + 6);
      scope.btnLeft = left;
      $rootScope.exam.cover.blur = (scope.btnLeft-5)/max;
      scope.$apply();
    });
  }
});

examModule.directive("field", function(){
  return {
    restrict:"EA",
    scope: {
      name: '@',
      type: '@',
    },
    template : '<div field-drag data-type="{{type}}">{{name}}</div>'
  };
});

examModule.directive("fieldDrag",['API','$document','API',function(api, doc, api){
  var startX=70, startY=10, x=y=0, target ;
  return function(scope,element,attr){
    var holdTimeStart;
    var holdTimeEnd;
    element.bind("mousedown",function(event){
      holdTimeStart = new Date().getTime();
      target = element;
      target.addClass("dragable").css({'z-index': 20});
      target.parent().addClass("drag-holder");
      $("html").addClass("move-mode");
      doc.bind("mousemove",mousemove);
      doc.bind("mouseup",mouseup);
    });
    doc.bind("mouseup",function(event){
      if(target) {
        doc.unbind("mousemove",mousemove);
        doc.unbind("mouseup",mouseup);
      }
    });
    var dragHoldToken = false;
    function mouseup(event) {
      dragHoldToken = false;
      holdTimeEnd = new Date().getTime();
      var occupyShow = $(".field-occupy:not(.ng-hide)");
      if(occupyShow.length) {
        var occupyFieldId = $(".field-occupy:not(.ng-hide)").attr('data-field-id');
        api.addQuestion(attr.type, occupyFieldId);
      }else if((holdTimeEnd - holdTimeStart) < 200){
        api.addQuestion(attr.type);
        api.scrollToBottom();
      }
      var formContent = $(".exam-content");
      if(occupyShow.length && (occupyShow.offset().top - formContent.height() > 0)){
        formContent.animate({scrollTop: formContent[0].scrollTop + 150}, 300);
      }
      target.removeClass("dragable").css({ position:'relative',top:0,left:0,zIndex:0 });
      $("html").removeClass("move-mode");
      target.parent().removeClass("drag-holder");
      api.updateMovePos({});
    }

    function mousemove(event){
      y = event.clientY-16;
      x = event.clientX-65;
      target.css({ position:'fixed',top:y + 'px',left:x + 'px'});
      var rect = target[0].getBoundingClientRect();
      api.updateMovePos({left: rect.left, right: rect.right, bottom: rect.bottom, top: rect.bottom});
      if(event.clientY - 80 > $(".exam-content").height()){
        if(dragHoldToken) return;
        dragHoldToken = "bottom";
        setTimeout(function(){
          if(dragHoldToken == "bottom"){
            var formContent = $('.display .exam-content');
            formContent.animate({scrollTop: formContent[0].scrollTop + formContent.height()}, 300);
            dragHoldToken = false;
          }
        }, 1000);
      }else if(event.clientY < 210){
        if(dragHoldToken) return;
        dragHoldToken = "top";
        setTimeout(function(){
          if(dragHoldToken == "top"){
            var formContent = $('.display .exam-content');
            formContent.animate({scrollTop: formContent[0].scrollTop - formContent.height()}, 300);
            dragHoldToken = false;
          }
        }, 1000);
      }else{
        dragHoldToken = false;
      }
    }
  };
}]);

examModule.directive("fieldItem",function($compile){
  return {
    restrict:"E",
    scope: true,
    controller:"questionController",
    compile: function(element, attrs){
      return function(scope, element, attrs) {
        var type = attrs.type;
        var directiveName = type.replace(/([a-z\d])([A-Z])/g, '$1-$2');
        var field = '<div i-' + directiveName + ' class="field-group"></div>';
        element.html(field);
        $compile(element.contents())(scope);
      };
    }
  };
});

examModule.directive("fieldEditor", function($compile, $timeout, $rootScope) {
  return {
    restrict: 'EA',
    transclude: true,
    scope:{
      question:'='
    },
    controller:"questionController",
    link: function(scope, element) {
      scope.examType = $rootScope.exam.type;
      var resize = function(question){
        if(question == null){
          element.html("");
          return;
        }
        var type = question.type;
        var directiveName = type.replace(/([a-z\d])([A-Z])/g, '$1-$2');
        var field = '<div editor-' + directiveName + '></div>';
        element.html(field);
        $compile(element.contents())(scope);
      };
      scope.$watch(
        function(scope) {
          return scope.question;
        },
        function(question) {
          resize(question);
        }
      );
    }
  };
});

examModule.directive('rangeValidator', function() {
  return {
    restrict: 'EA',
    scope:{
      question:"="
    },
    template: getTplHtml('range-validator-tpl')
  };
});

examModule.directive('clientWidthChange', function($rootScope) {
  return function(){
    var widthChange = function(init){
      if(document.body.clientWidth <= 1200){
        $rootScope.config.clientType = "small";
        if(!init) $rootScope.$apply();
      }else{
        $rootScope.config.clientType = "normal";
        if(!init) $rootScope.$apply();
      }
    };
    widthChange(true);
    window.onresize = function(){
      widthChange();
    };
  }
});

examModule.directive("ueditor", function($timeout) {
  return {
    restrict: "EA",
    require: '^ngModel',
    scope:{
      question:"=",
      result:"="
    },
    template: '<textarea></textarea>',
    link: function(scope, element, attrs, model) {
      var editorId = attrs.name;
      var type = attrs.type;
      var toolbars = false;
      if(type == "result"){
        toolbars = [["insertimage","|",'forecolor',"bold",'removeformat']];
      }
      $timeout(function() {
        element.find('textarea').attr('id', editorId);
        UE.delEditor(editorId);
        var ue = UE.getEditor(editorId, {
          autoHeightEnabled: false,
          initialFrameHeight: 200,
          toolbars: toolbars,
          zIndex:0,
          elementPathEnabled: false,
          wordCount: false,
          initialStyle:'body{font-size: 12px;}.question-blank{color: #558c23;background-color: #cff7ab;display: inline-block;border:1px solid #a2c68d;height:18px;line-height:1;text-align:center;width:49px;margin:2px 5px;padding:0px;cursor:pointer;}'
        });
        ue.ready(function() {
          var content = model.$viewValue;
          if(content) {
            ue.setContent(content);
          }
          $(ue.body).on("click",".question-blank",function(){
            var range = ue.selection.getRange();
            range.selectNode(this).select();
          });
          if(type == "result"){
            scope.$watch(
              function(scope) {
                return scope.result;
              },
              function(result) {
                ue.setContent(result.content||"");
              }
            );
          }
        });
        ue.on('contentchange', function() {
          var content = ue.getContent();
          model.$setViewValue(content);
          model.$render();
          var question = scope.question;
          if(question){
            var $blanks = $(content).find(".question-blank");
            if($blanks.length < question.blanks.length){
              question.blanks.forEach(function(v, k){
                var id = "#blank-"+v.id;
                if(!$(content).find(id).length){
                  question.blanks.splice(k,1);
                }
              });
            }
          }
        });
      });
    }
  };
});

examModule.directive("questionContent", function() {
  return {
    restrict: 'EA',
    scope:{
      questionContent:"="
    },
    link:function(scope,ele){
      var appendContent = function(content){
        ele.html(content||"填空题区域");
        var blanks = $(ele).find(".question-blank");
        blanks.each(function(k,v){
          blanks.val("");
        });
      };
      appendContent(scope.questionContent);
      scope.$watch(
        function(scope) {
          return scope.questionContent;
        },
        function(content) {
          appendContent(content);
        }
      );
    }
  };
});

examModule.directive('toggle', function($timeout) {
  return {
    restrict: 'E',
    require: 'ngModel',
    scope: {},
    template: getTplHtml('toggle-tpl'),
    link: function(scope, element, attr, ngModel) {
      $timeout(function() {
        scope.on = ngModel.$modelValue;
      });
      var onValue = attr.onValue || true;
      var offValue = attr.offValue || false;
      var disabled = scope.$eval(attr.ngDisabled || 'false');
      scope.disabled = disabled;
      scope.$watch(function() {
        return ngModel.$modelValue;
      },function() {
        scope.on = (ngModel.$modelValue == onValue);
      });
      scope.on = ngModel.$viewValue == onValue;
      element.on('click', function() {
        if(element.attr("disabled") !== 'disabled') {
          if(ngModel.$modelValue === onValue) {
            ngModel.$setViewValue(offValue);
          } else {
            ngModel.$setViewValue(onValue);
          }
        }
      });
    }
  };
});

examModule.directive("iRadio", function() {
  return {restrict: "EA", template: getTplHtml("choice-tpl")};
});
examModule.directive("iCheckbox", function() {
  return {restrict: "EA", template: getTplHtml("choice-tpl")};
});
examModule.directive("iBlank", function() {
  return {restrict: "EA", template: getTplHtml("blank-tpl")};
});
examModule.directive("iImg", function() {
  return {restrict: "EA", template: getTplHtml("img-tpl")};
});
examModule.directive("iImgList", function() {
  return {restrict: "EA", template: getTplHtml("img-tpl")};
});
examModule.directive("editorRadio", function() {
  return {restrict: "EA", template: getTplHtml("editor-choice-tpl")};
});
examModule.directive("editorCheckbox", function() {
  return {restrict: "EA", template: getTplHtml("editor-choice-tpl")};
});
examModule.directive("editorImg", function() {
  return {restrict: "EA", template: getTplHtml("editor-choice-img-tpl")};
});
examModule.directive("editorImgList", function() {
  return {restrict: "EA", template: getTplHtml("editor-choice-img-tpl")};
});
examModule.directive("editorBlank", function() {
  return {restrict: "EA", template: getTplHtml("editor-blank-tpl")};
});

// 分值设置、答案设置
examModule.directive("aQuestion", function() {
  return {restrict: "EA", template: getTplHtml("a-question-tpl")};
});
examModule.directive("aScoreChoice", function() {
  return {restrict: "EA", template: getTplHtml("a-score-choice-tpl")};
});
examModule.directive("aScoreExamRadio", function() {
  return {restrict: "EA", template: getTplHtml("a-score-exam-radio-tpl")};
});
examModule.directive("aScoreExamCheckbox", function() {
  return {restrict: "EA", template: getTplHtml("a-score-exam-checkbox-tpl")};
});

examModule.directive("aScore",function($compile){
  return {
    restrict:"EA",
    scope: {
      question:"=",
      type:"="
    },
    controller:"answerController",
    compile: function(element, attrs){
      return function(scope, element) {
        var html;
        if(scope.type == "test"){
          html = getTplHtml("a-score-choice-tpl");
        }else{
          switch(scope.question.type){
            case "blank":
              html = getTplHtml("a-score-blank-tpl");
              break;
            case "radio":
            case "img":
            case "checkbox":
            case "imgList":
              html = getTplHtml("a-score-exam-choice-tpl");
              break;
            default:
              break;
          }
        }
        element.html(html);
        $compile(element.contents())(scope);
      };
    }
  };
});

examModule.directive("aAnswer",function($compile){
  return {
    restrict:"EA",
    scope: {
      question:"="
    },
    controller:"answerController",
    compile: function(element, attrs){
      return function(scope, element) {
        var html;
        switch(scope.question.type){
          case "blank":
            html = getTplHtml("a-answer-blank-tpl");
            break;
          case "radio":
          case "img":
          case "checkbox":
          case "imgList":
            html = getTplHtml("a-answer-choice-tpl");
            break;
          default:
            break;
        }
        element.html(html);
        $compile(element.contents())(scope);
      };
    }
  };
});

examModule.directive("inputHint", function($timeout) {
  return {
    restrict: 'A',
    require: '^ngModel',
    link: function(scope, element, attr, ngModel) {
      var holder = element.attr('input-hint');
      var setClass = function() {
        if(ngModel.$viewValue != holder) {
          element.removeClass('input-hint');
        } else {
          element.addClass('input-hint');
        }
      };
      $timeout(setClass);
      element.on('keyup', setClass);
      element.on('focus', function() {
        element.removeClass('input-hint');
        if(ngModel.$viewValue == holder) {
          ngModel.$setViewValue('');
          ngModel.$render();
          scope.$apply();
        }
      });
      element.on('blur', function() {
        if(ngModel.$viewValue === '') {
          ngModel.$setViewValue(holder);
          ngModel.$render();
          setClass();
          scope.$apply();
        }
      });
    }
  };
});