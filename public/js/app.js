/*!
 *
 * Angle - Bootstrap Admin App + jQuery
 *
 * Version: 3.5.3
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 *
 */


(function(window, document, $, undefined) {

    if (typeof $ === 'undefined') {
        throw new Error('This application\'s JavaScript requires jQuery');
    }

    $(function() {

        // Restore body classes
        // -----------------------------------
        var $body = $('body');
        new StateToggler().restoreState($body);

        // enable settings toggle after restore
        $('#chk-fixed').prop('checked', $body.hasClass('layout-fixed'));
        $('#chk-collapsed').prop('checked', $body.hasClass('aside-collapsed'));
        $('#chk-collapsed-text').prop('checked', $body.hasClass('aside-collapsed-text'));
        $('#chk-boxed').prop('checked', $body.hasClass('layout-boxed'));
        $('#chk-float').prop('checked', $body.hasClass('aside-float'));
        $('#chk-hover').prop('checked', $body.hasClass('aside-hover'));

        // When ready display the offsidebar
        $('.offsidebar.hide').removeClass('hide');

        // Disable warning "Synchronous XMLHttpRequest on the main thread is deprecated.."
        $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
            options.async = true;
        });

    }); // doc ready

})(window, document, window.jQuery);
// Start Bootstrap JS
// -----------------------------------

(function(window, document, $, undefined){

  $(function(){

    // POPOVER
    // ----------------------------------- 

    $('[data-toggle="popover"]').popover();

    // TOOLTIP
    // ----------------------------------- 

    $('[data-toggle="tooltip"]').tooltip({
      container: 'body'
    });

    // DROPDOWN INPUTS
    // ----------------------------------- 
    $('.dropdown input').on('click focus', function(event){
      event.stopPropagation();
    });

  });

})(window, document, window.jQuery);
// // Custom jQuery
// // -----------------------------------
//
//
// (function(window, document, $, undefined) {
//
//     if (!$.fn.fullCalendar) return;
//
//     // When dom ready, init calendar and events
//     $(function() {
//
//         // The element that will display the calendar
//         var calendar = $('#calendar');
//
//         var demoEvents = createDemoEvents();
//
//         initExternalEvents(calendar);
//
//         initCalendar(calendar, demoEvents);
//
//     });
//
//
//     // global shared var to know what we are dragging
//     var draggingEvent = null;
//
//     /**
//      * ExternalEvent object
//      * @param jQuery Object elements Set of element as jQuery objects
//      */
//     var ExternalEvent = function(elements) {
//
//         if (!elements) return;
//
//         elements.each(function() {
//             var $this = $(this);
//             // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
//             // it doesn't need to have a start or end
//             var calendarEventObject = {
//                 title: $.trim($this.text()) // use the element's text as the event title
//             };
//
//             // store the Event Object in the DOM element so we can get to it later
//             $this.data('calendarEventObject', calendarEventObject);
//
//             // make the event draggable using jQuery UI
//             $this.draggable({
//                 zIndex: 1070,
//                 revert: true, // will cause the event to go back to its
//                 revertDuration: 0 //  original position after the drag
//             });
//
//         });
//     };
//
//     /**
//      * Invoke full calendar plugin and attach behavior
//      * @param  jQuery [calElement] The calendar dom element wrapped into jQuery
//      * @param  EventObject [events] An object with the event list to load when the calendar displays
//      */
//     function initCalendar(calElement, events) {
//
//         // check to remove elements from the list
//         var removeAfterDrop = $('#remove-after-drop');
//
//         calElement.fullCalendar({
//             // isRTL: true,
//             header: {
//                 left: 'prev,next today',
//                 center: 'title',
//                 right: 'month,agendaWeek,agendaDay'
//             },
//             buttonIcons: { // note the space at the beginning
//                 prev: ' fa fa-caret-left',
//                 next: ' fa fa-caret-right'
//             },
//             buttonText: {
//                 today: 'today',
//                 month: 'month',
//                 week: 'week',
//                 day: 'day'
//             },
//             editable: true,
//             droppable: true, // this allows things to be dropped onto the calendar
//             drop: function(date, allDay) { // this function is called when something is dropped
//
//                 var $this = $(this),
//                     // retrieve the dropped element's stored Event Object
//                     originalEventObject = $this.data('calendarEventObject');
//
//                 // if something went wrong, abort
//                 if (!originalEventObject) return;
//
//                 // clone the object to avoid multiple events with reference to the same object
//                 var clonedEventObject = $.extend({}, originalEventObject);
//
//                 // assign the reported date
//                 clonedEventObject.start = date;
//                 clonedEventObject.allDay = allDay;
//                 clonedEventObject.backgroundColor = $this.css('background-color');
//                 clonedEventObject.borderColor = $this.css('border-color');
//
//                 // render the event on the calendar
//                 // the last `true` argument determines if the event "sticks"
//                 // (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
//                 calElement.fullCalendar('renderEvent', clonedEventObject, true);
//
//                 // if necessary remove the element from the list
//                 if (removeAfterDrop.is(':checked')) {
//                     $this.remove();
//                 }
//             },
//             eventDragStart: function(event, js, ui) {
//                 draggingEvent = event;
//             },
//             // This array is the events sources
//             events: events
//         });
//     }
//
//     /**
//      * Inits the external events panel
//      * @param  jQuery [calElement] The calendar dom element wrapped into jQuery
//      */
//     function initExternalEvents(calElement) {
//         // Panel with the external events list
//         var externalEvents = $('.external-events');
//
//         // init the external events in the panel
//         new ExternalEvent(externalEvents.children('div'));
//
//         // External event color is danger-red by default
//         var currColor = '#f6504d';
//         // Color selector button
//         var eventAddBtn = $('.external-event-add-btn');
//         // New external event name input
//         var eventNameInput = $('.external-event-name');
//         // Color switchers
//         var eventColorSelector = $('.external-event-color-selector .circle');
//
//         // Trash events Droparea
//         $('.external-events-trash').droppable({
//             accept: '.fc-event',
//             activeClass: 'active',
//             hoverClass: 'hovered',
//             tolerance: 'touch',
//             drop: function(event, ui) {
//
//                 // You can use this function to send an ajax request
//                 // to remove the event from the repository
//
//                 if (draggingEvent) {
//                     var eid = draggingEvent.id || draggingEvent._id;
//                     // Remove the event
//                     calElement.fullCalendar('removeEvents', eid);
//                     // Remove the dom element
//                     ui.draggable.remove();
//                     // clear
//                     draggingEvent = null;
//                 }
//             }
//         });
//
//         eventColorSelector.click(function(e) {
//             e.preventDefault();
//             var $this = $(this);
//
//             // Save color
//             currColor = $this.css('background-color');
//             // De-select all and select the current one
//             eventColorSelector.removeClass('selected');
//             $this.addClass('selected');
//         });
//
//         eventAddBtn.click(function(e) {
//             e.preventDefault();
//
//             // Get event name from input
//             var val = eventNameInput.val();
//             // Dont allow empty values
//             if ($.trim(val) === '') return;
//
//             // Create new event element
//             var newEvent = $('<div/>').css({
//                     'background-color': currColor,
//                     'border-color': currColor,
//                     'color': '#fff'
//                 })
//                 .html(val);
//
//             // Prepends to the external events list
//             externalEvents.prepend(newEvent);
//             // Initialize the new event element
//             new ExternalEvent(newEvent);
//             // Clear input
//             eventNameInput.val('');
//         });
//     }
//
//     /**
//      * Creates an array of events to display in the first load of the calendar
//      * Wrap into this function a request to a source to get via ajax the stored events
//      * @return Array The array with the events
//      */
//     function createDemoEvents() {
//         // Date for the calendar events (dummy data)
//         var date = new Date();
//         var d = date.getDate(),
//             m = date.getMonth(),
//             y = date.getFullYear();
//
//         return [{
//             title: 'All Day Event',
//             start: new Date(y, m, 1),
//             backgroundColor: '#f56954', //red
//             borderColor: '#f56954' //red
//         }, {
//             title: 'Long Event',
//             start: new Date(y, m, d - 5),
//             end: new Date(y, m, d - 2),
//             backgroundColor: '#f39c12', //yellow
//             borderColor: '#f39c12' //yellow
//         }, {
//             title: 'Meeting',
//             start: new Date(y, m, d, 10, 30),
//             allDay: false,
//             backgroundColor: '#0073b7', //Blue
//             borderColor: '#0073b7' //Blue
//         }, {
//             title: 'Lunch',
//             start: new Date(y, m, d, 12, 0),
//             end: new Date(y, m, d, 14, 0),
//             allDay: false,
//             backgroundColor: '#00c0ef', //Info (aqua)
//             borderColor: '#00c0ef' //Info (aqua)
//         }, {
//             title: 'Birthday Party',
//             start: new Date(y, m, d + 1, 19, 0),
//             end: new Date(y, m, d + 1, 22, 30),
//             allDay: false,
//             backgroundColor: '#00a65a', //Success (green)
//             borderColor: '#00a65a' //Success (green)
//         }, {
//             title: 'Open Google',
//             start: new Date(y, m, 28),
//             end: new Date(y, m, 29),
//             url: '//google.com/',
//             backgroundColor: '#3c8dbc', //Primary (light-blue)
//             borderColor: '#3c8dbc' //Primary (light-blue)
//         }];
//     }
//
// })(window, document, window.jQuery);

// // Easypie chart
// // -----------------------------------
//
// (function(window, document, $, undefined) {
//
//     $(function() {
//
//         if(! $.fn.easyPieChart ) return;
//
//         var pieOptions1 = {
//             animate: {
//                 duration: 800,
//                 enabled: true
//             },
//             barColor: APP_COLORS['success'],
//             trackColor: false,
//             scaleColor: false,
//             lineWidth: 10,
//             lineCap: 'circle'
//         };
//         $('#easypie1').easyPieChart(pieOptions1);
//
//         var pieOptions2 = {
//             animate: {
//                 duration: 800,
//                 enabled: true
//             },
//             barColor: APP_COLORS['warning'],
//             trackColor: false,
//             scaleColor: false,
//             lineWidth: 4,
//             lineCap: 'circle'
//         };
//         $('#easypie2').easyPieChart(pieOptions2);
//
//         var pieOptions3 = {
//             animate: {
//                 duration: 800,
//                 enabled: true
//             },
//             barColor: APP_COLORS['danger'],
//             trackColor: false,
//             scaleColor: APP_COLORS['gray'],
//             lineWidth: 15,
//             lineCap: 'circle'
//         };
//         $('#easypie3').easyPieChart(pieOptions3);
//
//         var pieOptions4 = {
//             animate: {
//                 duration: 800,
//                 enabled: true
//             },
//             barColor: APP_COLORS['danger'],
//             trackColor: APP_COLORS['yellow'],
//             scaleColor: APP_COLORS['gray-dark'],
//             lineWidth: 15,
//             lineCap: 'circle'
//         };
//         $('#easypie4').easyPieChart(pieOptions4);
//
//     });
//
// })(window, document, window.jQuery);

// // Knob chart
// // -----------------------------------
//
// (function(window, document, $, undefined){
//
//   $(function(){
//
//         if(! $.fn.knob ) return;
//
//         var knobLoaderOptions1 = {
//             width: '50%', // responsive
//             displayInput: true,
//             fgColor: APP_COLORS['info']
//         };
//         $('#knob-chart1').knob(knobLoaderOptions1);
//
//         var knobLoaderOptions2 = {
//             width: '50%', // responsive
//             displayInput: true,
//             fgColor: APP_COLORS['purple'],
//             readOnly: true
//         };
//         $('#knob-chart2').knob(knobLoaderOptions2);
//
//         var knobLoaderOptions3 = {
//             width: '50%', // responsive
//             displayInput: true,
//             fgColor: APP_COLORS['info'],
//             bgColor: APP_COLORS['gray'],
//             angleOffset: -125,
//             angleArc: 250
//         };
//         $('#knob-chart3').knob(knobLoaderOptions3);
//
//         var knobLoaderOptions4 = {
//             width: '50%', // responsive
//             displayInput: true,
//             fgColor: APP_COLORS['pink'],
//             displayPrevious: true,
//             thickness: 0.1,
//             lineCap: 'round'
//         };
//         $('#knob-chart4').knob(knobLoaderOptions4);
//
//   });
//
// })(window, document, window.jQuery);

