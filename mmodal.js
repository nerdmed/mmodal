(function(Mmodal, $, undefined) {
    templateName;
    modalTemplates = {};
    renderedContent = false;
    Mmodal.render = function(templatename){
        // load Modalwindow
       modalTemplates[templatename] = "added";       
       templateName = templatename;
        // 
        var modalWindow = Meteor.render( function() {
            return Template["mmModalContent"](); // this calls the template and returns the HTML.
        });
        jQuery("body").append(modalWindow)
    };

    Mmodal.show = function(templatename,animation){
        // TODO: check if there is already a modalwindow visible?!
        // console.log(modalTemplates[templatename]);
        if(!(modalTemplates[templatename]=="added") ){
        // check if it already rendered
            Mmodal.render(templatename);
            Mmodal.show(templatename,animation);
        }else{
             jQuery("#mm-wrapper").fadeIn("fast");
        }
        // animate the Modal to show up
    };

    Mmodal.close = function(modalname){
        // if(modalname){
        //     if(jQuery("."+modalname)){
        //         jQuery("#mm-wrapper ").remove();
        //     }
        // }
        jQuery("#mm-wrapper").fadeOut("fast", function(){
         jQuery("#mm-wrapper").remove();
        });
       
    }



    var modal = function(elem, tmplDiv){
        // elem = "<div> <button class='close'>close</button></div>"
        // 

        var overlay = $("<div id='lean_overlay'></div>");
        var modalbox = $("<div id='modal'></div>");
        jQuery(elem).show();

      
        $("body").append(overlay);
        if(jQuery("#modal").length == 1){
            jQuery("#modal").show();
           
        }else{
            modalbox.append(elem);
            $(tmplDiv).prepend(modalbox);
        }

        var overlay = $("#lean_overlay");

        $("#modal").find(".close").click(function(){
            close_modal();
        })
        overlay.click(function(){
           close_modal();
        })

        function close_modal() {
            $("#lean_overlay").remove();
            $("#modal").hide();
        }
    }



}(window.Mmodal = window.Mmodal || {})); 

Template.mmModalContent.events({
    'click': function (e) {
        // console.log(e);
        if(e.toElement.id == "mm-wrapper" || jQuery(e.srcElement).hasClass("boxclose")){
            // jQuery(e.srcElement).attr("name") == "tem";
            Mmodal.close(jQuery(e.srcElement).attr("name")); // name should be passed to make this multiple
        };
        // console.log(jQuery(e.srcElement));

    },

});

Template.mmModalContent.rendered = function () {
    if (!(modalTemplates[templateName] == "rendered")){
        // console.log("war nicht geredner")
      if(templateName){
          var fragment = Meteor.render( function() {
              return Template[ templateName ](); // this calls the template and returns the HTML.
          });
          jQuery("#mm-content").append(fragment);
          modalTemplates[templateName] = "rendered";
          modalTemplates[templateName].template = fragment;
      }
    }else if((modalTemplates[templateName] == "rendered")){
            jQuery("#mm-wrapper").attr("name",templateName);
            jQuery("#mm-wrapper").addClass(templateName);
            jQuery("#mm-content").append(modalTemplates[templateName].template); 
      }
};
