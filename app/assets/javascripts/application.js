// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require twitter/bootstrap
//= require_tree .

$(function(){
  
var x;
var y;
var uniq;

    $.ajax({
      type: 'GET',
      url: '/annotations.json',
      success: function(data){
      $.each(data, function(i, v){
        $('<span class="note" id="'+v.point_id+'" data-toggle="popover" title="" data-content="'+v.note+'" data-original-title="'+v.point_id+'"></span>').css({position: "absolute", left: v.left-10+'px', top: v.top-10+'px' }).appendTo('body')
      })
      $('.note').each(function(){
        $(this).popover();
      })
      }
    })

    url="http://www.json-generator.com/j/gFWH?indent=8";
    $.ajax({
      type:"GET",
      url:url,
      success:function(data){
        $.each(data.result, function(i, v){
          $('#fake_data').append('<div class="col-lg-3"><h4>'+v.title+'</h4><p>'+v.description+'</p>')
        })
        var divs = $('.row > .col-lg-3');
        for(var i = 0; i < divs.length; i+=4) {
          divs.slice(i, i+4).wrapAll('<div class="row"></div>');
        }
      }
    });

  $('#main').click(function(e){ 
      var uniq = $.now();
      var x = event.pageX, y = event.pageY;
      $('<span class="note" id="'+uniq+'" data-left="'+x+'" data-top="'+y+'"></span>'
        +'<form class="form-horizontal">'
        +'<div class="form-group">'
        +'<div class="col-lg-10 col-lg-offset-1">'
        +'<input type="text" class="form-control" id="annotateInput-'+uniq+'" placeholder="Note">'
        +'</div></div>'
        +'<button type="submit" id="submit-note" class="btn btn-default">Submit</button></form>'
        ).css({position: "absolute", left: x-10+'px', top: y-10+'px' }).appendTo('body');
    });

  $(document).on('click', '#submit-note', function(e){
    e.preventDefault();
    var annUrl = window.location.host + "/" + window.location.pathname

      annotation_data = {
        annotation:{
            point_id: uniq,//$(this).closest('.note').attr('id'),
            top: x,//$(this).closest('.note').attr('data-top'),
            left: y,//$(this).closest('.note').attr('data-left'),
            url: annUrl,
            note: $('input.form-control').val()
        }
      }

        $.ajax({
          type: 'POST',
          url: '/annotations',
          data: annotation_data,
          success: function(data){
            console.log(data)
          }
        })
      })

  var $input = $('input.form-control')
  $('input.form-control').each(function(){
    $(document).on('blur', 'input.form-control', function(){
      $(this).hide();
    })
  })
  $('#get_coords').on('click', function(e){
    e.preventDefault()
    $('.note').each(function(){
      var pos = $(this).offset();
      var noteId = $(this).attr('id')
      $('#coords').append('<p>ID: '+noteId+' Top: '+pos.top+' Left: '+pos.left+'</p>')
    })
  })
});