// // Start Bootstrap JS
// // -----------------------------------
//
// (function(window, document, $, undefined){
//
//   $(function(){
//
//     if ( typeof Chart === 'undefined' ) return;
//
//     // random values for demo
//     var rFactor = function(){ return Math.round(Math.random()*100); };
//
//
//   // Line chart
//   // -----------------------------------
//
//     var lineData = {
//         labels : ['January','February','March','April','May','June','July'],
//         datasets : [
//           {
//             label: 'My First dataset',
//             fillColor : 'rgba(114,102,186,0.2)',
//             strokeColor : 'rgba(114,102,186,1)',
//             pointColor : 'rgba(114,102,186,1)',
//             pointStrokeColor : '#fff',
//             pointHighlightFill : '#fff',
//             pointHighlightStroke : 'rgba(114,102,186,1)',
//             data : [rFactor(),rFactor(),rFactor(),rFactor(),rFactor(),rFactor(),rFactor()]
//           },
//           {
//             label: 'My Second dataset',
//             fillColor : 'rgba(35,183,229,0.2)',
//             strokeColor : 'rgba(35,183,229,1)',
//             pointColor : 'rgba(35,183,229,1)',
//             pointStrokeColor : '#fff',
//             pointHighlightFill : '#fff',
//             pointHighlightStroke : 'rgba(35,183,229,1)',
//             data : [rFactor(),rFactor(),rFactor(),rFactor(),rFactor(),rFactor(),rFactor()]
//           }
//         ]
//       };
//
//
//     var lineOptions = {
//       scaleShowGridLines : true,
//       scaleGridLineColor : 'rgba(0,0,0,.05)',
//       scaleGridLineWidth : 1,
//       bezierCurve : true,
//       bezierCurveTension : 0.4,
//       pointDot : true,
//       pointDotRadius : 4,
//       pointDotStrokeWidth : 1,
//       pointHitDetectionRadius : 20,
//       datasetStroke : true,
//       datasetStrokeWidth : 2,
//       datasetFill: true,
//       responsive: true
//     };
//
//     var linectx = document.getElementById("chartjs-linechart").getContext("2d");
//     var lineChart = new Chart(linectx).Line(lineData, lineOptions);
//
//   // Bar chart
//   // -----------------------------------
//
//     var barData = {
//         labels : ['January','February','March','April','May','June','July'],
//         datasets : [
//           {
//             fillColor : '#23b7e5',
//             strokeColor : '#23b7e5',
//             highlightFill: '#23b7e5',
//             highlightStroke: '#23b7e5',
//             data : [rFactor(),rFactor(),rFactor(),rFactor(),rFactor(),rFactor(),rFactor()]
//           },
//           {
//             fillColor : '#5d9cec',
//             strokeColor : '#5d9cec',
//             highlightFill : '#5d9cec',
//             highlightStroke : '#5d9cec',
//             data : [rFactor(),rFactor(),rFactor(),rFactor(),rFactor(),rFactor(),rFactor()]
//           }
//         ]
//     };
//
//     var barOptions = {
//       scaleBeginAtZero : true,
//       scaleShowGridLines : true,
//       scaleGridLineColor : 'rgba(0,0,0,.05)',
//       scaleGridLineWidth : 1,
//       barShowStroke : true,
//       barStrokeWidth : 2,
//       barValueSpacing : 5,
//       barDatasetSpacing : 1,
//       responsive: true
//     };
//
//     var barctx = document.getElementById("chartjs-barchart").getContext("2d");
//     var barChart = new Chart(barctx).Bar(barData, barOptions);
//
//   //  Doughnut chart
//   // -----------------------------------
//
//     var doughnutData = [
//           {
//             value: 300,
//             color: '#7266ba',
//             highlight: '#7266ba',
//             label: 'Purple'
//           },
//           {
//             value: 50,
//             color: '#23b7e5',
//             highlight: '#23b7e5',
//             label: 'Info'
//           },
//           {
//             value: 100,
//             color: '#fad732',
//             highlight: '#fad732',
//             label: 'Yellow'
//           }
//         ];
//
//     var doughnutOptions = {
//       segmentShowStroke : true,
//       segmentStrokeColor : '#fff',
//       segmentStrokeWidth : 2,
//       percentageInnerCutout : 85,
//       animationSteps : 100,
//       animationEasing : 'easeOutBounce',
//       animateRotate : true,
//       animateScale : false,
//       responsive: true
//     };
//
//     var doughnutctx = document.getElementById("chartjs-doughnutchart").getContext("2d");
//     var doughnutChart = new Chart(doughnutctx).Doughnut(doughnutData, doughnutOptions);
//
//   // Pie chart
//   // -----------------------------------
//
//     var pieData =[
//           {
//             value: 300,
//             color: '#7266ba',
//             highlight: '#7266ba',
//             label: 'Purple'
//           },
//           {
//             value: 40,
//             color: '#fad732',
//             highlight: '#fad732',
//             label: 'Yellow'
//           },
//           {
//             value: 120,
//             color: '#23b7e5',
//             highlight: '#23b7e5',
//             label: 'Info'
//           }
//         ];
//
//     var pieOptions = {
//       segmentShowStroke : true,
//       segmentStrokeColor : '#fff',
//       segmentStrokeWidth : 2,
//       percentageInnerCutout : 0, // Setting this to zero convert a doughnut into a Pie
//       animationSteps : 100,
//       animationEasing : 'easeOutBounce',
//       animateRotate : true,
//       animateScale : false,
//       responsive: true
//     };
//
//     var piectx = document.getElementById("chartjs-piechart").getContext("2d");
//     var pieChart = new Chart(piectx).Pie(pieData, pieOptions);
//
//   // Polar chart
//   // -----------------------------------
//
//     var polarData = [
//           {
//             value: 300,
//             color: '#f532e5',
//             highlight: '#f532e5',
//             label: 'Red'
//           },
//           {
//             value: 50,
//             color: '#7266ba',
//             highlight: '#7266ba',
//             label: 'Green'
//           },
//           {
//             value: 100,
//             color: '#f532e5',
//             highlight: '#f532e5',
//             label: 'Yellow'
//           },
//           {
//             value: 140,
//             color: '#7266ba',
//             highlight: '#7266ba',
//             label: 'Grey'
//           },
//         ];
//
//     var polarOptions = {
//       scaleShowLabelBackdrop : true,
//       scaleBackdropColor : 'rgba(255,255,255,0.75)',
//       scaleBeginAtZero : true,
//       scaleBackdropPaddingY : 1,
//       scaleBackdropPaddingX : 1,
//       scaleShowLine : true,
//       segmentShowStroke : true,
//       segmentStrokeColor : '#fff',
//       segmentStrokeWidth : 2,
//       animationSteps : 100,
//       animationEasing : 'easeOutBounce',
//       animateRotate : true,
//       animateScale : false,
//       responsive: true
//     };
//
//     var polarctx = document.getElementById("chartjs-polarchart").getContext("2d");
//     var polarChart = new Chart(polarctx).PolarArea(polarData, polarOptions);
//
//   // Radar chart
//   // -----------------------------------
//
//     var radarData = {
//       labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
//       datasets: [
//         {
//           label: 'My First dataset',
//           fillColor: 'rgba(114,102,186,0.2)',
//           strokeColor: 'rgba(114,102,186,1)',
//           pointColor: 'rgba(114,102,186,1)',
//           pointStrokeColor: '#fff',
//           pointHighlightFill: '#fff',
//           pointHighlightStroke: 'rgba(114,102,186,1)',
//           data: [65,59,90,81,56,55,40]
//         },
//         {
//           label: 'My Second dataset',
//           fillColor: 'rgba(151,187,205,0.2)',
//           strokeColor: 'rgba(151,187,205,1)',
//           pointColor: 'rgba(151,187,205,1)',
//           pointStrokeColor: '#fff',
//           pointHighlightFill: '#fff',
//           pointHighlightStroke: 'rgba(151,187,205,1)',
//           data: [28,48,40,19,96,27,100]
//         }
//       ]
//     };
//
//     var radarOptions = {
//       scaleShowLine : true,
//       angleShowLineOut : true,
//       scaleShowLabels : false,
//       scaleBeginAtZero : true,
//       angleLineColor : 'rgba(0,0,0,.1)',
//       angleLineWidth : 1,
//       pointLabelFontFamily : "'Arial'",
//       pointLabelFontStyle : 'bold',
//       pointLabelFontSize : 10,
//       pointLabelFontColor : '#565656',
//       pointDot : true,
//       pointDotRadius : 3,
//       pointDotStrokeWidth : 1,
//       pointHitDetectionRadius : 20,
//       datasetStroke : true,
//       datasetStrokeWidth : 2,
//       datasetFill : true,
//       responsive: true
//     };
//
//     var radarctx = document.getElementById("chartjs-radarchart").getContext("2d");
//     var radarChart = new Chart(radarctx).Radar(radarData, radarOptions);
//
//   });
//
// })(window, document, window.jQuery);

// // Chartist
// // -----------------------------------
//
// (function(window, document, $, undefined){
//
//   $(function(){
//
//     if ( typeof Chartist === 'undefined' ) return;
//
//     // Bar bipolar
//     // -----------------------------------
//     var data1 = {
//       labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
//       series: [
//         [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
//       ]
//     };
//
//     var options1 = {
//       high: 10,
//       low: -10,
//       height: 280,
//       axisX: {
//         labelInterpolationFnc: function(value, index) {
//           return index % 2 === 0 ? value : null;
//         }
//       }
//     };
//
//     new Chartist.Bar('#ct-bar1', data1, options1);
//
//     // Bar Horizontal
//     // -----------------------------------
//     new Chartist.Bar('#ct-bar2', {
//       labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
//       series: [
//         [5, 4, 3, 7, 5, 10, 3],
//         [3, 2, 9, 5, 4, 6, 4]
//       ]
//     }, {
//       seriesBarDistance: 10,
//       reverseData: true,
//       horizontalBars: true,
//       height: 280,
//       axisY: {
//         offset: 70
//       }
//     });
//
//     // Line
//     // -----------------------------------
//     new Chartist.Line('#ct-line1', {
//       labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
//       series: [
//         [12, 9, 7, 8, 5],
//         [2, 1, 3.5, 7, 3],
//         [1, 3, 4, 5, 6]
//       ]
//     }, {
//       fullWidth: true,
//       height: 280,
//       chartPadding: {
//         right: 40
//       }
//     });
//
//
//     // SVG Animation
//     // -----------------------------------
//
//     var chart1 = new Chartist.Line('#ct-line3', {
//       labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
//       series: [
//         [1, 5, 2, 5, 4, 3],
//         [2, 3, 4, 8, 1, 2],
//         [5, 4, 3, 2, 1, 0.5]
//       ]
//     }, {
//       low: 0,
//       showArea: true,
//       showPoint: false,
//       fullWidth: true,
//       height: 300
//     });
//
//     chart1.on('draw', function(data) {
//       if(data.type === 'line' || data.type === 'area') {
//         data.element.animate({
//           d: {
//             begin: 2000 * data.index,
//             dur: 2000,
//             from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
//             to: data.path.clone().stringify(),
//             easing: Chartist.Svg.Easing.easeOutQuint
//           }
//         });
//       }
//     });
//
//
//     // Slim animation
//     // -----------------------------------
//
//
//     var chart = new Chartist.Line('#ct-line2', {
//       labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
//       series: [
//         [12, 9, 7, 8, 5, 4, 6, 2, 3, 3, 4, 6],
//         [4,  5, 3, 7, 3, 5, 5, 3, 4, 4, 5, 5],
//         [5,  3, 4, 5, 6, 3, 3, 4, 5, 6, 3, 4],
//         [3,  4, 5, 6, 7, 6, 4, 5, 6, 7, 6, 3]
//       ]
//     }, {
//       low: 0,
//       height: 300
//     });
//
//     // Let's put a sequence number aside so we can use it in the event callbacks
//     var seq = 0,
//       delays = 80,
//       durations = 500;
//
//     // Once the chart is fully created we reset the sequence
//     chart.on('created', function() {
//       seq = 0;
//     });
//
//     // On each drawn element by Chartist we use the Chartist.Svg API to trigger SMIL animations
//     chart.on('draw', function(data) {
//       seq++;
//
//       if(data.type === 'line') {
//         // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
//         data.element.animate({
//           opacity: {
//             // The delay when we like to start the animation
//             begin: seq * delays + 1000,
//             // Duration of the animation
//             dur: durations,
//             // The value where the animation should start
//             from: 0,
//             // The value where it should end
//             to: 1
//           }
//         });
//       } else if(data.type === 'label' && data.axis === 'x') {
//         data.element.animate({
//           y: {
//             begin: seq * delays,
//             dur: durations,
//             from: data.y + 100,
//             to: data.y,
//             // We can specify an easing function from Chartist.Svg.Easing
//             easing: 'easeOutQuart'
//           }
//         });
//       } else if(data.type === 'label' && data.axis === 'y') {
//         data.element.animate({
//           x: {
//             begin: seq * delays,
//             dur: durations,
//             from: data.x - 100,
//             to: data.x,
//             easing: 'easeOutQuart'
//           }
//         });
//       } else if(data.type === 'point') {
//         data.element.animate({
//           x1: {
//             begin: seq * delays,
//             dur: durations,
//             from: data.x - 10,
//             to: data.x,
//             easing: 'easeOutQuart'
//           },
//           x2: {
//             begin: seq * delays,
//             dur: durations,
//             from: data.x - 10,
//             to: data.x,
//             easing: 'easeOutQuart'
//           },
//           opacity: {
//             begin: seq * delays,
//             dur: durations,
//             from: 0,
//             to: 1,
//             easing: 'easeOutQuart'
//           }
//         });
//       } else if(data.type === 'grid') {
//         // Using data.axis we get x or y which we can use to construct our animation definition objects
//         var pos1Animation = {
//           begin: seq * delays,
//           dur: durations,
//           from: data[data.axis.units.pos + '1'] - 30,
//           to: data[data.axis.units.pos + '1'],
//           easing: 'easeOutQuart'
//         };
//
//         var pos2Animation = {
//           begin: seq * delays,
//           dur: durations,
//           from: data[data.axis.units.pos + '2'] - 100,
//           to: data[data.axis.units.pos + '2'],
//           easing: 'easeOutQuart'
//         };
//
//         var animations = {};
//         animations[data.axis.units.pos + '1'] = pos1Animation;
//         animations[data.axis.units.pos + '2'] = pos2Animation;
//         animations['opacity'] = {
//           begin: seq * delays,
//           dur: durations,
//           from: 0,
//           to: 1,
//           easing: 'easeOutQuart'
//         };
//
//         data.element.animate(animations);
//       }
//     });
//
//     // For the sake of the example we update the chart every time it's created with a delay of 10 seconds
//     chart.on('created', function() {
//       if(window.__exampleAnimateTimeout) {
//         clearTimeout(window.__exampleAnimateTimeout);
//         window.__exampleAnimateTimeout = null;
//       }
//       window.__exampleAnimateTimeout = setTimeout(chart.update.bind(chart), 12000);
//     });
//
//
//   });
//
// })(window, document, window.jQuery);

// CLASSYLOADER
// ----------------------------------- 

(function(window, document, $, undefined){

  $(function(){

    var $scroller       = $(window),
        inViewFlagClass = 'js-is-in-view'; // a classname to detect when a chart has been triggered after scroll

    $('[data-classyloader]').each(initClassyLoader);
    
    function initClassyLoader() {
    
      var $element = $(this),
          options  = $element.data();
      
      // At lease we need a data-percentage attribute
      if(options) {
        if( options.triggerInView ) {

          $scroller.scroll(function() {
            checkLoaderInVIew($element, options);
          });
          // if the element starts already in view
          checkLoaderInVIew($element, options);
        }
        else
          startLoader($element, options);
      }
    }
    function checkLoaderInVIew(element, options) {
      var offset = -20;
      if( ! element.hasClass(inViewFlagClass) &&
          $.Utils.isInView(element, {topoffset: offset}) ) {
        startLoader(element, options);
      }
    }
    function startLoader(element, options) {
      element.ClassyLoader(options).addClass(inViewFlagClass);
    }

  });

})(window, document, window.jQuery);

/**=========================================================
 * Module: clear-storage.js
 * Removes a key from the browser storage via element click
 =========================================================*/

(function($, window, document){
  'use strict';

  var Selector = '[data-reset-key]';

  $(document).on('click', Selector, function (e) {
      e.preventDefault();
      var key = $(this).data('resetKey');
      
      if(key) {
        $.localStorage.remove(key);
        // reload the page
        window.location.reload();
      }
      else {
        $.error('No storage key specified for reset.');
      }
  });

}(jQuery, window, document));

// Color picker
// -----------------------------------

(function(window, document, $, undefined){

  $(function(){

    if(!$.fn.colorpicker) return;

    $('.demo-colorpicker').colorpicker();

    $('#demo_selectors').colorpicker({
      colorSelectors: {
        'default': '#777777',
        'primary': APP_COLORS['primary'],
        'success': APP_COLORS['success'],
        'info':    APP_COLORS['info'],
        'warning': APP_COLORS['warning'],
        'danger':  APP_COLORS['danger']
      }
    });

  });

})(window, document, window.jQuery);

// GLOBAL CONSTANTS
// ----------------------------------- 


(function(window, document, $, undefined){

  window.APP_COLORS = {
    'primary':                '#5d9cec',
    'success':                '#27c24c',
    'info':                   '#23b7e5',
    'warning':                '#ff902b',
    'danger':                 '#f05050',
    'inverse':                '#131e26',
    'green':                  '#37bc9b',
    'pink':                   '#f532e5',
    'purple':                 '#7266ba',
    'dark':                   '#3a3f51',
    'yellow':                 '#fad732',
    'gray-darker':            '#232735',
    'gray-dark':              '#3a3f51',
    'gray':                   '#dde6e9',
    'gray-light':             '#e4eaec',
    'gray-lighter':           '#edf1f2'
  };
  
  window.APP_MEDIAQUERY = {
    'desktopLG':             1200,
    'desktop':                992,
    'tablet':                 768,
    'mobile':                 480
  };

})(window, document, window.jQuery);


// MARKDOWN DOCS
// ----------------------------------- 


(function(window, document, $, undefined){

  $(function(){

    $('.flatdoc').each(function(){

      Flatdoc.run({
        
        fetcher: Flatdoc.file('documentation/readme.md'),

        // Setup custom element selectors (markup validates)
        root:    '.flatdoc',
        menu:    '.flatdoc-menu',
        title:   '.flatdoc-title',
        content: '.flatdoc-content'

      });

    });


  });

})(window, document, window.jQuery);

// FULLSCREEN
// -----------------------------------

(function(window, document, $, undefined){

  if ( typeof screenfull === 'undefined' ) return;

  $(function(){

    var $doc = $(document);
    var $fsToggler = $('[data-toggle-fullscreen]');
    // Not supported under IE
    var ua = window.navigator.userAgent;
    if( ua.indexOf("MSIE ") > 0 || !!ua.match(/Trident.*rv\:11\./) ) {
      $fsToggler.addClass('hide');
    }

    if ( ! $fsToggler.is(':visible') ) // hidden on mobiles or IE
      return;

    $fsToggler.on('click', function (e) {

        e.preventDefault();

        if (screenfull.enabled) {

          screenfull.toggle();

          // Switch icon indicator
          toggleFSIcon( $fsToggler );

        } else {
          console.log('Fullscreen not enabled');
        }
    });

    if ( screenfull.raw && screenfull.raw.fullscreenchange)
      $doc.on(screenfull.raw.fullscreenchange, function () {
          toggleFSIcon($fsToggler);
      });

    function toggleFSIcon($element) {
      if(screenfull.isFullscreen)
        $element.children('em').removeClass('fa-expand').addClass('fa-compress');
      else
        $element.children('em').removeClass('fa-compress').addClass('fa-expand');
    }

  });

})(window, document, window.jQuery);

/**=========================================================
 * Module: gmap.js
 * Init Google Map plugin
 =========================================================*/

