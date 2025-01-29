$(function () {
  // Add a listener for click events on the save button
  $('.saveBtn').on('click', function () {
    var hour = $(this).parent().attr('id');
    var description = $(this).siblings('.description').val();
    localStorage.setItem(hour, description);
  });

  // Apply the past, present, or future class to each time block
  function updateHourClasses() {
    var currentHour = dayjs().hour();
    $('.time-block').each(function () {
      var blockHour = parseInt($(this).attr('id').split('-')[1]);
      if (blockHour < currentHour) {
        $(this).addClass('past').removeClass('present future');
      } else if (blockHour === currentHour) {
        $(this).addClass('present').removeClass('past future');
      } else {
        $(this).addClass('future').removeClass('past present');
      }
    });
  }

  // Get any user input that was saved in localStorage and set the values of the corresponding textarea elements
  $('.time-block').each(function () {
    var hour = $(this).attr('id');
    var description = localStorage.getItem(hour);
    if (description) {
      $(this).children('.description').val(description);
    }
  });

  // Display the current date in the header of the page
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));

  // Initial call to update the hour classes
  updateHourClasses();
  // Update the hour classes every 15 minutes
  setInterval(updateHourClasses, 900000);
});