(function($, window, document){
  'use strict';

  // -------------------------
  // Map Style definition
  // -------------------------

  // Custom core styles
  // Get more styles from http://snazzymaps.com/style/29/light-monochrome
  // - Just replace and assign to 'MapStyles' the new style array
  var MapStyles = [{featureType:'water',stylers:[{visibility:'on'},{color:'#bdd1f9'}]},{featureType:'all',elementType:'labels.text.fill',stylers:[{color:'#334165'}]},{featureType:'landscape',stylers:[{color:'#e9ebf1'}]},{featureType:'road.highway',elementType:'geometry',stylers:[{color:'#c5c6c6'}]},{featureType:'road.arterial',elementType:'geometry',stylers:[{color:'#fff'}]},{featureType:'road.local',elementType:'geometry',stylers:[{color:'#fff'}]},{featureType:'transit',elementType:'geometry',stylers:[{color:'#d8dbe0'}]},{featureType:'poi',elementType:'geometry',stylers:[{color:'#cfd5e0'}]},{featureType:'administrative',stylers:[{visibility:'on'},{lightness:33}]},{featureType:'poi.park',elementType:'labels',stylers:[{visibility:'on'},{lightness:20}]},{featureType:'road',stylers:[{color:'#d8dbe0',lightness:20}]}];


  // -------------------------
  // Custom Script
  // -------------------------

  var mapSelector = '[data-gmap]';

  if($.fn.gMap) {
      var gMapRefs = [];
      
      $(mapSelector).each(function(){
          
          var $this   = $(this),
              addresses = $this.data('address') && $this.data('address').split(';'),
              titles    = $this.data('title') && $this.data('title').split(';'),
              zoom      = $this.data('zoom') || 14,
              maptype   = $this.data('maptype') || 'ROADMAP', // or 'TERRAIN'
              markers   = [];

          if(addresses) {
            for(var a in addresses)  {
                if(typeof addresses[a] == 'string') {
                    markers.push({
                        address:  addresses[a],
                        html:     (titles && titles[a]) || '',
                        popup:    true   /* Always popup */
                      });
                }
            }

            var options = {
                controls: {
                       panControl:         true,
                       zoomControl:        true,
                       mapTypeControl:     true,
                       scaleControl:       true,
                       streetViewControl:  true,
                       overviewMapControl: true
                   },
                scrollwheel: false,
                maptype: maptype,
                markers: markers,
                zoom: zoom
                // More options https://github.com/marioestrada/jQuery-gMap
            };

            var gMap = $this.gMap(options);

            var ref = gMap.data('gMap.reference');
            // save in the map references list
            gMapRefs.push(ref);

            // set the styles
            if($this.data('styled') !== undefined) {
              
              ref.setOptions({
                styles: MapStyles
              });

            }
          }

      }); //each
  }

}(jQuery, window, document));

/**=========================================================
 * Module: Image Cropper
 =========================================================*/

(function(window, document, $, undefined) {

    $(function() {

        if(! $.fn.cropper ) return;

        var $image = $('.img-container > img'),
            $dataX = $('#dataX'),
            $dataY = $('#dataY'),
            $dataHeight = $('#dataHeight'),
            $dataWidth = $('#dataWidth'),
            $dataRotate = $('#dataRotate'),
            options = {
                // data: {
                //   x: 420,
                //   y: 60,
                //   width: 640,
                //   height: 360
                // },
                // strict: false,
                // responsive: false,
                // checkImageOrigin: false

                // modal: false,
                // guides: false,
                // highlight: false,
                // background: false,

                // autoCrop: false,
                // autoCropArea: 0.5,
                // dragCrop: false,
                // movable: false,
                // rotatable: false,
                // zoomable: false,
                // touchDragZoom: false,
                // mouseWheelZoom: false,
                // cropBoxMovable: false,
                // cropBoxResizable: false,
                // doubleClickToggle: false,

                // minCanvasWidth: 320,
                // minCanvasHeight: 180,
                // minCropBoxWidth: 160,
                // minCropBoxHeight: 90,
                // minContainerWidth: 320,
                // minContainerHeight: 180,

                // build: null,
                // built: null,
                // dragstart: null,
                // dragmove: null,
                // dragend: null,
                // zoomin: null,
                // zoomout: null,

                aspectRatio: 16 / 9,
                preview: '.img-preview',
                crop: function(data) {
                    $dataX.val(Math.round(data.x));
                    $dataY.val(Math.round(data.y));
                    $dataHeight.val(Math.round(data.height));
                    $dataWidth.val(Math.round(data.width));
                    $dataRotate.val(Math.round(data.rotate));
                }
            };

        $image.on({
            'build.cropper': function(e) {
                console.log(e.type);
            },
            'built.cropper': function(e) {
                console.log(e.type);
            },
            'dragstart.cropper': function(e) {
                console.log(e.type, e.dragType);
            },
            'dragmove.cropper': function(e) {
                console.log(e.type, e.dragType);
            },
            'dragend.cropper': function(e) {
                console.log(e.type, e.dragType);
            },
            'zoomin.cropper': function(e) {
                console.log(e.type);
            },
            'zoomout.cropper': function(e) {
                console.log(e.type);
            },
            'change.cropper': function(e) {
                console.log(e.type);
            }
        }).cropper(options);


        // Methods
        $(document.body).on('click', '[data-method]', function() {
            var data = $(this).data(),
                $target,
                result;

            if (!$image.data('cropper')) {
                return;
            }

            if (data.method) {
                data = $.extend({}, data); // Clone a new one

                if (typeof data.target !== 'undefined') {
                    $target = $(data.target);

                    if (typeof data.option === 'undefined') {
                        try {
                            data.option = JSON.parse($target.val());
                        } catch (e) {
                            console.log(e.message);
                        }
                    }
                }

                result = $image.cropper(data.method, data.option);

                if (data.method === 'getCroppedCanvas') {
                    $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);
                }

                if ($.isPlainObject(result) && $target) {
                    try {
                        $target.val(JSON.stringify(result));
                    } catch (e) {
                        console.log(e.message);
                    }
                }

            }
        }).on('keydown', function(e) {

            if (!$image.data('cropper')) {
                return;
            }

            switch (e.which) {
                case 37:
                    e.preventDefault();
                    $image.cropper('move', -1, 0);
                    break;

                case 38:
                    e.preventDefault();
                    $image.cropper('move', 0, -1);
                    break;

                case 39:
                    e.preventDefault();
                    $image.cropper('move', 1, 0);
                    break;

                case 40:
                    e.preventDefault();
                    $image.cropper('move', 0, 1);
                    break;
            }

        });


        // Import image
        var $inputImage = $('#inputImage'),
            URL = window.URL || window.webkitURL,
            blobURL;

        if (URL) {
            $inputImage.change(function() {
                var files = this.files,
                    file;

                if (!$image.data('cropper')) {
                    return;
                }

                if (files && files.length) {
                    file = files[0];

                    if (/^image\/\w+$/.test(file.type)) {
                        blobURL = URL.createObjectURL(file);
                        $image.one('built.cropper', function() {
                            URL.revokeObjectURL(blobURL); // Revoke when load complete
                        }).cropper('reset').cropper('replace', blobURL);
                        $inputImage.val('');
                    } else {
                        alert('Please choose an image file.');
                    }
                }
            });
        } else {
            $inputImage.parent().remove();
        }


        // Options
        $('.docs-options :checkbox').on('change', function() {
            var $this = $(this);

            if (!$image.data('cropper')) {
                return;
            }

            options[$this.val()] = $this.prop('checked');
            $image.cropper('destroy').cropper(options);
        });


        // Tooltips
        $('[data-toggle="tooltip"]').tooltip();

    });

})(window, document, window.jQuery);
// LOAD CUSTOM CSS
// -----------------------------------

(function(window, document, $, undefined) {

    $(function() {

        $('[data-load-css]').on('click', function(e) {

            var element = $(this);

            if (element.is('a'))
                e.preventDefault();

            var uri = element.data('loadCss'),
                link;

            if (uri) {
                link = createLink(uri);
                if (!link) {
                    $.error('Error creating stylesheet link element.');
                }
            } else {
                $.error('No stylesheet location defined.');
            }

        });
    });

    function createLink(uri) {
        var linkId = 'autoloaded-stylesheet',
            oldLink = $('#' + linkId).attr('id', linkId + '-old');

        $('head').append($('<link/>').attr({
            'id': linkId,
            'rel': 'stylesheet',
            'href': uri
        }));

        if (oldLink.length) {
            oldLink.remove();
        }

        return $('#' + linkId);
    }


})(window, document, window.jQuery);

// TRANSLATION
// ----------------------------------- 

(function(window, document, $, undefined){

  var preferredLang = 'en';
  var pathPrefix    = 'i18n'; // folder of json files
  var packName      = 'site';
  var storageKey    = 'jq-appLang';

  $(function(){

    if ( ! $.fn.localize ) return;

    // detect saved language or use default
    var currLang = $.localStorage.get(storageKey) || preferredLang;
    // set initial options
    var opts = {
        language: currLang,
        pathPrefix: pathPrefix,
        callback: function(data, defaultCallback){
          $.localStorage.set(storageKey, currLang); // save the language
          defaultCallback(data);
        }
      };

    // Set initial language
    setLanguage(opts);

    // Listen for changes
    $('[data-set-lang]').on('click', function(){

      currLang = $(this).data('setLang');

      if ( currLang ) {
        
        opts.language = currLang;

        setLanguage(opts);

        activateDropdown($(this));
      }

    });
    

    function setLanguage(options) {
      $("[data-localize]").localize(packName, options);
    }

    // Set the current clicked text as the active dropdown text
    function activateDropdown(elem) {
      var menu = elem.parents('.dropdown-menu');
      if ( menu.length ) {
        var toggle = menu.prev('button, a');
        toggle.text ( elem.text() );
      }
    }

  });

})(window, document, window.jQuery);

// JVECTOR MAP 
// ----------------------------------- 

(function(window, document, $, undefined){

  window.defaultColors = {
      markerColor:  '#23b7e5',      // the marker points
      bgColor:      'transparent',      // the background
      scaleColors:  ['#878c9a'],    // the color of the region in the serie
      regionFill:   '#bbbec6'       // the base region color
  };

  window.VectorMap = function(element, seriesData, markersData) {
    
    if ( ! element || !element.length) return;

    var attrs       = element.data(),
        mapHeight   = attrs.height || '300',
        options     = {
          markerColor:  attrs.markerColor  || defaultColors.markerColor,
          bgColor:      attrs.bgColor      || defaultColors.bgColor,
          scale:        attrs.scale        || 1,
          scaleColors:  attrs.scaleColors  || defaultColors.scaleColors,
          regionFill:   attrs.regionFill   || defaultColors.regionFill,
          mapName:      attrs.mapName      || 'world_mill_en'
        };
    
    element.css('height', mapHeight);
    
    init( element , options, seriesData, markersData);
    
    function init($element, opts, series, markers) {
        
        $element.vectorMap({
          map:             opts.mapName,
          backgroundColor: opts.bgColor,
          zoomMin:         1,
          zoomMax:         8,
          zoomOnScroll:    false,
          regionStyle: {
            initial: {
              'fill':           opts.regionFill,
              'fill-opacity':   1,
              'stroke':         'none',
              'stroke-width':   1.5,
              'stroke-opacity': 1
            },
            hover: {
              'fill-opacity': 0.8
            },
            selected: {
              fill: 'blue'
            },
            selectedHover: {
            }
          },
          focusOn:{ x:0.4, y:0.6, scale: opts.scale},
          markerStyle: {
            initial: {
              fill: opts.markerColor,
              stroke: opts.markerColor
            }
          },
          onRegionLabelShow: function(e, el, code) {
            if ( series && series[code] )
              el.html(el.html() + ': ' + series[code] + ' visitors');
          },
          markers: markers,
          series: {
              regions: [{
                  values: series,
                  scale: opts.scaleColors,
                  normalizeFunction: 'polynomial'
              }]
          },
        });

      }// end init
  };

})(window, document, window.jQuery);

// Morris
// ----------------------------------- 

(function(window, document, $, undefined){

  $(function(){

    if ( typeof Morris === 'undefined' ) return;

    var chartdata = [
        { y: "2006", a: 100, b: 90 },
        { y: "2007", a: 75,  b: 65 },
        { y: "2008", a: 50,  b: 40 },
        { y: "2009", a: 75,  b: 65 },
        { y: "2010", a: 50,  b: 40 },
        { y: "2011", a: 75,  b: 65 },
        { y: "2012", a: 100, b: 90 }
    ];

    var donutdata = [
      {label: "Download Sales", value: 12},
      {label: "In-Store Sales",value: 30},
      {label: "Mail-Order Sales", value: 20}
    ];

    // Line Chart
    // ----------------------------------- 

    new Morris.Line({
      element: 'morris-line',
      data: chartdata,
      xkey: 'y',
      ykeys: ["a", "b"],
      labels: ["Serie A", "Serie B"],
      lineColors: ["#31C0BE", "#7a92a3"],
      resize: true
    });

    // Donut Chart
    // ----------------------------------- 
    new Morris.Donut({
      element: 'morris-donut',
      data: donutdata,
      colors: [ '#f05050', '#fad732', '#ff902b' ],
      resize: true
    });

    // Bar Chart
    // ----------------------------------- 
    new Morris.Bar({
      element: 'morris-bar',
      data: chartdata,
      xkey: 'y',
      ykeys: ["a", "b"],
      labels: ["Series A", "Series B"],
      xLabelMargin: 2,
      barColors: [ '#23b7e5', '#f05050' ],
      resize: true
    });

    // Area Chart
    // ----------------------------------- 
    new Morris.Area({
      element: 'morris-area',
      data: chartdata,
      xkey: 'y',
      ykeys: ["a", "b"],
      labels: ["Serie A", "Serie B"],
      lineColors: [ '#7266ba', '#23b7e5' ],
      resize: true
    });

  });

})(window, document, window.jQuery);

// NAVBAR SEARCH
// -----------------------------------


(function(window, document, $, undefined){

  $(function(){

    var navSearch = new navbarSearchInput();

    // Open search input
    var $searchOpen = $('[data-search-open]');

    $searchOpen
      .on('click', function (e) { e.preventDefault(); e.stopPropagation(); })
      .on('click', navSearch.toggle);

    // Close search input
    var $searchDismiss = $('[data-search-dismiss]');
    var inputSelector = '.navbar-form input[type="text"]';

    $(inputSelector)
      .on('click', function (e) { e.preventDefault(); e.stopPropagation(); })
      .on('keyup', function(e) {
        if (e.keyCode == 27) // ESC
          navSearch.dismiss();
      });

    // click anywhere closes the search
    $(document).on('click', navSearch.dismiss);
    // dismissable options
    $searchDismiss
      .on('click', function (e) { e.stopPropagation(); })
      .on('click', navSearch.dismiss);

  });

  var navbarSearchInput = function() {
    var navbarFormSelector = 'form.navbar-form';
    return {
      toggle: function() {

        var navbarForm = $(navbarFormSelector);

        navbarForm.toggleClass('open');

        var isOpen = navbarForm.hasClass('open');

        navbarForm.find('input')[isOpen ? 'focus' : 'blur']();

      },

      dismiss: function() {
        $(navbarFormSelector)
          .removeClass('open')      // Close control
          .find('input[type="text"]').blur() // remove focus
          // .val('')                    // Empty input
          ;
      }
    };

  }

})(window, document, window.jQuery);

/**=========================================================
 * Module: notify.js
 * Create toggleable notifications that fade out automatically.
 * Based on Notify addon from UIKit (http://getuikit.com/docs/addons_notify.html)
 * [data-toggle="notify"]
 * [data-options="options in json format" ]
 =========================================================*/

(function($, window, document){
  'use strict';

  var Selector = '[data-notify]',
      autoloadSelector = '[data-onload]',
      doc = $(document);


  $(function() {

    $(Selector).each(function(){

      var $this  = $(this),
          onload = $this.data('onload');

      if(onload !== undefined) {
        setTimeout(function(){
          notifyNow($this);
        }, 800);
      }

      $this.on('click', function (e) {
        e.preventDefault();
        notifyNow($this);
      });

    });

  });

  function notifyNow($element) {
      var message = $element.data('message'),
          options = $element.data('options');

      if(!message)
        $.error('Notify: No message specified');

      $.notify(message, options || {});
  }


}(jQuery, window, document));


/**
 * Notify Addon definition as jQuery plugin
 * Adapted version to work with Bootstrap classes
 * More information http://getuikit.com/docs/addons_notify.html
 */

(function($, window, document){

    var containers = {},
        messages   = {},

        notify     =  function(options){

            if ($.type(options) == 'string') {
                options = { message: options };
            }

            if (arguments[1]) {
                options = $.extend(options, $.type(arguments[1]) == 'string' ? {status:arguments[1]} : arguments[1]);
            }

            return (new Message(options)).show();
        },
        closeAll  = function(group, instantly){
            if(group) {
                for(var id in messages) { if(group===messages[id].group) messages[id].close(instantly); }
            } else {
                for(var id in messages) { messages[id].close(instantly); }
            }
        };

    var Message = function(options){

        var $this = this;

        this.options = $.extend({}, Message.defaults, options);

        this.uuid    = "ID"+(new Date().getTime())+"RAND"+(Math.ceil(Math.random() * 100000));
        this.element = $([
            // alert-dismissable enables bs close icon
            '<div class="uk-notify-message alert-dismissable">',
                '<a class="close">&times;</a>',
                '<div>'+this.options.message+'</div>',
            '</div>'

        ].join('')).data("notifyMessage", this);

        // status
        if (this.options.status) {
            this.element.addClass('alert alert-'+this.options.status);
            this.currentstatus = this.options.status;
        }

        this.group = this.options.group;

        messages[this.uuid] = this;

        if(!containers[this.options.pos]) {
            containers[this.options.pos] = $('<div class="uk-notify uk-notify-'+this.options.pos+'"></div>').appendTo('body').on("click", ".uk-notify-message", function(){
                $(this).data("notifyMessage").close();
            });
        }
    };


    $.extend(Message.prototype, {

        uuid: false,
        element: false,
        timout: false,
        currentstatus: "",
        group: false,

        show: function() {

            if (this.element.is(":visible")) return;

            var $this = this;

            containers[this.options.pos].show().prepend(this.element);

            var marginbottom = parseInt(this.element.css("margin-bottom"), 10);

            this.element.css({"opacity":0, "margin-top": -1*this.element.outerHeight(), "margin-bottom":0}).animate({"opacity":1, "margin-top": 0, "margin-bottom":marginbottom}, function(){

                if ($this.options.timeout) {

                    var closefn = function(){ $this.close(); };

                    $this.timeout = setTimeout(closefn, $this.options.timeout);

                    $this.element.hover(
                        function() { clearTimeout($this.timeout); },
                        function() { $this.timeout = setTimeout(closefn, $this.options.timeout);  }
                    );
                }

            });

            return this;
        },

        close: function(instantly) {

            var $this    = this,
                finalize = function(){
                    $this.element.remove();

                    if(!containers[$this.options.pos].children().length) {
                        containers[$this.options.pos].hide();
                    }

                    delete messages[$this.uuid];
                };

            if(this.timeout) clearTimeout(this.timeout);

            if(instantly) {
                finalize();
            } else {
                this.element.animate({"opacity":0, "margin-top": -1* this.element.outerHeight(), "margin-bottom":0}, function(){
                    finalize();
                });
            }
        },

        content: function(html){

            var container = this.element.find(">div");

            if(!html) {
                return container.html();
            }

            container.html(html);

            return this;
        },

        status: function(status) {

            if(!status) {
                return this.currentstatus;
            }

            this.element.removeClass('alert alert-'+this.currentstatus).addClass('alert alert-'+status);

            this.currentstatus = status;

            return this;
        }
    });

    Message.defaults = {
        message: "",
        status: "normal",
        timeout: 2000,
        group: null,
        pos: 'top-center'
    };


    $["notify"]          = notify;
    $["notify"].message  = Message;
    $["notify"].closeAll = closeAll;

    return notify;

}(jQuery, window, document));

// NOW TIMER
// ----------------------------------- 

(function(window, document, $, undefined){

  $(function(){

    $('[data-now]').each(function(){
      var element = $(this),
          format = element.data('format');

      function updateTime() {
        var dt = moment( new Date() ).format(format);
        element.text(dt);
      }

      updateTime();
      setInterval(updateTime, 1000);
    
    });
  });

})(window, document, window.jQuery);

/**=========================================================
 * Module: panel-perform.js
 * Dismiss panels
 * [data-perform="panel-dismiss"]
 *
 * Requires animo.js
 =========================================================*/
(function($, window, document){
  'use strict';
  
  var panelSelector = '[data-perform="panel-dismiss"]',
      removeEvent   = 'panel-remove',
      removedEvent  = 'panel-removed';

  $(document).on('click', panelSelector, function () {
    
    // find the first parent panel
    var parent = $(this).closest('.panel');

    if($.support.animation) {
      parent.animo({animation: 'bounceOut'}, removeElement);
    }
    else removeElement();

    function removeElement() {
      // Trigger the event and finally remove the element
      $.when(parent.trigger(removeEvent, [parent]))
       .done(destroyPanel);
    }

    function destroyPanel() {
      var col = parent.parent();
      parent.remove();
      
      // remove the parent if it is a row and is empty and not a sortable (portlet)
      col
        .addClass('removed')
        .trigger(removedEvent) // An event to catch when the panel has been removed from DOM
        .filter(function() {
        var el = $(this);
        return (el.is('[class*="col-"]:not(.sortable)') && el.children('*').length === 0);
      }).remove();

    }

  });

}(jQuery, window, document));
/**=========================================================
 * Module: panel-tools.js
 * Dismiss panels
 * [data-tool="panel-dismiss"]
 *
 * Requires animo.js
 =========================================================*/
(function($, window, document){
  'use strict';
  
  var panelSelector = '[data-tool="panel-dismiss"]',
      removeEvent   = 'panel.remove',
      removedEvent  = 'panel.removed';

  $(document).on('click', panelSelector, function () {
    
    // find the first parent panel
    var parent = $(this).closest('.panel');
    var deferred = new $.Deferred();

    // Trigger the event and finally remove the element
    parent.trigger(removeEvent, [parent, deferred]);
    // needs resolve() to be called
    deferred.done(removeElement);

    function removeElement() {
      if($.support.animation) {
        parent.animo({animation: 'bounceOut'}, destroyPanel);
      }
      else destroyPanel();
    }

    function destroyPanel() {
      var col = parent.parent();
      
      $.when(parent.trigger(removedEvent, [parent]))
       .done(function(){
          parent.remove();
          // remove the parent if it is a row and is empty and not a sortable (portlet)
          col
            .trigger(removedEvent) // An event to catch when the panel has been removed from DOM
            .filter(function() {
            var el = $(this);
            return (el.is('[class*="col-"]:not(.sortable)') && el.children('*').length === 0);
          }).remove();
       });

      

    }

  });

}(jQuery, window, document));


/**
 * Collapse panels
 * [data-tool="panel-collapse"]
 *
 * Also uses browser storage to keep track
 * of panels collapsed state
 */
(function($, window, document) {
  'use strict';
  var panelSelector = '[data-tool="panel-collapse"]',
      storageKeyName = 'jq-panelState';

  // Prepare the panel to be collapsable and its events
  $(panelSelector).each(function() {
    // find the first parent panel
    var $this        = $(this),
        parent       = $this.closest('.panel'),
        wrapper      = parent.find('.panel-wrapper'),
        collapseOpts = {toggle: false},
        iconElement  = $this.children('em'),
        panelId      = parent.attr('id');
    
    // if wrapper not added, add it
    // we need a wrapper to avoid jumping due to the paddings
    if( ! wrapper.length) {
      wrapper =
        parent.children('.panel-heading').nextAll() //find('.panel-body, .panel-footer')
          .wrapAll('<div/>')
          .parent()
          .addClass('panel-wrapper');
      collapseOpts = {};
    }

    // Init collapse and bind events to switch icons
    wrapper
      .collapse(collapseOpts)
      .on('hide.bs.collapse', function() {
        setIconHide( iconElement );
        savePanelState( panelId, 'hide' );
        wrapper.prev('.panel-heading').addClass('panel-heading-collapsed');
      })
      .on('show.bs.collapse', function() {
        setIconShow( iconElement );
        //savePanelState( panelId, 'show' );
        savePanelState( panelId, 'hide' );
        wrapper.prev('.panel-heading').removeClass('panel-heading-collapsed');
      });

    // Load the saved state if exists
    var currentState = loadPanelState( panelId );
    currentState = 'hide';
    if(currentState) {
      setTimeout(function() { wrapper.collapse( currentState ); }, 0);
      savePanelState( panelId, currentState );
    }

  });

  // finally catch clicks to toggle panel collapse
  $(document).on('click', panelSelector, function () {
    
    var parent = $(this).closest('.panel');
    var wrapper = parent.find('.panel-wrapper');

    wrapper.collapse('toggle');

  });

  /////////////////////////////////////////////
  // Common use functions for panel collapse //
  /////////////////////////////////////////////
  function setIconShow(iconEl) {
    iconEl.removeClass('fa-plus').addClass('fa-minus');
  }

  function setIconHide(iconEl) {
    iconEl.removeClass('fa-minus').addClass('fa-plus');
  }

  function savePanelState(id, state) {
    var data = $.localStorage.get(storageKeyName);
    if(!data) { data = {}; }
    data[id] = state;
    $.localStorage.set(storageKeyName, data);
  }

  function loadPanelState(id) {
    var data = $.localStorage.get(storageKeyName);
    if(data) {
      return data[id] || false;
    }
  }


}(jQuery, window, document));


/**
 * Refresh panels
 * [data-tool="panel-refresh"]
 * [data-spinner="standard"]
 */
(function($, window, document){
  'use strict';
  var panelSelector  = '[data-tool="panel-refresh"]',
      refreshEvent   = 'panel.refresh',
      whirlClass     = 'whirl',
      defaultSpinner = 'standard';

  // method to clear the spinner when done
  function removeSpinner(){
    this.removeClass(whirlClass);
  }

  // catch clicks to toggle panel refresh
  $(document).on('click', panelSelector, function () {
      var $this   = $(this),
          panel   = $this.parents('.panel').eq(0),
          spinner = $this.data('spinner') || defaultSpinner
          ;

      // start showing the spinner
      panel.addClass(whirlClass + ' ' + spinner);

      // attach as public method
      panel.removeSpinner = removeSpinner;

      // Trigger the event and send the panel object
      $this.trigger(refreshEvent, [panel]);

  });


}(jQuery, window, document));

/**=========================================================
 * Module: play-animation.js
 * Provides a simple way to run animation with a trigger
 * Targeted elements must have 
 *   [data-animate"]
 *   [data-target="Target element affected by the animation"] 
 *   [data-play="Animation name (http://daneden.github.io/animate.css/)"]
 *
 * Requires animo.js
 =========================================================*/
 
(function($, window, document){
  'use strict';

  var Selector = '[data-animate]';

  $(function() {
    
    var $scroller = $(window).add('body, .wrapper');

    // Parse animations params and attach trigger to scroll
    $(Selector).each(function() {
      var $this     = $(this),
          offset    = $this.data('offset'),
          delay     = $this.data('delay')     || 100, // milliseconds
          animation = $this.data('play')      || 'bounce';
      
      if(typeof offset !== 'undefined') {
        
        // test if the element starts visible
        testAnimation($this);
        // test on scroll
        $scroller.scroll(function(){
          testAnimation($this);
        });

      }

      // Test an element visibilty and trigger the given animation
      function testAnimation(element) {
          if ( !element.hasClass('anim-running') &&
              $.Utils.isInView(element, {topoffset: offset})) {
          element
            .addClass('anim-running');

          setTimeout(function() {
            element
              .addClass('anim-done')
              .animo( { animation: animation, duration: 0.7} );
          }, delay);

        }
      }

    });

    // Run click triggered animations
    $(document).on('click', Selector, function() {

      var $this     = $(this),
          targetSel = $this.data('target'),
          animation = $this.data('play') || 'bounce',
          target    = $(targetSel);

      if(target && target.length) {
        target.animo( { animation: animation } );
      }
      
    });

  });

}(jQuery, window, document));

/**=========================================================
 * Module: portlet.js
 * Drag and drop any panel to change its position
 * The Selector should could be applied to any object that contains
 * panel, so .col-* element are ideal.
 =========================================================*/

(function($, window, document){
  'use strict';

  // Component is optional
  if(!$.fn.sortable) return;

  var Selector = '[data-toggle="portlet"]',
      storageKeyName = 'jq-portletState';

  $(function(){

    $( Selector ).sortable({
      connectWith:          Selector,
      items:                'div.panel',
      handle:               '.portlet-handler',
      opacity:              0.7,
      placeholder:          'portlet box-placeholder',
      cancel:               '.portlet-cancel',
      forcePlaceholderSize: true,
      iframeFix:            false,
      tolerance:            'pointer',
      helper:               'original',
      revert:               200,
      forceHelperSize:      true,
      update:               savePortletOrder,
      create:               loadPortletOrder
    })
    // optionally disables mouse selection
    //.disableSelection()
    ;

  });

  function savePortletOrder(event, ui) {
    
    var data = $.localStorage.get(storageKeyName);
    
    if(!data) { data = {}; }

    data[this.id] = $(this).sortable('toArray');

    if(data) {
      $.localStorage.set(storageKeyName, data);
    }
    
  }

  function loadPortletOrder() {
    
    var data = $.localStorage.get(storageKeyName);

    if(data) {
      
      var porletId = this.id,
          panels   = data[porletId];

      if(panels) {
        var portlet = $('#'+porletId);
        
        $.each(panels, function(index, value) {
           $('#'+value).appendTo(portlet);
        });
      }

    }

  }

}(jQuery, window, document));


// Rickshaw
// ----------------------------------- 

(function(window, document, $, undefined){

  $(function(){
    
    if ( typeof Rickshaw === 'undefined' ) return;

    var seriesData = [ [], [], [] ];
    var random = new Rickshaw.Fixtures.RandomData(150);

    for (var i = 0; i < 150; i++) {
      random.addData(seriesData);
    }

    var series1 = [
      {
        color: "#c05020",
        data: seriesData[0],
        name: 'New York'
      }, {
        color: "#30c020",
        data: seriesData[1],
        name: 'London'
      }, {
        color: "#6060c0",
        data: seriesData[2],
        name: 'Tokyo'
      }
    ];

    var graph1 = new Rickshaw.Graph( {
        element: document.querySelector("#rickshaw1"), 
        series:series1,
        renderer: 'area'
    });
     
    graph1.render();


    // Graph 2
    // ----------------------------------- 

    var graph2 = new Rickshaw.Graph( {
      element: document.querySelector("#rickshaw2"),
      renderer: 'area',
      stroke: true,
      series: [ {
        data: [ { x: 0, y: 40 }, { x: 1, y: 49 }, { x: 2, y: 38 }, { x: 3, y: 30 }, { x: 4, y: 32 } ],
        color: '#f05050'
      }, {
        data: [ { x: 0, y: 40 }, { x: 1, y: 49 }, { x: 2, y: 38 }, { x: 3, y: 30 }, { x: 4, y: 32 } ],
        color: '#fad732'
      } ]
    } );

    graph2.render();

    // Graph 3
    // ----------------------------------- 


    var graph3 = new Rickshaw.Graph({
      element: document.querySelector("#rickshaw3"),
      renderer: 'line',
      series: [{
        data: [ { x: 0, y: 40 }, { x: 1, y: 49 }, { x: 2, y: 38 }, { x: 3, y: 30 }, { x: 4, y: 32 } ],
        color: '#7266ba'
      }, {
        data: [ { x: 0, y: 20 }, { x: 1, y: 24 }, { x: 2, y: 19 }, { x: 3, y: 15 }, { x: 4, y: 16 } ],
        color: '#23b7e5'
      }]
    });
    graph3.render();


    // Graph 4
    // ----------------------------------- 


    var graph4 = new Rickshaw.Graph( {
      element: document.querySelector("#rickshaw4"),
      renderer: 'bar',
      series: [ 
        {
          data: [ { x: 0, y: 40 }, { x: 1, y: 49 }, { x: 2, y: 38 }, { x: 3, y: 30 }, { x: 4, y: 32 } ],
          color: '#fad732'
        }, {
          data: [ { x: 0, y: 20 }, { x: 1, y: 24 }, { x: 2, y: 19 }, { x: 3, y: 15 }, { x: 4, y: 16 } ],
          color: '#ff902b'

      } ]
    } );
    graph4.render();


  });

})(window, document, window.jQuery);

// Select2
// -----------------------------------

(function(window, document, $, undefined){

  $(function(){

    if ( !$.fn.select2 ) return;

    // Select 2

    $('#select2-1').select2({
        theme: 'bootstrap'
    });
    $('#select2-2').select2({
        theme: 'bootstrap'
    });
    $('#select2-3').select2({
        theme: 'bootstrap'
    });
    $('#select2-4').select2({
        placeholder: 'Select a state',
        allowClear: true,
        theme: 'bootstrap'
    });

  });

})(window, document, window.jQuery);


// SIDEBAR
// -----------------------------------


(function(window, document, $, undefined) {

    var $win;
    var $html;
    var $body;
    var $sidebar;
    var mq;

    $(function() {

        $win = $(window);
        $html = $('html');
        $body = $('body');
        $sidebar = $('.sidebar');
        mq = APP_MEDIAQUERY;

        // AUTOCOLLAPSE ITEMS
        // -----------------------------------

        var sidebarCollapse = $sidebar.find('.collapse');
        sidebarCollapse.on('show.bs.collapse', function(event) {

            event.stopPropagation();
            if ($(this).parents('.collapse').length === 0)
                sidebarCollapse.filter('.in').collapse('hide');

        });

        // SIDEBAR ACTIVE STATE
        // -----------------------------------

        // Find current active item
        var currentItem = $('.sidebar .active').parents('li');

        // hover mode don't try to expand active collapse
        if (!useAsideHover())
            currentItem
            .addClass('active') // activate the parent
            .children('.collapse') // find the collapse
            .collapse('show'); // and show it

        // remove this if you use only collapsible sidebar items
        $sidebar.find('li > a + ul').on('show.bs.collapse', function(e) {
            if (useAsideHover()) e.preventDefault();
        });

        // SIDEBAR COLLAPSED ITEM HANDLER
        // -----------------------------------


        var eventName = isTouch() ? 'click' : 'mouseenter';
        var subNav = $();
        $sidebar.on(eventName, '.nav > li', function() {

            if (isSidebarCollapsed() || useAsideHover()) {

                subNav.trigger('mouseleave');
                subNav = toggleMenuItem($(this));

                // Used to detect click and touch events outside the sidebar
                sidebarAddBackdrop();
            }

        });

        var sidebarAnyclickClose = $sidebar.data('sidebarAnyclickClose');

        // Allows to close
        if (typeof sidebarAnyclickClose !== 'undefined') {

            $('.wrapper').on('click.sidebar', function(e) {
                // don't check if sidebar not visible
                if (!$body.hasClass('aside-toggled')) return;

                var $target = $(e.target);
                if (!$target.parents('.aside').length && // if not child of sidebar
                    !$target.is('#user-block-toggle') && // user block toggle anchor
                    !$target.parent().is('#user-block-toggle') // user block toggle icon
                ) {
                    $body.removeClass('aside-toggled');
                }

            });
        }
        
        var maincss = $('#maincss');
        var bscss = $('#bscss');
        $('#chk-rtl').on('change', function() {
            // app rtl check
            maincss.attr('href', this.checked ? 'css/app-rtl.css' : 'css/app.css');
            // bootstrap rtl check
            bscss.attr('href', this.checked ? 'css/bootstrap-rtl.css' : 'css/bootstrap.css');
        });
    });

    function sidebarAddBackdrop() {
        var $backdrop = $('<div/>', {
            'class': 'dropdown-backdrop'
        });
        $backdrop.insertAfter('.aside').on("click mouseenter", function() {
            removeFloatingNav();
        });
    }

    // Open the collapse sidebar submenu items when on touch devices
    // - desktop only opens on hover
    function toggleTouchItem($element) {
        $element
            .siblings('li')
            .removeClass('open')
            .end()
            .toggleClass('open');
    }

    // Handles hover to open items under collapsed menu
    // -----------------------------------
    function toggleMenuItem($listItem) {

        removeFloatingNav();

        var ul = $listItem.children('ul');

        if (!ul.length) return $();
        if ($listItem.hasClass('open')) {
            toggleTouchItem($listItem);
            return $();
        }

        var $aside = $('.aside');
        var $asideInner = $('.aside-inner'); // for top offset calculation
        // float aside uses extra padding on aside
        var mar = parseInt($asideInner.css('padding-top'), 0) + parseInt($aside.css('padding-top'), 0);

        var subNav = ul.clone().appendTo($aside);

        toggleTouchItem($listItem);

        var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
        var vwHeight = $win.height();

        subNav
            .addClass('nav-floating')
            .css({
                position: isFixed() ? 'fixed' : 'absolute',
                top: itemTop,
                bottom: (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
            });

        subNav.on('mouseleave', function() {
            toggleTouchItem($listItem);
            subNav.remove();
        });

        return subNav;
    }

    function removeFloatingNav() {
        $('.sidebar-subnav.nav-floating').remove();
        $('.dropdown-backdrop').remove();
        $('.sidebar li.open').removeClass('open');
    }

    function isTouch() {
        return $html.hasClass('touch');
    }

    function isSidebarCollapsed() {
        return $body.hasClass('aside-collapsed') || $body.hasClass('aside-collapsed-text');
    }

    function isSidebarToggled() {
        return $body.hasClass('aside-toggled');
    }

    function isMobile() {
        return $win.width() < mq.tablet;
    }

    function isFixed() {
        return $body.hasClass('layout-fixed');
    }

    function useAsideHover() {
        return $body.hasClass('aside-hover');
    }

})(window, document, window.jQuery);

// SKYCONS
// ----------------------------------- 

(function(window, document, $, undefined){

  $(function(){

    $('[data-skycon]').each(function(){
      var element = $(this),
          skycons = new Skycons({'color': (element.data('color') || 'white')});
      
      element.html('<canvas width="' + element.data('width') + '" height="' + element.data('height') + '"></canvas>');

      skycons.add(element.children()[0], element.data('skycon'));

      skycons.play();
    });

  });

})(window, document, window.jQuery);
// SLIMSCROLL
// ----------------------------------- 

(function(window, document, $, undefined){

  $(function(){

    $('[data-scrollable]').each(function(){

      var element = $(this),
          defaultHeight = 250;
      
      element.slimScroll({
          height: (element.data('height') || defaultHeight)
      });
      
    });
  });

})(window, document, window.jQuery);

// SPARKLINE
// ----------------------------------- 

(function(window, document, $, undefined){

  $(function(){

    $('[data-sparkline]').each(initSparkLine);

    function initSparkLine() {
      var $element = $(this),
          options = $element.data(),
          values  = options.values && options.values.split(',');

      options.type = options.type || 'bar'; // default chart is bar
      options.disableHiddenCheck = true;

      $element.sparkline(values, options);

      if(options.resize) {
        $(window).resize(function(){
          $element.sparkline(values, options);
        });
      }
    }
  });

})(window, document, window.jQuery);

/*! 
 * jQuery Steps v1.1.0 - 09/04/2014
 * Copyright (c) 2014 Rafael Staib (http://www.jquery-steps.com)
 * Licensed under MIT http://www.opensource.org/licenses/MIT
 */
!function(a,b){function c(a,b){o(a).push(b)}function d(d,e,f){var g=d.children(e.headerTag),h=d.children(e.bodyTag);g.length>h.length?R(Z,"contents"):g.length<h.length&&R(Z,"titles");var i=e.startIndex;if(f.stepCount=g.length,e.saveState&&a.cookie){var j=a.cookie(U+q(d)),k=parseInt(j,0);!isNaN(k)&&k<f.stepCount&&(i=k)}f.currentIndex=i,g.each(function(e){var f=a(this),g=h.eq(e),i=g.data("mode"),j=null==i?$.html:r($,/^\s*$/.test(i)||isNaN(i)?i:parseInt(i,0)),k=j===$.html||g.data("url")===b?"":g.data("url"),l=j!==$.html&&"1"===g.data("loaded"),m=a.extend({},bb,{title:f.html(),content:j===$.html?g.html():"",contentUrl:k,contentMode:j,contentLoaded:l});c(d,m)})}function e(a){a.triggerHandler("canceled")}function f(a,b){return a.currentIndex-b}function g(b,c){var d=i(b);b.unbind(d).removeData("uid").removeData("options").removeData("state").removeData("steps").removeData("eventNamespace").find(".actions a").unbind(d),b.removeClass(c.clearFixCssClass+" vertical");var e=b.find(".content > *");e.removeData("loaded").removeData("mode").removeData("url"),e.removeAttr("id").removeAttr("role").removeAttr("tabindex").removeAttr("class").removeAttr("style")._removeAria("labelledby")._removeAria("hidden"),b.find(".content > [data-mode='async'],.content > [data-mode='iframe']").empty();var f=a('<{0} class="{1}"></{0}>'.format(b.get(0).tagName,b.attr("class"))),g=b._id();return null!=g&&""!==g&&f._id(g),f.html(b.find(".content").html()),b.after(f),b.remove(),f}function h(a,b){var c=a.find(".steps li").eq(b.currentIndex);a.triggerHandler("finishing",[b.currentIndex])?(c.addClass("done").removeClass("error"),a.triggerHandler("finished",[b.currentIndex])):c.addClass("error")}function i(a){var b=a.data("eventNamespace");return null==b&&(b="."+q(a),a.data("eventNamespace",b)),b}function j(a,b){var c=q(a);return a.find("#"+c+V+b)}function k(a,b){var c=q(a);return a.find("#"+c+W+b)}function l(a,b){var c=q(a);return a.find("#"+c+X+b)}function m(a){return a.data("options")}function n(a){return a.data("state")}function o(a){return a.data("steps")}function p(a,b){var c=o(a);return(0>b||b>=c.length)&&R(Y),c[b]}function q(a){var b=a.data("uid");return null==b&&(b=a._id(),null==b&&(b="steps-uid-".concat(T),a._id(b)),T++,a.data("uid",b)),b}function r(a,c){if(S("enumType",a),S("keyOrValue",c),"string"==typeof c){var d=a[c];return d===b&&R("The enum key '{0}' does not exist.",c),d}if("number"==typeof c){for(var e in a)if(a[e]===c)return c;R("Invalid enum value '{0}'.",c)}else R("Invalid key or value type.")}function s(a,b,c){return B(a,b,c,v(c,1))}function t(a,b,c){return B(a,b,c,f(c,1))}function u(a,b,c,d){if((0>d||d>=c.stepCount)&&R(Y),!(b.forceMoveForward&&d<c.currentIndex)){var e=c.currentIndex;return a.triggerHandler("stepChanging",[c.currentIndex,d])?(c.currentIndex=d,O(a,b,c),E(a,b,c,e),D(a,b,c),A(a,b,c),P(a,b,c,d,e,function(){a.triggerHandler("stepChanged",[d,e])})):a.find(".steps li").eq(e).addClass("error"),!0}}function v(a,b){return a.currentIndex+b}function w(b){var c=a.extend(!0,{},cb,b);return this.each(function(){var b=a(this),e={currentIndex:c.startIndex,currentStep:null,stepCount:0,transitionElement:null};b.data("options",c),b.data("state",e),b.data("steps",[]),d(b,c,e),J(b,c,e),G(b,c),c.autoFocus&&0===T&&j(b,c.startIndex).focus(),b.triggerHandler("init",[c.startIndex])})}function x(b,c,d,e,f){(0>e||e>d.stepCount)&&R(Y),f=a.extend({},bb,f),y(b,e,f),d.currentIndex!==d.stepCount&&d.currentIndex>=e&&(d.currentIndex++,O(b,c,d)),d.stepCount++;var g=b.find(".content"),h=a("<{0}>{1}</{0}>".format(c.headerTag,f.title)),i=a("<{0}></{0}>".format(c.bodyTag));return(null==f.contentMode||f.contentMode===$.html)&&i.html(f.content),0===e?g.prepend(i).prepend(h):k(b,e-1).after(i).after(h),K(b,d,i,e),N(b,c,d,h,e),F(b,c,d,e),e===d.currentIndex&&E(b,c,d),D(b,c,d),b}function y(a,b,c){o(a).splice(b,0,c)}function z(b){var c=a(this),d=m(c),e=n(c);if(d.suppressPaginationOnFocus&&c.find(":focus").is(":input"))return b.preventDefault(),!1;var f={left:37,right:39};b.keyCode===f.left?(b.preventDefault(),t(c,d,e)):b.keyCode===f.right&&(b.preventDefault(),s(c,d,e))}function A(b,c,d){if(d.stepCount>0){var e=d.currentIndex,f=p(b,e);if(!c.enableContentCache||!f.contentLoaded)switch(r($,f.contentMode)){case $.iframe:b.find(".content > .body").eq(d.currentIndex).empty().html('<iframe src="'+f.contentUrl+'" frameborder="0" scrolling="no" />').data("loaded","1");break;case $.async:var g=k(b,e)._aria("busy","true").empty().append(M(c.loadingTemplate,{text:c.labels.loading}));a.ajax({url:f.contentUrl,cache:!1}).done(function(a){g.empty().html(a)._aria("busy","false").data("loaded","1"),b.triggerHandler("contentLoaded",[e])})}}}function B(a,b,c,d){var e=c.currentIndex;if(d>=0&&d<c.stepCount&&!(b.forceMoveForward&&d<c.currentIndex)){var f=j(a,d),g=f.parent(),h=g.hasClass("disabled");return g._enableAria(),f.click(),e===c.currentIndex&&h?(g._enableAria(!1),!1):!0}return!1}function C(b){b.preventDefault();var c=a(this),d=c.parent().parent().parent().parent(),f=m(d),g=n(d),i=c.attr("href");switch(i.substring(i.lastIndexOf("#")+1)){case"cancel":e(d);break;case"finish":h(d,g);break;case"next":s(d,f,g);break;case"previous":t(d,f,g)}}function D(a,b,c){if(b.enablePagination){var d=a.find(".actions a[href$='#finish']").parent(),e=a.find(".actions a[href$='#next']").parent();if(!b.forceMoveForward){var f=a.find(".actions a[href$='#previous']").parent();f._enableAria(c.currentIndex>0)}b.enableFinishButton&&b.showFinishButtonAlways?(d._enableAria(c.stepCount>0),e._enableAria(c.stepCount>1&&c.stepCount>c.currentIndex+1)):(d._showAria(b.enableFinishButton&&c.stepCount===c.currentIndex+1),e._showAria(0===c.stepCount||c.stepCount>c.currentIndex+1)._enableAria(c.stepCount>c.currentIndex+1||!b.enableFinishButton))}}function E(b,c,d,e){var f=j(b,d.currentIndex),g=a('<span class="current-info audible">'+c.labels.current+" </span>"),h=b.find(".content > .title");if(null!=e){var i=j(b,e);i.parent().addClass("done").removeClass("error")._selectAria(!1),h.eq(e).removeClass("current").next(".body").removeClass("current"),g=i.find(".current-info"),f.focus()}f.prepend(g).parent()._selectAria().removeClass("done")._enableAria(),h.eq(d.currentIndex).addClass("current").next(".body").addClass("current")}function F(a,b,c,d){for(var e=q(a),f=d;f<c.stepCount;f++){var g=e+V+f,h=e+W+f,i=e+X+f,j=a.find(".title").eq(f)._id(i);a.find(".steps a").eq(f)._id(g)._aria("controls",h).attr("href","#"+i).html(M(b.titleTemplate,{index:f+1,title:j.html()})),a.find(".body").eq(f)._id(h)._aria("labelledby",i)}}function G(a,b){var c=i(a);a.bind("canceled"+c,b.onCanceled),a.bind("contentLoaded"+c,b.onContentLoaded),a.bind("finishing"+c,b.onFinishing),a.bind("finished"+c,b.onFinished),a.bind("init"+c,b.onInit),a.bind("stepChanging"+c,b.onStepChanging),a.bind("stepChanged"+c,b.onStepChanged),b.enableKeyNavigation&&a.bind("keyup"+c,z),a.find(".actions a").bind("click"+c,C)}function H(a,b,c,d){return 0>d||d>=c.stepCount||c.currentIndex===d?!1:(I(a,d),c.currentIndex>d&&(c.currentIndex--,O(a,b,c)),c.stepCount--,l(a,d).remove(),k(a,d).remove(),j(a,d).parent().remove(),0===d&&a.find(".steps li").first().addClass("first"),d===c.stepCount&&a.find(".steps li").eq(d).addClass("last"),F(a,b,c,d),D(a,b,c),!0)}function I(a,b){o(a).splice(b,1)}function J(b,c,d){var e='<{0} class="{1}">{2}</{0}>',f=r(_,c.stepsOrientation),g=f===_.vertical?" vertical":"",h=a(e.format(c.contentContainerTag,"content "+c.clearFixCssClass,b.html())),i=a(e.format(c.stepsContainerTag,"steps "+c.clearFixCssClass,'<ul role="tablist"></ul>')),j=h.children(c.headerTag),k=h.children(c.bodyTag);b.attr("role","application").empty().append(i).append(h).addClass(c.cssClass+" "+c.clearFixCssClass+g),k.each(function(c){K(b,d,a(this),c)}),j.each(function(e){N(b,c,d,a(this),e)}),E(b,c,d),L(b,c,d)}function K(a,b,c,d){var e=q(a),f=e+W+d,g=e+X+d;c._id(f).attr("role","tabpanel")._aria("labelledby",g).addClass("body")._showAria(b.currentIndex===d)}function L(a,b,c){if(b.enablePagination){var d='<{0} class="actions {1}"><ul role="menu" aria-label="{2}">{3}</ul></{0}>',e='<li><a href="#{0}" role="menuitem">{1}</a></li>',f="";b.forceMoveForward||(f+=e.format("previous",b.labels.previous)),f+=e.format("next",b.labels.next),b.enableFinishButton&&(f+=e.format("finish",b.labels.finish)),b.enableCancelButton&&(f+=e.format("cancel",b.labels.cancel)),a.append(d.format(b.actionContainerTag,b.clearFixCssClass,b.labels.pagination,f)),D(a,b,c),A(a,b,c)}}function M(a,c){for(var d=a.match(/#([a-z]*)#/gi),e=0;e<d.length;e++){var f=d[e],g=f.substring(1,f.length-1);c[g]===b&&R("The key '{0}' does not exist in the substitute collection!",g),a=a.replace(f,c[g])}return a}function N(b,c,d,e,f){var g=q(b),h=g+V+f,j=g+W+f,k=g+X+f,l=b.find(".steps > ul"),m=M(c.titleTemplate,{index:f+1,title:e.html()}),n=a('<li role="tab"><a id="'+h+'" href="#'+k+'" aria-controls="'+j+'">'+m+"</a></li>");n._enableAria(c.enableAllSteps||d.currentIndex>f),d.currentIndex>f&&n.addClass("done"),e._id(k).attr("tabindex","-1").addClass("title"),0===f?l.prepend(n):l.find("li").eq(f-1).after(n),0===f&&l.find("li").removeClass("first").eq(f).addClass("first"),f===d.stepCount-1&&l.find("li").removeClass("last").eq(f).addClass("last"),n.children("a").bind("click"+i(b),Q)}function O(b,c,d){c.saveState&&a.cookie&&a.cookie(U+q(b),d.currentIndex)}function P(b,c,d,e,f,g){var h=b.find(".content > .body"),i=r(ab,c.transitionEffect),j=c.transitionEffectSpeed,k=h.eq(e),l=h.eq(f);switch(i){case ab.fade:case ab.slide:var m=i===ab.fade?"fadeOut":"slideUp",o=i===ab.fade?"fadeIn":"slideDown";d.transitionElement=k,l[m](j,function(){var b=a(this)._showAria(!1).parent().parent(),c=n(b);c.transitionElement&&(c.transitionElement[o](j,function(){a(this)._showAria()}).promise().done(g),c.transitionElement=null)});break;case ab.slideLeft:var p=l.outerWidth(!0),q=e>f?-p:p,s=e>f?p:-p;a.when(l.animate({left:q},j,function(){a(this)._showAria(!1)}),k.css("left",s+"px")._showAria().animate({left:0},j)).done(g);break;default:a.when(l._showAria(!1),k._showAria()).done(g)}}function Q(b){b.preventDefault();var c=a(this),d=c.parent().parent().parent().parent(),e=m(d),f=n(d),g=f.currentIndex;if(c.parent().is(":not(.disabled):not(.current)")){var h=c.attr("href"),i=parseInt(h.substring(h.lastIndexOf("-")+1),0);u(d,e,f,i)}return g===f.currentIndex?(j(d,g).focus(),!1):void 0}function R(a){throw arguments.length>1&&(a=a.format(Array.prototype.slice.call(arguments,1))),new Error(a)}function S(a,b){null==b&&R("The argument '{0}' is null or undefined.",a)}a.fn.extend({_aria:function(a,b){return this.attr("aria-"+a,b)},_removeAria:function(a){return this.removeAttr("aria-"+a)},_enableAria:function(a){return null==a||a?this.removeClass("disabled")._aria("disabled","false"):this.addClass("disabled")._aria("disabled","true")},_showAria:function(a){return null==a||a?this.show()._aria("hidden","false"):this.hide()._aria("hidden","true")},_selectAria:function(a){return null==a||a?this.addClass("current")._aria("selected","true"):this.removeClass("current")._aria("selected","false")},_id:function(a){return a?this.attr("id",a):this.attr("id")}}),String.prototype.format||(String.prototype.format=function(){for(var b=1===arguments.length&&a.isArray(arguments[0])?arguments[0]:arguments,c=this,d=0;d<b.length;d++){var e=new RegExp("\\{"+d+"\\}","gm");c=c.replace(e,b[d])}return c});var T=0,U="jQu3ry_5teps_St@te_",V="-t-",W="-p-",X="-h-",Y="Index out of range.",Z="One or more corresponding step {0} are missing.";a.fn.steps=function(b){return a.fn.steps[b]?a.fn.steps[b].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof b&&b?void a.error("Method "+b+" does not exist on jQuery.steps"):w.apply(this,arguments)},a.fn.steps.add=function(a){var b=n(this);return x(this,m(this),b,b.stepCount,a)},a.fn.steps.destroy=function(){return g(this,m(this))},a.fn.steps.finish=function(){h(this,n(this))},a.fn.steps.getCurrentIndex=function(){return n(this).currentIndex},a.fn.steps.getCurrentStep=function(){return p(this,n(this).currentIndex)},a.fn.steps.getStep=function(a){return p(this,a)},a.fn.steps.insert=function(a,b){return x(this,m(this),n(this),a,b)},a.fn.steps.next=function(){return s(this,m(this),n(this))},a.fn.steps.previous=function(){return t(this,m(this),n(this))},a.fn.steps.remove=function(a){return H(this,m(this),n(this),a)},a.fn.steps.setStep=function(){throw new Error("Not yet implemented!")},a.fn.steps.skip=function(){throw new Error("Not yet implemented!")};var $=a.fn.steps.contentMode={html:0,iframe:1,async:2},_=a.fn.steps.stepsOrientation={horizontal:0,vertical:1},ab=a.fn.steps.transitionEffect={none:0,fade:1,slide:2,slideLeft:3},bb=a.fn.steps.stepModel={title:"",content:"",contentUrl:"",contentMode:$.html,contentLoaded:!1},cb=a.fn.steps.defaults={headerTag:"h1",bodyTag:"div",contentContainerTag:"div",actionContainerTag:"div",stepsContainerTag:"div",cssClass:"wizard",clearFixCssClass:"clearfix",stepsOrientation:_.horizontal,titleTemplate:'<span class="number">#index#.</span> #title#',loadingTemplate:'<span class="spinner"></span> #text#',autoFocus:!1,enableAllSteps:!1,enableKeyNavigation:!0,enablePagination:!0,suppressPaginationOnFocus:!0,enableContentCache:!0,enableCancelButton:!1,enableFinishButton:!0,preloadContent:!1,showFinishButtonAlways:!1,forceMoveForward:!1,saveState:!1,startIndex:0,transitionEffect:ab.none,transitionEffectSpeed:200,onStepChanging:function(){return!0},onStepChanged:function(){},onCanceled:function(){},onFinishing:function(){return!0},onFinished:function(){},onContentLoaded:function(){},onInit:function(){},labels:{cancel:"Cancel",current:"current step:",pagination:"Pagination",finish:"Finish",next:"Next",previous:"Previous",loading:"Loading ..."}}}(jQuery);
String.prototype.hashCode = function() {
    var hash = 0,
        i, chr, len;
    if (this.length === 0) return hash;
    for (i = 0, len = this.length; i < len; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

// Sweet Alert
// ----------------------------------- 

(function(window, document, $, undefined){

  $(function(){

    $('#swal-demo1').on('click', function(e){
      e.preventDefault();
      swal("Here's a message!")
    });


    $('#swal-demo2').on('click', function(e){
      e.preventDefault();
      swal("Here's a message!", "It's pretty, isn't it?")
    });

    $('#swal-demo3').on('click', function(e){
      e.preventDefault();
      swal("Good job!", "You clicked the button!", "success")
    });

    $('#swal-demo4').on('click', function(e){
      e.preventDefault();
      swal({
        title : "Are you sure?",
        text : "You will not be able to recover this imaginary file!",
        type : "warning",
        showCancelButton : true,
        confirmButtonColor : "#DD6B55",
        confirmButtonText : "Yes, delete it!",
        closeOnConfirm : false
      },
        function () {
        swal("Deleted!", "Your imaginary file has been deleted.", "success");
      });

    });

    $('#swal-demo5').on('click', function(e){
      e.preventDefault();
      swal({
        title : "Are you sure?",
        text : "You will not be able to recover this imaginary file!",
        type : "warning",
        showCancelButton : true,
        confirmButtonColor : "#DD6B55",
        confirmButtonText : "Yes, delete it!",
        cancelButtonText : "No, cancel plx!",
        closeOnConfirm : false,
        closeOnCancel : false
      }, function (isConfirm) {
        if (isConfirm) {
          swal("Deleted!", "Your imaginary file has been deleted.", "success");
        } else {
          swal("Cancelled", "Your imaginary file is safe :)", "error");
        }
      });

    });

  });

})(window, document, window.jQuery);

// Custom jQuery
// ----------------------------------- 


(function(window, document, $, undefined){

  $(function(){

    $(document).on('change', '[data-check-all]', function() {
      var $this = $(this),
          index= $this.index() + 1,
          checkbox = $this.find('input[type="checkbox"]'),
          table = $this.parents('table');
      // Make sure to affect only the correct checkbox column
      table.find('tbody > tr > td:nth-child('+index+') input[type="checkbox"]')
        .prop('checked', checkbox[0].checked)
        .trigger('change');

    });

  });

})(window, document, window.jQuery);


// TOGGLE STATE
// -----------------------------------

(function(window, document, $, undefined){

  $(function(){

    var $body = $('body');
        toggle = new StateToggler();

    $('[data-toggle-state]')
      .on('click', function (e) {
        // e.preventDefault();
        e.stopPropagation();
        var element = $(this),
            classname = element.data('toggleState'),
            target = element.data('target'),
            noPersist = (element.attr('data-no-persist') !== undefined);

        // Specify a target selector to toggle classname
        // use body by default
        var $target = target ? $(target) : $body;

        if(classname) {
          if( $target.hasClass(classname) ) {
            $target.removeClass(classname);
            if( ! noPersist)
              toggle.removeState(classname);
          }
          else {
            $target.addClass(classname);
            if( ! noPersist)
              toggle.addState(classname);
          }

        }
        // some elements may need this when toggled class change the content size
        // e.g. sidebar collapsed mode and jqGrid
        $(window).resize();

    });

  });

  // Handle states to/from localstorage
  window.StateToggler = function() {

    var storageKeyName  = 'jq-toggleState';

    // Helper object to check for words in a phrase //
    var WordChecker = {
      hasWord: function (phrase, word) {
        return new RegExp('(^|\\s)' + word + '(\\s|$)').test(phrase);
      },
      addWord: function (phrase, word) {
        if (!this.hasWord(phrase, word)) {
          return (phrase + (phrase ? ' ' : '') + word);
        }
      },
      removeWord: function (phrase, word) {
        if (this.hasWord(phrase, word)) {
          return phrase.replace(new RegExp('(^|\\s)*' + word + '(\\s|$)*', 'g'), '');
        }
      }
    };

    // Return service public methods
    return {
      // Add a state to the browser storage to be restored later
      addState: function(classname){
        var data = $.localStorage.get(storageKeyName);

        if(!data)  {
          data = classname;
        }
        else {
          data = WordChecker.addWord(data, classname);
        }

        $.localStorage.set(storageKeyName, data);
      },

      // Remove a state from the browser storage
      removeState: function(classname){
        var data = $.localStorage.get(storageKeyName);
        // nothing to remove
        if(!data) return;

        data = WordChecker.removeWord(data, classname);

        $.localStorage.set(storageKeyName, data);
      },

      // Load the state string and restore the classlist
      restoreState: function($elem) {
        var data = $.localStorage.get(storageKeyName);

        // nothing to restore
        if(!data) return;
        $elem.addClass(data);
      }

    };
  };

})(window, document, window.jQuery);

// Bootstrap Tour
// ----------------------------------- 

(function(window, document, $, undefined){

  $(function(){

    // Prepare steps
    var tourSteps = [];
    $('.tour-step').each(function(){
      var stepsOptions = $(this).data();
      stepsOptions.element = '#'+this.id;
      tourSteps.push( stepsOptions );
    });

    if ( tourSteps.length ) {
      // Instance the tour
      var tour = new Tour({
          backdrop: true,
          onShown: function(tour) {
            // BootstrapTour is not compatible with z-index based layout
            // so adding position:static for this case makes the browser
            // to ignore the property
            $('.wrapper > section').css({'position': 'static'});
          },
          onHide: function (tour) {
            // finally restore on destroy and reuse the value declared in stylesheet
            $('.wrapper > section').css({'position': ''});
          },
          steps: tourSteps
        });

      // Initialize the tour
      tour.init();

      
      $('#start-tour').on('click', function(){
        // Start the tour
        tour.restart();
      });
    }

  });

})(window, document, window.jQuery);

/**=========================================================
 * Module: trigger-resize.js
 * Triggers a window resize event from any element
 =========================================================*/

(function(window, document, $, undefined) {

    $(function() {
        var element = $('[data-trigger-resize]');
        var value = element.data('triggerResize')
        element.on('click', function() {
            setTimeout(function() {
                // all IE friendly dispatchEvent
                var evt = document.createEvent('UIEvents');
                evt.initUIEvent('resize', true, false, window, 0);
                window.dispatchEvent(evt);
                // modern dispatchEvent way
                // window.dispatchEvent(new Event('resize'));
            }, value || 300);
        });
    });

})(window, document, window.jQuery);
/**=========================================================
 * Module: utils.js
 * jQuery Utility functions library 
 * adapted from the core of UIKit
 =========================================================*/

(function($, window, doc){
    'use strict';
    
    var $html = $("html"), $win = $(window);

    $.support.transition = (function() {

        var transitionEnd = (function() {

            var element = doc.body || doc.documentElement,
                transEndEventNames = {
                    WebkitTransition: 'webkitTransitionEnd',
                    MozTransition: 'transitionend',
                    OTransition: 'oTransitionEnd otransitionend',
                    transition: 'transitionend'
                }, name;

            for (name in transEndEventNames) {
                if (element.style[name] !== undefined) return transEndEventNames[name];
            }
        }());

        return transitionEnd && { end: transitionEnd };
    })();

    $.support.animation = (function() {

        var animationEnd = (function() {

            var element = doc.body || doc.documentElement,
                animEndEventNames = {
                    WebkitAnimation: 'webkitAnimationEnd',
                    MozAnimation: 'animationend',
                    OAnimation: 'oAnimationEnd oanimationend',
                    animation: 'animationend'
                }, name;

            for (name in animEndEventNames) {
                if (element.style[name] !== undefined) return animEndEventNames[name];
            }
        }());

        return animationEnd && { end: animationEnd };
    })();

    $.support.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(callback){ window.setTimeout(callback, 1000/60); };
    $.support.touch                 = (
        ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)  ||
        (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
        (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
        false
    );
    $.support.mutationobserver      = (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null);

    $.Utils = {};

    $.Utils.debounce = function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    $.Utils.removeCssRules = function(selectorRegEx) {
        var idx, idxs, stylesheet, _i, _j, _k, _len, _len1, _len2, _ref;

        if(!selectorRegEx) return;

        setTimeout(function(){
            try {
              _ref = document.styleSheets;
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                stylesheet = _ref[_i];
                idxs = [];
                stylesheet.cssRules = stylesheet.cssRules;
                for (idx = _j = 0, _len1 = stylesheet.cssRules.length; _j < _len1; idx = ++_j) {
                  if (stylesheet.cssRules[idx].type === CSSRule.STYLE_RULE && selectorRegEx.test(stylesheet.cssRules[idx].selectorText)) {
                    idxs.unshift(idx);
                  }
                }
                for (_k = 0, _len2 = idxs.length; _k < _len2; _k++) {
                  stylesheet.deleteRule(idxs[_k]);
                }
              }
            } catch (_error) {}
        }, 0);
    };

    $.Utils.isInView = function(element, options) {

        var $element = $(element);

        if (!$element.is(':visible')) {
            return false;
        }

        var window_left = $win.scrollLeft(),
            window_top  = $win.scrollTop(),
            offset      = $element.offset(),
            left        = offset.left,
            top         = offset.top;

        options = $.extend({topoffset:0, leftoffset:0}, options);

        if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
            left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
          return true;
        } else {
          return false;
        }
    };

    $.Utils.options = function(string) {

        if ($.isPlainObject(string)) return string;

        var start = (string ? string.indexOf("{") : -1), options = {};

        if (start != -1) {
            try {
                options = (new Function("", "var json = " + string.substr(start) + "; return JSON.parse(JSON.stringify(json));"))();
            } catch (e) {}
        }

        return options;
    };

    $.Utils.events       = {};
    $.Utils.events.click = $.support.touch ? 'tap' : 'click';

    $.langdirection = $html.attr("dir") == "rtl" ? "right" : "left";

    $(function(){

        // Check for dom modifications
        if(!$.support.mutationobserver) return;

        // Install an observer for custom needs of dom changes
        var observer = new $.support.mutationobserver($.Utils.debounce(function(mutations) {
            $(doc).trigger("domready");
        }, 300));

        // pass in the target node, as well as the observer options
        observer.observe(document.body, { childList: true, subtree: true });

    });

    // add touch identifier class
    $html.addClass($.support.touch ? "touch" : "no-touch");

}(jQuery, window, document));
// Custom jQuery
// -----------------------------------
(function(window, document, $, undefined) {

    $(function() {
        $.ajaxPrefilter(function(options, originalOptions, xhr) { // this will run before each request
            NProgress.start();
            var token = window.custom.csrfToken;
            if (window.custom && window.custom.csrfToken) {
                return xhr.setRequestHeader('X-CSRF-TOKEN', window.custom.csrfToken); // adds directly to the XmlHttpRequest Object
            }
        });

        $(document).ajaxComplete(function(event, xhr, settings) {
            NProgress.done();
        });

        $('a[ajaxify]').on('click', function() {
            var element = this;
            var $element = $(element);
            var href = $this.attr('href');
            var target = $this.attr('target');
        });

        NProgress.start();
        window.setTimeout(function() {
            NProgress.done();
        }, 400);

        $(document).on("submit", "form", function() {
            $(this).find("input[type=submit]").attr("disabled", "disabled");
            $(this).find("button[type=submit]").attr("disabled", "disabled");

            return true;
        });

    });

})(window, document, window.jQuery);
(function (window, document, $, undefined) {
    $(function () {

        if (typeof window.custom != "undefined") {
            window.custom.formatMoneyWithCurrency = function (n, c) {
                try {
                    n = parseFloat(n);
                    return c + n.toFixed(2).replace(/./g, function (c, i, a) {
                            return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
                        });
                } catch (e) {
                    console.log(e);
                    return c + '0';
                }
            };

            window.custom.formatMoneyWithoutCurrency = function (n) {
                try {
                    n = parseFloat(n);
                    return n.toFixed(2).replace(/./g, function (c, i, a) {
                        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
                    });
                } catch (e) {
                    console.log(e);
                    return '0';
                }
            };

            window.custom.formatMoney = function (n) {
                var currency = this.currency;
                /*
                 var money = new Number(money);
                 var ret = currency.symbol + money.toFixed(currency.decimal_digits);
                 return ret;
                 */
                return this.formatMoneyWithCurrency(n, currency.symbol);
            };

            window.custom.parse_eng_date = function(d) {
                var ms = Date.parse(d);
                var date = new Date(ms);
                var months = window.custom.english_months;

                return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
            };

            window.custom.parse_hij_date = function(d) {
                var ms = Date.parse(d);
                var date = new Date(ms);
                var months = window.custom.islamic_months;

                return date.getDate() + ' ' + months[date.getMonth()];
            };

            window.custom.messages = {
                internal_error : {
                    status: 'danger',
                    message: 'Internal Error'
                },
                processing: {
                    status: 'warning',
                    message: 'Please wait...'
                }
            };

        }
    });
})(window, document, window.jQuery);
// // CHART SPLINE
// // -----------------------------------
// (function(window, document, $, undefined) {
//
//     $(function() {
//
//         var data = [{
//             "label": "Uniques",
//             "color": "#768294",
//             "data": [
//                 ["Mar", 70],
//                 ["Apr", 85],
//                 ["May", 59],
//                 ["Jun", 93],
//                 ["Jul", 66],
//                 ["Aug", 86],
//                 ["Sep", 60]
//             ]
//         }, {
//             "label": "Recurrent",
//             "color": "#1f92fe",
//             "data": [
//                 ["Mar", 21],
//                 ["Apr", 12],
//                 ["May", 27],
//                 ["Jun", 24],
//                 ["Jul", 16],
//                 ["Aug", 39],
//                 ["Sep", 15]
//             ]
//         }];
//
//         var datav2 = [{
//             "label": "Hours",
//             "color": "#23b7e5",
//             "data": [
//                 ["Jan", 70],
//                 ["Feb", 20],
//                 ["Mar", 70],
//                 ["Apr", 85],
//                 ["May", 59],
//                 ["Jun", 93],
//                 ["Jul", 66],
//                 ["Aug", 86],
//                 ["Sep", 60],
//                 ["Oct", 60],
//                 ["Nov", 12],
//                 ["Dec", 50]
//             ]
//         }, {
//             "label": "Commits",
//             "color": "#7266ba",
//             "data": [
//                 ["Jan", 20],
//                 ["Feb", 70],
//                 ["Mar", 30],
//                 ["Apr", 50],
//                 ["May", 85],
//                 ["Jun", 43],
//                 ["Jul", 96],
//                 ["Aug", 36],
//                 ["Sep", 80],
//                 ["Oct", 10],
//                 ["Nov", 72],
//                 ["Dec", 31]
//             ]
//         }];
//
//         var datav3 = [{
//             "label": "Home",
//             "color": "#1ba3cd",
//             "data": [
//                 ["1", 38],
//                 ["2", 40],
//                 ["3", 42],
//                 ["4", 48],
//                 ["5", 50],
//                 ["6", 70],
//                 ["7", 145],
//                 ["8", 70],
//                 ["9", 59],
//                 ["10", 48],
//                 ["11", 38],
//                 ["12", 29],
//                 ["13", 30],
//                 ["14", 22],
//                 ["15", 28]
//             ]
//         }, {
//             "label": "Overall",
//             "color": "#3a3f51",
//             "data": [
//                 ["1", 16],
//                 ["2", 18],
//                 ["3", 17],
//                 ["4", 16],
//                 ["5", 30],
//                 ["6", 110],
//                 ["7", 19],
//                 ["8", 18],
//                 ["9", 110],
//                 ["10", 19],
//                 ["11", 16],
//                 ["12", 10],
//                 ["13", 20],
//                 ["14", 10],
//                 ["15", 20]
//             ]
//         }];
//
//         var options = {
//             series: {
//                 lines: {
//                     show: false
//                 },
//                 points: {
//                     show: true,
//                     radius: 4
//                 },
//                 splines: {
//                     show: true,
//                     tension: 0.4,
//                     lineWidth: 1,
//                     fill: 0.5
//                 }
//             },
//             grid: {
//                 borderColor: '#eee',
//                 borderWidth: 1,
//                 hoverable: true,
//                 backgroundColor: '#fcfcfc'
//             },
//             tooltip: true,
//             tooltipOpts: {
//                 content: function(label, x, y) {
//                     return x + ' : ' + y;
//                 }
//             },
//             xaxis: {
//                 tickColor: '#fcfcfc',
//                 mode: 'categories'
//             },
//             yaxis: {
//                 min: 0,
//                 max: 150, // optional: use it for a clear represetation
//                 tickColor: '#eee',
//                 //position: 'right' or 'left',
//                 tickFormatter: function(v) {
//                     return v /* + ' visitors'*/ ;
//                 }
//             },
//             shadowSize: 0
//         };
//
//         var chart = $('.chart-spline');
//         if (chart.length)
//             $.plot(chart, data, options);
//
//         var chartv2 = $('.chart-splinev2');
//         if (chartv2.length)
//             $.plot(chartv2, datav2, options);
//
//         var chartv3 = $('.chart-splinev3');
//         if (chartv3.length)
//             $.plot(chartv3, datav3, options);
//
//     });
//
// })(window, document, window.jQuery);
//
// // CHART AREA
// // -----------------------------------
// (function(window, document, $, undefined) {
//
//     $(function() {
//
//         var data = [{
//             "label": "Uniques",
//             "color": "#aad874",
//             "data": [
//                 ["Mar", 50],
//                 ["Apr", 84],
//                 ["May", 52],
//                 ["Jun", 88],
//                 ["Jul", 69],
//                 ["Aug", 92],
//                 ["Sep", 58]
//             ]
//         }, {
//             "label": "Recurrent",
//             "color": "#7dc7df",
//             "data": [
//                 ["Mar", 13],
//                 ["Apr", 44],
//                 ["May", 44],
//                 ["Jun", 27],
//                 ["Jul", 38],
//                 ["Aug", 11],
//                 ["Sep", 39]
//             ]
//         }];
//
//         var options = {
//             series: {
//                 lines: {
//                     show: true,
//                     fill: 0.8
//                 },
//                 points: {
//                     show: true,
//                     radius: 4
//                 }
//             },
//             grid: {
//                 borderColor: '#eee',
//                 borderWidth: 1,
//                 hoverable: true,
//                 backgroundColor: '#fcfcfc'
//             },
//             tooltip: true,
//             tooltipOpts: {
//                 content: function(label, x, y) {
//                     return x + ' : ' + y;
//                 }
//             },
//             xaxis: {
//                 tickColor: '#fcfcfc',
//                 mode: 'categories'
//             },
//             yaxis: {
//                 min: 0,
//                 tickColor: '#eee',
//                 // position: 'right' or 'left'
//                 tickFormatter: function(v) {
//                     return v + ' visitors';
//                 }
//             },
//             shadowSize: 0
//         };
//
//         var chart = $('.chart-area');
//         if (chart.length)
//             $.plot(chart, data, options);
//
//     });
//
// })(window, document, window.jQuery);
//
// // CHART BAR
// // -----------------------------------
// (function(window, document, $, undefined) {
//
//     $(function() {
//
//         var data = [{
//             "label": "Sales",
//             "color": "#9cd159",
//             "data": [
//                 ["Jan", 27],
//                 ["Feb", 82],
//                 ["Mar", 56],
//                 ["Apr", 14],
//                 ["May", 28],
//                 ["Jun", 77],
//                 ["Jul", 23],
//                 ["Aug", 49],
//                 ["Sep", 81],
//                 ["Oct", 20]
//             ]
//         }];
//
//         var options = {
//             series: {
//                 bars: {
//                     align: 'center',
//                     lineWidth: 0,
//                     show: true,
//                     barWidth: 0.6,
//                     fill: 0.9
//                 }
//             },
//             grid: {
//                 borderColor: '#eee',
//                 borderWidth: 1,
//                 hoverable: true,
//                 backgroundColor: '#fcfcfc'
//             },
//             tooltip: true,
//             tooltipOpts: {
//                 content: function(label, x, y) {
//                     return x + ' : ' + y;
//                 }
//             },
//             xaxis: {
//                 tickColor: '#fcfcfc',
//                 mode: 'categories'
//             },
//             yaxis: {
//                 // position: 'right' or 'left'
//                 tickColor: '#eee'
//             },
//             shadowSize: 0
//         };
//
//         var chart = $('.chart-bar');
//         if (chart.length)
//             $.plot(chart, data, options);
//
//     });
//
// })(window, document, window.jQuery);
//
//
// // CHART BAR STACKED
// // -----------------------------------
// (function(window, document, $, undefined) {
//
//     $(function() {
//
//         var data = [{
//             "label": "Tweets",
//             "color": "#51bff2",
//             "data": [
//                 ["Jan", 56],
//                 ["Feb", 81],
//                 ["Mar", 97],
//                 ["Apr", 44],
//                 ["May", 24],
//                 ["Jun", 85],
//                 ["Jul", 94],
//                 ["Aug", 78],
//                 ["Sep", 52],
//                 ["Oct", 17],
//                 ["Nov", 90],
//                 ["Dec", 62]
//             ]
//         }, {
//             "label": "Likes",
//             "color": "#4a8ef1",
//             "data": [
//                 ["Jan", 69],
//                 ["Feb", 135],
//                 ["Mar", 14],
//                 ["Apr", 100],
//                 ["May", 100],
//                 ["Jun", 62],
//                 ["Jul", 115],
//                 ["Aug", 22],
//                 ["Sep", 104],
//                 ["Oct", 132],
//                 ["Nov", 72],
//                 ["Dec", 61]
//             ]
//         }, {
//             "label": "+1",
//             "color": "#f0693a",
//             "data": [
//                 ["Jan", 29],
//                 ["Feb", 36],
//                 ["Mar", 47],
//                 ["Apr", 21],
//                 ["May", 5],
//                 ["Jun", 49],
//                 ["Jul", 37],
//                 ["Aug", 44],
//                 ["Sep", 28],
//                 ["Oct", 9],
//                 ["Nov", 12],
//                 ["Dec", 35]
//             ]
//         }];
//
//         var datav2 = [{
//             "label": "Pending",
//             "color": "#9289ca",
//             "data": [
//                 ["Pj1", 86],
//                 ["Pj2", 136],
//                 ["Pj3", 97],
//                 ["Pj4", 110],
//                 ["Pj5", 62],
//                 ["Pj6", 85],
//                 ["Pj7", 115],
//                 ["Pj8", 78],
//                 ["Pj9", 104],
//                 ["Pj10", 82],
//                 ["Pj11", 97],
//                 ["Pj12", 110],
//                 ["Pj13", 62]
//             ]
//         }, {
//             "label": "Assigned",
//             "color": "#7266ba",
//             "data": [
//                 ["Pj1", 49],
//                 ["Pj2", 81],
//                 ["Pj3", 47],
//                 ["Pj4", 44],
//                 ["Pj5", 100],
//                 ["Pj6", 49],
//                 ["Pj7", 94],
//                 ["Pj8", 44],
//                 ["Pj9", 52],
//                 ["Pj10", 17],
//                 ["Pj11", 47],
//                 ["Pj12", 44],
//                 ["Pj13", 100]
//             ]
//         }, {
//             "label": "Completed",
//             "color": "#564aa3",
//             "data": [
//                 ["Pj1", 29],
//                 ["Pj2", 56],
//                 ["Pj3", 14],
//                 ["Pj4", 21],
//                 ["Pj5", 5],
//                 ["Pj6", 24],
//                 ["Pj7", 37],
//                 ["Pj8", 22],
//                 ["Pj9", 28],
//                 ["Pj10", 9],
//                 ["Pj11", 14],
//                 ["Pj12", 21],
//                 ["Pj13", 5]
//             ]
//         }];
//
//         var options = {
//             series: {
//                 stack: true,
//                 bars: {
//                     align: 'center',
//                     lineWidth: 0,
//                     show: true,
//                     barWidth: 0.6,
//                     fill: 0.9
//                 }
//             },
//             grid: {
//                 borderColor: '#eee',
//                 borderWidth: 1,
//                 hoverable: true,
//                 backgroundColor: '#fcfcfc'
//             },
//             tooltip: true,
//             tooltipOpts: {
//                 content: function(label, x, y) {
//                     return x + ' : ' + y;
//                 }
//             },
//             xaxis: {
//                 tickColor: '#fcfcfc',
//                 mode: 'categories'
//             },
//             yaxis: {
//                 // position: 'right' or 'left'
//                 tickColor: '#eee'
//             },
//             shadowSize: 0
//         };
//
//         var chart = $('.chart-bar-stacked');
//         if (chart.length)
//             $.plot(chart, data, options);
//
//         var chartv2 = $('.chart-bar-stackedv2');
//         if (chartv2.length)
//             $.plot(chartv2, datav2, options);
//
//     });
//
// })(window, document, window.jQuery);
//
// // CHART DONUT
// // -----------------------------------
// (function(window, document, $, undefined) {
//
//     $(function() {
//
//         var data = [{
//             "color": "#39C558",
//             "data": 60,
//             "label": "Coffee"
//         }, {
//             "color": "#00b4ff",
//             "data": 90,
//             "label": "CSS"
//         }, {
//             "color": "#FFBE41",
//             "data": 50,
//             "label": "LESS"
//         }, {
//             "color": "#ff3e43",
//             "data": 80,
//             "label": "Jade"
//         }, {
//             "color": "#937fc7",
//             "data": 116,
//             "label": "AngularJS"
//         }];
//
//         var options = {
//             series: {
//                 pie: {
//                     show: true,
//                     innerRadius: 0.5 // This makes the donut shape
//                 }
//             }
//         };
//
//         var chart = $('.chart-donut');
//         if (chart.length)
//             $.plot(chart, data, options);
//
//     });
//
// })(window, document, window.jQuery);
//
// // CHART LINE
// // -----------------------------------
// (function(window, document, $, undefined) {
//
//     $(function() {
//
//         var data = [{
//             "label": "Complete",
//             "color": "#5ab1ef",
//             "data": [
//                 ["Jan", 188],
//                 ["Feb", 183],
//                 ["Mar", 185],
//                 ["Apr", 199],
//                 ["May", 190],
//                 ["Jun", 194],
//                 ["Jul", 194],
//                 ["Aug", 184],
//                 ["Sep", 74]
//             ]
//         }, {
//             "label": "In Progress",
//             "color": "#f5994e",
//             "data": [
//                 ["Jan", 153],
//                 ["Feb", 116],
//                 ["Mar", 136],
//                 ["Apr", 119],
//                 ["May", 148],
//                 ["Jun", 133],
//                 ["Jul", 118],
//                 ["Aug", 161],
//                 ["Sep", 59]
//             ]
//         }, {
//             "label": "Cancelled",
//             "color": "#d87a80",
//             "data": [
//                 ["Jan", 111],
//                 ["Feb", 97],
//                 ["Mar", 93],
//                 ["Apr", 110],
//                 ["May", 102],
//                 ["Jun", 93],
//                 ["Jul", 92],
//                 ["Aug", 92],
//                 ["Sep", 44]
//             ]
//         }];
//
//         var options = {
//             series: {
//                 lines: {
//                     show: true,
//                     fill: 0.01
//                 },
//                 points: {
//                     show: true,
//                     radius: 4
//                 }
//             },
//             grid: {
//                 borderColor: '#eee',
//                 borderWidth: 1,
//                 hoverable: true,
//                 backgroundColor: '#fcfcfc'
//             },
//             tooltip: true,
//             tooltipOpts: {
//                 content: function(label, x, y) {
//                     return x + ' : ' + y;
//                 }
//             },
//             xaxis: {
//                 tickColor: '#eee',
//                 mode: 'categories'
//             },
//             yaxis: {
//                 // position: 'right' or 'left'
//                 tickColor: '#eee'
//             },
//             shadowSize: 0
//         };
//
//         var chart = $('.chart-line');
//         if (chart.length)
//             $.plot(chart, data, options);
//
//     });
//
// })(window, document, window.jQuery);
//
//
// // CHART PIE
// // -----------------------------------
// (function(window, document, $, undefined) {
//
//     $(function() {
//
//         var data = [{
//             "label": "jQuery",
//             "color": "#4acab4",
//             "data": 30
//         }, {
//             "label": "CSS",
//             "color": "#ffea88",
//             "data": 40
//         }, {
//             "label": "LESS",
//             "color": "#ff8153",
//             "data": 90
//         }, {
//             "label": "SASS",
//             "color": "#878bb6",
//             "data": 75
//         }, {
//             "label": "Jade",
//             "color": "#b2d767",
//             "data": 120
//         }];
//
//         var options = {
//             series: {
//                 pie: {
//                     show: true,
//                     innerRadius: 0,
//                     label: {
//                         show: true,
//                         radius: 0.8,
//                         formatter: function(label, series) {
//                             return '<div class="flot-pie-label">' +
//                                 //label + ' : ' +
//                                 Math.round(series.percent) +
//                                 '%</div>';
//                         },
//                         background: {
//                             opacity: 0.8,
//                             color: '#222'
//                         }
//                     }
//                 }
//             }
//         };
//
//         var chart = $('.chart-pie');
//         if (chart.length)
//             $.plot(chart, data, options);
//
//     });
//
// })(window, document, window.jQuery);

// Forms Demo
// -----------------------------------

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

(function(window, document, $, undefined) {

    $(function() {

        // BOOTSTRAP SLIDER CTRL
        // -----------------------------------

        $('[data-ui-slider]').slider();

        // CHOSEN
        // -----------------------------------

        $('.chosen-select').chosen();

        // MASKED
        // -----------------------------------

        $('[data-masked]').inputmask();

        // FILESTYLE
        // -----------------------------------

        $('.filestyle').filestyle();

        // WYSIWYG
        // -----------------------------------
        $('.wysiwyg').wysiwyg();
    });

})(window, document, window.jQuery);

window.byuGalleryEditors = [];
(function($, window, document, undefined) {
    // Create the defaults once
    var byuGalleryEditorName = 'byuGalleryEditor',
        defaults = {
            'viewer': 'view',
            'adder': 'add',
            'template': '<li class="gallery-item">' +
                '   <div class="gallery-content">' +
                '       <div class="featured-image-box featured-image-box-4x3">' +
                '           <img class="featured-image featured-image-fit-height" alt="" data-name="image">' +
                '       </div>' +
                '       <div class="gallery-action">' +
                // '           <button class="btn btn-default" data-action="show"><i class="fa fa-search"></i></button>' +
                '           <button type="button" class="btn btn-danger btn-circle" data-action="remove"><i class="fa fa-trash"></i></button>' +
                '       </div>' +
                '   </div>' +
                '</li>',
            'detailbox': 'detailbox',
            'fields': ['id', 'image']
        };

    // The actual plugin constructor
    function byuGalleryEditor(element, options) {
        this.element = element;
        this.$element = $(element);

        // jQuery has an extend method that merges the
        // contents of two or more objects, storing the
        // result in the first object. The first object
        // is generally empty because we don't want to alter
        // the default options for future instances of the plugin
        this.options = $.extend(this.$element.data(), defaults, options);

        this._defaults = defaults;
        this._name = byuGalleryEditorName;
        window.byuGalleryEditors.push(this);
        this._index = window.byuGalleryEditors.length - 1;
        this.init();
    }

    byuGalleryEditor.prototype.init = function() {
        var _this = this;
        _this.$adder = _this.$element.find('[data-role="' + _this.options.adder + '"]');
        _this.$viewer = _this.$element.find('[data-role="' + _this.options.viewer + '"]');
        _this.$viewer.sortable();

        _this.$viewer.on('click', '[data-action="remove"]', function(e) {
            var _self = this;
            var $gallery_item = _self.closest('.gallery-item');
            var index = _this.$viewer.find('.gallery-item').index($gallery_item);
            _this.$modal.find('[name="gallery_item_index"]').val(index);
            _this.$modal.modal('show');
        });

        _this.$modal = $(
            '<div class="modal fade" role="dialog" aria-labelledby="Delete Gallery Item">' +
            '   <div class="modal-dialog" role="document">' +
            '       <div class="modal-content">' +
            '           <div class="modal-header">' +
            '               <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            '               <div class="modal-title" id="myModalLabel">Delete Gallery Item</div>' +
            '           </div>' +
            '           <div class="modal-body">' +
            '               Are you sure to delete this gallery item?' +
            '           </div>' +
            '           <div class="modal-footer">' +
            '               <input type="hidden" name="gallery_item_index">' +
            '               <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
            '               <button type="button" class="btn btn-danger" data-remove="gallery-item">Delete</button>' +
            '           </div>' +
            '       </div>' +
            '   </div>' +
            '</div>'
        );
        $(document.body).append(_this.$modal);

        _this.$modal.on('click', '[data-remove="gallery-item"]', function(e) {
            //_this.$viewer.find('.gallery-item:nth-of-type(' + (index+1) + ')')
            _this.remove(_this.$modal.find('[name="gallery_item_index"]').val());
            _this.$modal.modal('hide');
        });

        _this.$adder.on('click', '[data-action="add"]', function(e) {
            var _self = this;
            localStorage.setItem('target_action', 'byuGalleryEditor');
            localStorage.setItem('target_index', _this._index);
            PopupCenter('/laravel-filemanager?type=Images', 'File Manager', 900, 600);
            return false;
        });
    };

    byuGalleryEditor.prototype.add = function(data) {
        var _this = this;
        var $gallery_item = $(_this.options.template);
        $gallery_item.data(data);
        if (typeof data.image != "undefined") {
            $gallery_image = $gallery_item.find('[data-name="image"]');
            $gallery_image.attr('src', data.image);
        }
        if (typeof data.alt != "undefined") {
            $gallery_image = $gallery_item.find('[data-name="image"]');
            $gallery_image.attr('alt', data.alt);
        }
        _this.$viewer.append($gallery_item);
    }

    byuGalleryEditor.prototype.remove = function(index) {
        $(this.$viewer.find('.gallery-item')[index]).remove();
    }

    byuGalleryEditor.prototype.serialize = function() {
        var _this = this;
        var ret = [];
        _this.$viewer.find('.gallery-item').each(function() {
            var $gallery_item = $(this);
            var data = $gallery_item.data();
            var fields = _this.options.fields;
            var item = {}
            for (var i = 0, ni = fields.length; i < ni; i++) {
                var field = fields[i];
                if (typeof data[field] !== 'undefined') {
                    item[field] = data[field];
                }
            }
            ret.push(item);
        });
        return ret;
    }

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn.byuGalleryEditor = function(options) {
        var _this = this;
        var retval = this;
        _this.each(function() {
            var plugin = $(this).data(byuGalleryEditorName);
            if (!$(this).data(byuGalleryEditorName)) {
                $(this).data(byuGalleryEditorName, new byuGalleryEditor(this, options));
            } else {
                if (typeof options === "string") {
                    retval = plugin[options].apply(plugin);
                }
            }
        });
        return retval || _this;
    }
})(jQuery, window, document);

// Custom jQuery
// -----------------------------------


(function(window, document, $, undefined) {

    $(function() {

    });
})(window, document, window.jQuery);

(function($) {

    $.fn.filemanager = function(type) {
        type = type || 'image';

        if (type === 'image' || type === 'images') {
            type = 'Images';
        } else {
            type = 'Files';
        }

        this.on('click', function(e) {
            localStorage.setItem('target_action', 'preview');
            localStorage.setItem('target_input', $(this).data('input'));
            localStorage.setItem('target_preview', $(this).data('preview'));
            PopupCenter('/laravel-filemanager?type=' + type, 'File Manager', 900, 600);
            return false;
        });
    }

})(jQuery);

function PopupCenter(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    if (w > window.innerWidth - 30) {
        w = window.innerWidth - 30;
    }

    if (h > window.innerHeight - 30) {
        h = window.innerHeight - 30;
    }

    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
}

function SetUrl(url) {
    //set the value of the desired input to image url
    var target_action = localStorage.getItem('target_action');
    if (target_action == 'preview') {
        var $target_input = $('#' + localStorage.getItem('target_input'));

        if ($target_input.length > 0) {
            $target_input.val(url).trigger('change');
        }

        var $target_preview = $('#' + localStorage.getItem('target_preview'));
        //set or change the preview image src
        if ($target_preview.length > 0) {
            if ($target_preview.prop('tagName').toLowerCase() == 'img') {
                $target_preview.attr('src', url);
            } else {
                $target_preview.css({
                    'background-image': 'url("' + url + '")'
                });
            }
        }
    } else if (target_action == 'byuGalleryEditor') {
        var target_gallery_index = localStorage.getItem('target_index');
        console.log(target_gallery_index);
        var gallery = window.byuGalleryEditors[target_gallery_index];
        gallery.add({
            image: url
        });
    }

}

(function(window, document, $, undefined) {

    $(function() {
        $('#mailbox-inbox, #mailbox-starred, #mailbox-sent, #mailbox-draft, #mailbox-trash').on('click', '.pagination a', function(event) {
            var $this = $(this);
            var url = $this.attr('href');
            // NProgress.start();
            $.ajax({
                url: url,
                success: function(data) {
                    $this.closest('section').html(data);
                    // NProgress.done();
                }
            });
            event.preventDefault();
        });

        var pages = ['mailbox-inbox', 'mailbox-starred', 'mailbox-sent', 'mailbox-draft', 'mailbox-trash'];
        for (var i = 0, ni = pages.length; i < ni; i++) {
            var page = pages[i]
            window.app.page(page, function() {
                var $this = $(this);
                var url = $this.attr('src');
                if ($this.data('loaded')) {
                    $.ajax({
                        url: url,
                        success: function(data) {
                            $this.html(data);
                        }
                    });
                }
                $this.data('loaded', true);
            });
        }

        $(document).on('change', '#mailbox-select-all', function() {
            var $this = $(this);
            var checked = $this.prop('checked');

        });
    });
})(window, document, window.jQuery);

/**=========================================================
 * Module: panel-tools.js
 * Fill panels
 * [data-tool="panel-fill"]
 =========================================================*/
(function($, window, document) {
    'use strict';

    var panelSelector = '[data-tool="panel-fill"]',
        removeEvent = 'panel.remove',
        removedEvent = 'panel.removed';

    $(document).on('click', panelSelector, function() {

        // find the first parent panel
        var $parent = $(this).closest('.panel');
        $parent.find('[data-fill-origin]').each(function() {
            var $fillElement = $(this);
            var fillOriginElement = $fillElement.data('fill-origin');
            var $fillOriginElement = $(fillOriginElement);
            if ($fillOriginElement.is(':radio') || $fillOriginElement.is(':checkbox')) {
                $fillElement.prop('checked', $fillOriginElement.prop('checked'));
            } else {
                $fillElement.val($fillOriginElement.val());
            }
        });
    });
}(jQuery, window, document));

// User Settings
// -----------------------------------


(function(window, document, $, undefined) {

    $(function() {

        // User Settings
        $("#app-settings input[name='theme']").on('change', function() {
            var $this = $(this);
            $.ajax({
                url: window.custom.url + 'dashboard/user_setting',
                type: 'POST',
                data: {
                    'theme': $this.val()
                }
            });
        });

        $("#app-settings input[type='checkbox']").on('change', function() {
            var $this = $(this);
            var data = {};
            data[$this.attr('name')] = $this.prop('checked') ? 1 : 0;
            $.ajax({
                url: window.custom.url + 'profile/setting',
                type: 'POST',
                data: data
            });
        });

        setTimeout(function() {
            adjustEqualRows();
        }, 1000);
        $(window).resize(adjustEqualRows);
        function adjustEqualRows() {
            $(".row-equal-height").each(function() {
                $row = $(this);
                $row.children("div").children("div").css("min-height", "0");
                if($row.children("div").length > 0) {
                    var height = $row.children("div").first().height();
                    $row.children("div").each(function() {
                        if($(this).height() > height) {
                            height = $(this).height();
                        }
                    });
                    $row.children("div").children("div").css("min-height", height);
                }
            });
        }

    });
})(window, document, window.jQuery);
